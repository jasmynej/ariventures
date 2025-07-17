'use client';
import { useRouter } from 'next/navigation';

export default function AdminBlog(){
    const router = useRouter();

    return (
        <div>
            <h1>All Blog Posts</h1>
            <button onClick={() => router.push("/admin/blog/new")}>New Post</button>
        </div>
    )
}