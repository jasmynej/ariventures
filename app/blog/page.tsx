'use client'
import {useEffect, useState} from "react";
import {BlogPosts} from "@/types";
import {fetchBlogPosts} from "@/lib/blogFunctions";
import {useRouter} from "next/navigation";
import layout from "@/styles/layout.module.css"
import text from "@/styles/typography.module.css"
import blog from "@/styles/blog.module.css"
import BlogCard from "@/components/BlogCard";
import pageContent from '@/data/content/blog.json'

export default function AllBlogPosts() {
    const [posts, setPosts] = useState<BlogPosts>([]);

    const router = useRouter();
    useEffect(() => {
        fetchBlogPosts().then(data => {
            console.log(data)
            setPosts(data)
        });
    }, []);

    if (!posts || posts.length === 0 || !posts[0]) {
        return <div className={layout.section}><p>Loading...</p></div>;
    }
    return (
        <div>
            <div className={layout.section_bg_img} style={{
                backgroundImage: `url("/images/blog-bg.JPG")`,
            }}>
                <h1 className={text.pageTitle}>{pageContent.title}</h1>
                <h3 className={text.pageTagline}>{pageContent.subtitle}</h3>
            </div>
            <div className={layout.section}>
                <p>{pageContent.description}</p>

                <div>
                    {/* Featured Post */}
                    <div className={blog.featuredPost}>
                        <BlogCard post={posts[0]} featured />
                    </div>

                    {/* Grid of other posts */}
                    <div className={blog.blogGrid}>
                        {posts.slice(1).map((post) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}