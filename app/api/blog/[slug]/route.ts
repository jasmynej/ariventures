// app/api/blog/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import {
    getBlogPostBySlug,
    updateBlogPost,
    deleteBlogPost,
} from '@/repo/blog'

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const post = await getBlogPostBySlug(params.slug)
        return NextResponse.json(post)
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 404 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const body = await req.json()
        const updated = await updateBlogPost(params.slug, body)
        return NextResponse.json(updated)
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 404 });
    }
}

export async function DELETE(_: NextRequest, { params }: { params: { slug: string } }) {
    try {
        await deleteBlogPost(params.slug)
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 404 });
    }
}