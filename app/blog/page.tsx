'use client'
import React, {useEffect, useState} from "react";
import layout from "@/styles/layout.module.css"
import text from "@/styles/typography.module.css"
import blog from "@/styles/blog.module.css"
import form from "@/styles/forms.module.css"
import buttons from "@/styles/buttons.module.css"
import pageContent from '@/data/content/blog.json'
import WpBlogCard from "@/components/WpBlogCard";
import {fetchWpBlogPosts} from "@/lib/blog";
import {CategoryNode, TagNode, PostNode} from "@/types";
import {
    InputMaybe,
    OrderEnum,
    PostObjectsConnectionOrderbyEnum,
    PostStatusEnum,
    RootQueryToPostConnectionWhereArgs
} from "@/wordpress/gql/graphql";


export default function AllBlogPosts() {
    const [posts, setPosts] = useState<PostNode[]>([])
    const [categories, setCategories] = useState<CategoryNode[]>([])
    const [tags, setTags] = useState<TagNode[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const vars = {first: 11}
    const where: RootQueryToPostConnectionWhereArgs = {
        status: 'PUBLISH' as PostStatusEnum,
        orderby: [{ field: 'DATE' as PostObjectsConnectionOrderbyEnum, order: 'DESC' as OrderEnum }],
        categoryNotIn:["dGVybTo1Nw=="] as InputMaybe<string[]>
    }
    useEffect(() => {
        fetchWpBlogPosts(vars.first, '', where).then((data) => {
            console.log(data)
            setPosts(data.posts?.nodes ?? [])
            setCategories((data.categories?.nodes ?? []).filter(Boolean) as CategoryNode[])
            setTags((data.tags?.nodes ?? []).filter(Boolean) as TagNode[])
         }
        )
    }, []);

    const search = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(searchQuery)
        const whereSearch: RootQueryToPostConnectionWhereArgs = {
            status: 'PUBLISH' as PostStatusEnum,
            orderby: [{ field: 'DATE' as PostObjectsConnectionOrderbyEnum, order: 'DESC' as OrderEnum }],
            search: searchQuery
        }
        setPosts([])
        fetchWpBlogPosts(vars.first, '', whereSearch).then((data) => {
            setPosts(data.posts?.nodes ?? [])
        })
    }

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
                            <form onSubmit={(e) => search(e)}>
                                <div className={form.row}>
                                    <input
                                        type="text"
                                        placeholder="Search Articles..."
                                        className={form.input}
                                        onChange={(e)=> setSearchQuery(e.target.value)}/>
                                    <button className={buttons.primarySmall}>Search</button>
                                </div>

                            </form>
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