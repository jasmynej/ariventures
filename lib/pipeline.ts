import { OpenAI } from "openai";
import { createClient } from "@/lib/client";
import { wp } from "@/wordpress/client";
import { NormalizedPost, PipelinePostNode} from "@/types";
import { PostsByModifiedDocument, PostsByModifiedQuery } from "@/wordpress/gql/graphql";
import { htmlToPlaintext } from "@/lib/utils";
import crypto from "crypto";

// ================================
// Constants / single-source config
// ================================
const OVERLAP_MINUTES = 5;
const CHUNK_MAX = 1200;
const CHUNK_OVERLAP = 200;
const EMBEDDING_BATCH = 128;
const EMBEDDING_MODEL = "text-embedding-3-small";

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY! });
const supabase = createClient();

// ==============
// Small helpers
// ==============
function toUTCDate(iso?: string) {
    return new Date(iso ?? "1970-01-01");
}

function overlapStartISO(lastISO: string, minutes = OVERLAP_MINUTES) {
    const start = new Date(new Date(lastISO).getTime() - minutes * 60 * 1000);
    return start.toISOString();
}

function yearMonthDayFromISO(iso: string) {
    const d = new Date(iso);
    return { year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, day: d.getUTCDate() };
}

function logDebug(label: string, payload: any) {
    // keep logs terse and searchable
    // console.debug(`[sync] ${label}`, payload);
    console.log(`${label}: ${payload}`)
}

export async function sha256(s: string) {
    const data = new TextEncoder().encode(s);
    const buf = await crypto.subtle.digest("SHA-256", data);
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
}

async function getWatermark() {
    const { data } = await supabase
        .from("sync_state_wp")
        .select("*")
        .order("id", { ascending: false })
        .limit(1)
        .single();

    return data ?? { last_modified: "1970-01-01T00:00:00Z", last_dbid: 0 };
}

// Normalize one WP node into your row shape (async for hashing)
async function normalizePost(post: PipelinePostNode) {
    const categories = (post.categories?.nodes ?? [])
        .map(c => c?.name ?? "")
        .filter(Boolean);

    const tags = (post.tags?.nodes ?? [])
        .map(t => t?.name ?? "")
        .filter(Boolean);

    const rawContent = post.content ?? "";
    const plaintext = htmlToPlaintext(rawContent);
    const content_hash = await sha256(plaintext);

    const normalizedPost: NormalizedPost = {
        wp_post_id: post.databaseId,
        title: post.title ?? "",
        slug: post.slug ?? "",
        categories,
        tags,
        excerpt: htmlToPlaintext(post.excerpt ?? ""),
        published_at: toUTCDate(post.date ?? ""),
        plaintext,
        modified: toUTCDate(post.modified ?? ""),
        content_hash,
        featured_img_url: post.featuredImage?.node.sourceUrl ?? ""
    };

    return normalizedPost;
}

function splitText(txt: string, max = CHUNK_MAX, overlap = CHUNK_OVERLAP): string[] {
    if (!txt) return [];
    const out: string[] = [];
    for (let i = 0; i < txt.length; i += (max - overlap)) {
        const chunk = txt.slice(i, i + max).trim();
        if (chunk) out.push(chunk);
    }
    return out;
}

async function embedBatch(texts: string[]): Promise<number[][]> {
    const vectors: number[][] = [];
    for (let i = 0; i < texts.length; i += EMBEDDING_BATCH) {
        const slice = texts.slice(i, i + EMBEDDING_BATCH);
        const res = await openai.embeddings.create({
            model: EMBEDDING_MODEL,
            input: slice
        });
        for (const e of res.data) vectors.push(e.embedding as number[]);
    }
    return vectors;
}

