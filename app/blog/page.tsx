'use client'
import {useEffect, useState} from "react";
import layout from "@/styles/layout.module.css"
import text from "@/styles/typography.module.css"
import blog from "@/styles/blog.module.css"
import pageContent from '@/data/content/blog.json'
import WpBlogCard from "@/components/WpBlogCard";
import {fetchWpBlogPosts} from "@/lib/blogFunctions";
import {CategoryNode, TagNode, PostNode} from "@/types";


export default function AllBlogPosts() {
    const [posts, setPosts] = useState<PostNode[]>([])
    const [categories, setCategories] = useState<CategoryNode[]>([])
    const [tags, setTags] = useState<TagNode[]>([])
    const vars = {first: 11}
    useEffect(() => {
        fetchWpBlogPosts(vars.first, '').then((data) => {
            console.log(data)
            setPosts(data.posts?.nodes ?? [])
            setCategories((data.categories?.nodes ?? []).filter(Boolean) as CategoryNode[])
            setTags((data.tags?.nodes ?? []).filter(Boolean) as TagNode[])
         }
        )
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
                <div className={blog.blogPageContainer}>
                    <div className={blog.allPosts}>
                        {/* Featured Post */}
                        <div className={blog.featuredPost}>
                            <WpBlogCard post={posts[0]} featured />
                        </div>

                        {/* Grid of other posts */}
                        <div className={blog.blogGrid}>
                            {posts.slice(1).map((post) => (
                                <WpBlogCard key={post.id} post={post} />
                            ))}
                        </div>
                    </div>

                    <div className={blog.sideSections}>
                        <div className={blog.sidePanelSection}>
                            <h3>Search</h3>
                        </div>
                        <div className={blog.sidePanelSection}>
                            <h3>Categories</h3>
                            {
                                categories.map((category)=> (
                                    <div key={category.slug}>
                                        <p>{category.name}</p>
                                    </div>
                                ))
                            }
                        </div>
                        <div className={blog.sidePanelSection}>
                            <h3>Tags</h3>
                            {
                                tags.map((tag)=> (
                                    <div key={tag.slug}>
                                        <p>{tag.name}</p>
                                    </div>
                                ))
                            }
                        </div>
                        <div className={blog.sidePanelSection}>
                            <h3>Subscribe</h3>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}