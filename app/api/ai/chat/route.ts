// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import {createClient} from "@/lib/client";
import { OpenAIEmbeddings } from "@langchain/openai";
import { ChatOpenAI } from "@langchain/openai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase"
import { RunnableSequence, RunnablePassthrough } from "@langchain/core/runnables";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const supabase = createClient()

const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-small",
    apiKey: process.env.OPEN_AI_KEY!,
});

const vectorStore = new SupabaseVectorStore(embeddings, {
    client: supabase,
    tableName: "post_chunks",
    queryName: "match_post_chunks", // <- the RPC you created
});

const retriever = vectorStore.asRetriever({ k: 6 });

const prompt = PromptTemplate.fromTemplate(
    `You are Ariventures' AI travel assistant named Ari. Answer the user's question using ONLY the context.
If you're unsure or visas/policies can change, say so and cite sources. If you have some of your own opinions feel 
free to mention them, but make sure you say it's from you!

Question:
{question}

Context (each block is a snippet from our blog):
{context}

Write a concise, helpful answer. No need to Link sources inline but you can say where you got the information from`
);

const llm = new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0.2,
    maxTokens: 350,
    apiKey: process.env.OPEN_AI_KEY!,
});

const chain = RunnableSequence.from([
    {
        question: new RunnablePassthrough(),
        context: async (question: string) => {
            // Optional: support category/tag filters from the client
            // by passing { filter: { categories: [...], tags: [...] } } to similaritySearch
            const docs = await retriever.invoke(question);
            return docs
                .map((d, i) => {
                    const meta = d.metadata as any;
                    const wp = meta?.wp_post_id ? `wp_post_id=${meta.wp_post_id}` : "";
                    return `SOURCE ${i + 1} ${wp}\n${d.pageContent}`;
                })
                .join("\n\n---\n\n");
        },
    },
    prompt,
    llm,
    new StringOutputParser(),
]);

export async function POST(req: NextRequest) {
    const body = await req.json().catch(() => ({}));
    const question: string = body?.question ?? "";

    if (!question) {
        return NextResponse.json({ error: "Missing 'question'." }, { status: 400 });
    }

    const rawDocs = await retriever.invoke(question);

// keep only one per wp_post_id
    const seen = new Set<number>();
    const docs = rawDocs.filter(d => {
        const wp = (d.metadata as any)?.wp_post_id;
        if (!wp) return false;
        if (seen.has(wp)) return false;
        seen.add(wp);
        return true;
    });

    const answer = await chain.invoke(question);

    // Include lightweight sources for your UI (IDs; you can join to slug/url if you like)
    const sources = docs.map((d) => d.metadata);

    return NextResponse.json({ answer, sources });
}