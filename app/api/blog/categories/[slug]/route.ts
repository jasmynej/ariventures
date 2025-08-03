// app/api/blog/categories/[slug]/route.ts
import {getCategoryBySlug} from "@/repo/blog";

import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest, props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    try{

        const category = await getCategoryBySlug(params.slug);
        return NextResponse.json(category);
    }
    catch(error){
        return NextResponse.json({ error: (error as Error).message }, { status: 404 });
    }
}
