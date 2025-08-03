import {getAllTags} from "@/repo/blog";

import { NextResponse } from "next/server";

export async function GET() {
    try {
        const tags = await getAllTags();
        return NextResponse.json(tags);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 404 });
    }
}