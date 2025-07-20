'use client'
import {useEffect, useState} from "react";
import {BlogPosts} from "@/types";
import {fetchBlogPosts} from "@/lib/blogFunctions";
import {useRouter} from "next/navigation";


export default function AllBlogPosts() {
    const [posts, setPosts] = useState<BlogPosts>([]);
    const router = useRouter();
    useEffect(() => {
        fetchBlogPosts().then(data => setPosts(data));
    }, []);
    return (
        <div>
            <p>All posts</p>
            {
                posts.map(post => (
                    <div key={post.id}
                         onClick={e => router.push(`/blog/${post.slug}`)}>
                        {post.title}
                    </div>
                ))
            }
        </div>
    )
}