import {getAllCategories} from "@/repo/blog";

import { NextResponse } from "next/server";

export async function GET() {
    try {
        const categories = await getAllCategories();
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 404 });
    }
}