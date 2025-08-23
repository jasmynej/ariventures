import {createClient} from "@/lib/client";
import {wp} from "@/wordpress/client";
import {NormalizedPost, PipelinePostNode, PostNode} from "@/types";
import {PostsByModifiedDocument, PostsByModifiedQuery} from "@/wordpress/gql/graphql";
import {htmlToPlaintext} from "@/lib/utils";

const supabase = createClient()

async function getWatermark(){
    const {data} = await supabase.from("sync_state_wp")
        .select("*")
        .order('id', { ascending: false }).limit(1).single();
    return data ?? { last_modified: '1970-01-01T00:00:00Z', last_dbid: 0 };
}

function normalizePost(post: PipelinePostNode){
    let categories: string[] = []
    let tags: string[] = []
    post.categories?.nodes.forEach((c)=> {
        categories.push(c.name ?? '')
    })
    post.tags?.nodes.forEach((t) => {
        tags.push(t.name ?? '')
    })
    let normalizedPost: NormalizedPost = {
        wp_post_id: post.databaseId,
        title: post.title ?? '',
        slug: post.slug ?? '',
        categories: categories,
        tags: tags,
        excerpt: htmlToPlaintext(post.excerpt ?? ''),
        published_at: new Date(post.date?? '1970-01-01'),
        plaintext: htmlToPlaintext(post.content ?? ''),
        modified: new Date(post.modified?? '1970-01-01')
    }
    return normalizedPost
}
export async function syncBatch(limit = 100){
    const wm = await getWatermark()
    let batchMaxDate = new Date(wm.last_modified)
    let batchLastDbId= wm.last_dbid
    const start = new Date(new Date(wm.last_modified).getTime() - 5*60*1000);
    const afterYear = start.getUTCFullYear();
    const afterMonth = start.getUTCMonth()+1;
    const afterDay = start.getUTCDate();

    let afterCursor: string | null | undefined = null;
    let processed = 0;

    do {
        const res: PostsByModifiedQuery = await wp.request(PostsByModifiedDocument, { first: limit, after: afterCursor, afterYear, afterMonth, afterDay });
        const nodes: PipelinePostNode[] = res.posts?.nodes ?? [];
        if (!nodes.length) break;

        // 3) Client-side guard on modified
        const filtered = nodes.filter(p => new Date(p.modified?? '1970-01-01') >= new Date(wm.last_modified));

        // 4) Normalize
        const normalized = filtered.map(normalizePost);
        console.log(normalized[0])
        // 5) Upsert docs (even unchanged)
        const {data, error} = await supabase.from("wp_blog_posts").upsert(
            normalized,
            { onConflict: "wp_post_id" }
        );
        if (error) throw error
        // 6) Track batch max (for watermark)
        for (const p of filtered) {
            if ((p.modified ?? '')> batchMaxDate.toISOString() || (p.modified === batchMaxDate.toISOString() && p.databaseId > batchLastDbId)) {
                batchMaxDate = new Date(p.modified?? '1970-01-01');
                batchLastDbId = p.databaseId;
            }
        }

        processed += nodes.length;
        afterCursor = res.posts?.pageInfo?.hasNextPage ? res.posts.pageInfo.endCursor : null;
        if (processed >= limit) break;

    } while (afterCursor);



    let  newWatermark = { last_modified: batchMaxDate.toISOString(), last_dbid: batchLastDbId }

    const {data: watermark, error: err} = await supabase.from("sync_state_wp").insert(
        newWatermark
    ).select('*')

    if(err) throw err
    return { processed, watermark};
}