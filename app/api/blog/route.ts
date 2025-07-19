// app/api/blog/route.ts
import { NextResponse } from 'next/server'
import { getAllBlogPosts, createBlogPost } from '@/repo/blog'

export async function GET() {
    try {
        const posts = await getAllBlogPosts()
        return NextResponse.json(posts)
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 404 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const newPost = await createBlogPost(body)
        console.log(newPost)
        return NextResponse.json(newPost, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 404 });
    }
}