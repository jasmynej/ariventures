// app/api/blog/categories/[slug]/route.ts
import {getCategoryBySlug} from "@/repo/blog";

import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
    try{
        let slug = await params.slug;
        const category = await getCategoryBySlug(slug);
        return NextResponse.json(category);
    }
    catch(error){
        return NextResponse.json({ error: (error as Error).message }, { status: 404 });
    }
}