export async function indexPostChunks(args: {
    wp_post_id: number;
    plaintext: string;
    categories?: string[];
    tags?: string[];
}) {
    const { wp_post_id, plaintext } = args;
    const categories = args.categories ?? [];
    const tags = args.tags ?? [];

    // 1) delete previous chunks
    const del = await supabase.from("post_chunks").delete().eq("wp_post_id", wp_post_id);
    if (del.error) throw del.error;

    // 2) split
    const parts = splitText(plaintext);
    if (!parts.length) return { inserted: 0 };

    // 3) embed
    const vectors = await embedBatch(parts);

    // 4) insert
    const rows = parts.map((content, i) => ({
        wp_post_id,
        content,
        categories,
        tags,
        embedding: vectors[i]
    }));

    const ins = await supabase
        .from("post_chunks")
        .insert(rows); // no SELECT round-trip
    if (ins.error) throw ins.error;

    return { inserted: rows.length };
}

export async function syncBatch(limit = 100) {
    // 1) watermark + overlap window
    const wm = await getWatermark();
    let batchMaxDate = new Date(wm.last_modified);
    let batchLastDbId = wm.last_dbid;

    const startISO = overlapStartISO(wm.last_modified, OVERLAP_MINUTES);
    const { year: afterYear, month: afterMonth, day: afterDay } = yearMonthDayFromISO(startISO);

    let afterCursor: string | null | undefined = null;
    let processed = 0;

    do {
        // 2) fetch page
        const res: PostsByModifiedQuery = await wp.request(PostsByModifiedDocument, {
            first: limit,
            after: afterCursor,
            afterYear,
            afterMonth,
            afterDay
        });

        const nodes: PipelinePostNode[] = res.posts?.nodes ?? [];
        if (!nodes.length) break;

        // 3) client-side guard on modified
        const wmTs = new Date(wm.last_modified).getTime();
        const filtered = nodes.filter(p => new Date(p.modified ?? "1970-01-01").getTime() >= wmTs);
        if (!filtered.length) {
            processed += nodes.length;
            afterCursor = res.posts?.pageInfo?.hasNextPage ? res.posts.pageInfo.endCursor : null;
            if (processed >= limit) break;
            continue;
        }

        // 4) normalize (async)
        const normalized = await Promise.all(filtered.map((p) => normalizePost(p)));
        logDebug("normalized.count", normalized.length);

        // 5) read existing hashes for change detection
        const wpIds = normalized.map(n => n.wp_post_id);
        const { data: existing, error: existErr } = await supabase
            .from("wp_blog_posts")
            .select("wp_post_id, content_hash")
            .in("wp_post_id", wpIds);

        if (existErr) throw existErr;

        const hashById = new Map((existing ?? []).map(e => [e.wp_post_id, e.content_hash]));

        // 6) upsert posts (no SELECT afterward)
        const { error: upErr } = await supabase
            .from("wp_blog_posts")
            .upsert(normalized, { onConflict: "wp_post_id"});

        if (upErr) throw upErr;

        // 7) index only changed/new posts
        const changed = normalized.filter(n => hashById.get(n.wp_post_id) !== n.content_hash);
        for (const n of changed) {
            await indexPostChunks({
                wp_post_id: n.wp_post_id,
                plaintext: n.plaintext,
                categories: n.categories?.map(c => c) ?? [],
                tags: n.tags?.map(t => t) ?? [],
            });
        }

        // 8) advance batch watermark candidates
        for (const p of filtered) {
            const modTs = new Date(p.modified ?? "1970-01-01").getTime();
            const curTs = batchMaxDate.getTime();
            if (modTs > curTs || (modTs === curTs && p.databaseId > batchLastDbId)) {
                batchMaxDate = new Date(modTs);
                batchLastDbId = p.databaseId;
            }
        }

        processed += nodes.length;
        afterCursor = res.posts?.pageInfo?.hasNextPage ? res.posts.pageInfo.endCursor : null;
        if (processed >= limit) break;
    } while (afterCursor);

    // 9) save watermark (append-only table -> insert; single-row table -> upsert)
    const newWatermark = { last_modified: batchMaxDate.toISOString(), last_dbid: batchLastDbId };
    const { data: watermark, error: err } = await supabase
        .from("sync_state_wp")
        .insert(newWatermark)
        .select("*");

    if (err) throw err;

    return { processed, watermark };
}