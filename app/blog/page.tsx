'use client'
import React, { useEffect, useState } from "react";
import layout from "@/styles/layout.module.css";
import text from "@/styles/typography.module.css";
import blog from "@/styles/blog.module.css";
import form from "@/styles/forms.module.css";
import buttons from "@/styles/buttons.module.css";
import pageContent from '@/data/content/blog.json';
import WpBlogCard from "@/components/WpBlogCard";
import { fetchWpBlogPosts } from "@/lib/blog";
import { CategoryNode, TagNode, PostNode } from "@/types";
import AnimatedLogo from "@/components/AnimatedLogo";
import {
    InputMaybe,
    OrderEnum,
    PostObjectsConnectionOrderbyEnum,
    PostStatusEnum,
    RootQueryToPostConnectionWhereArgs,
    GetAllPostsQuery
} from "@/wordpress/gql/graphql";

const PAGE_SIZE = 11;

export default function AllBlogPosts() {
    const [posts, setPosts] = useState<PostNode[]>([]);
    const [categories, setCategories] = useState<CategoryNode[]>([]);
    const [tags, setTags] = useState<TagNode[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    // pagination
    const [after, setAfter] = useState<string | undefined>(undefined);
    const [hasNext, setHasNext] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    // filtering
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

    const baseWhere: RootQueryToPostConnectionWhereArgs = {
        status: PostStatusEnum.Publish,
        orderby: [{ field: PostObjectsConnectionOrderbyEnum.Date, order: OrderEnum.Desc }],
        // keep your exclusion if you still want it:
        categoryNotIn: ["dGVybTo1Nw=="] as InputMaybe<string[]>
    };

    // derive current where from selected category (and optionally search)
    const currentWhere: RootQueryToPostConnectionWhereArgs = {
        ...baseWhere,
        ...(selectedCategoryId ? { categoryId: selectedCategoryId } : {}),
        ...(searchQuery ? { search: searchQuery } : {}),
    };

    // initial load
    useEffect(() => {
        let cancelled = false;
        (async () => {
            setLoading(true);
            try {
                const data: GetAllPostsQuery = await fetchWpBlogPosts(PAGE_SIZE, '', currentWhere);
                if (cancelled) return;

                setPosts(((data.posts?.nodes ?? []).filter(Boolean)) as PostNode[]);
                setCategories(((data.categories?.nodes ?? []).filter(Boolean)) as CategoryNode[]);
                setTags(((data.tags?.nodes ?? []).filter(Boolean)) as TagNode[]);
                setAfter(data.posts?.pageInfo?.endCursor ?? undefined);
                setHasNext(Boolean(data.posts?.pageInfo?.hasNextPage));
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => { cancelled = true; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // mount only

    // LOAD MORE (uses currentWhere + cursor)
    const loadMore = async () => {
        if (loading || !hasNext || !after) return;
        setLoading(true);
        try {
            const data = await fetchWpBlogPosts(PAGE_SIZE, after, currentWhere);
            setPosts(prev => [
                ...prev,
                ...(((data.posts?.nodes ?? []).filter(Boolean)) as PostNode[])
            ]);
            setAfter(data.posts?.pageInfo?.endCursor ?? undefined);
            setHasNext(Boolean(data.posts?.pageInfo?.hasNextPage));
        } finally {
            setLoading(false);
        }
    };

    // CATEGORY CLICK — resets pagination and fetches first page for that category
    const onCategoryClick = async (cat: CategoryNode | null) => {
        // toggle off if clicking the selected one again
        const nextSelected = cat ? (cat.databaseId as number) : null;
        setSelectedCategoryId(nextSelected);

        setLoading(true);
        setPosts([]);
        setAfter(undefined);
        try {
            const where: RootQueryToPostConnectionWhereArgs = {
                ...baseWhere,
                ...(nextSelected ? { categoryId: nextSelected } : {}),
                ...(searchQuery ? { search: searchQuery } : {}),
            };
            const data: GetAllPostsQuery = await fetchWpBlogPosts(PAGE_SIZE, '', where);
            setPosts(((data.posts?.nodes ?? []).filter(Boolean)) as PostNode[]);
            setAfter(data.posts?.pageInfo?.endCursor ?? undefined);
            setHasNext(Boolean(data.posts?.pageInfo?.hasNextPage));
            // categories/tags likely unchanged; keep as-is
        } finally {
            setLoading(false);
        }
    };

    // SEARCH — also resets pagination (keeps selected category)
    const onSearchSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setPosts([]);
        setAfter(undefined);
        try {
            const where: RootQueryToPostConnectionWhereArgs = {
                ...baseWhere,
                ...(selectedCategoryId ? { categoryId: selectedCategoryId } : {}),
                ...(searchQuery ? { search: searchQuery } : {}),
            };
            const data: GetAllPostsQuery = await fetchWpBlogPosts(PAGE_SIZE, '', where);
            setPosts(((data.posts?.nodes ?? []).filter(Boolean)) as PostNode[]);
            setAfter(data.posts?.pageInfo?.endCursor ?? undefined);
            setHasNext(Boolean(data.posts?.pageInfo?.hasNextPage));
        } finally {
            setLoading(false);
        }
    };

    const isEmpty = !loading && posts.length === 0;

    return (
        <div>
            <div
                className={layout.section_bg_img}
                style={{ backgroundImage: `url("/images/blog-bg.JPG")` }}
            >
                <h1 className={text.pageTitle}>{pageContent.title}</h1>
                <h3 className={text.pageTagline}>{pageContent.subtitle}</h3>
            </div>

            <div className={layout.section}>
                <div className={blog.blogPageContainer}>
                    {/* Main */}
                    <div className={blog.allPosts}>
                        {loading && posts.length === 0 ? (
                            <div className={blog.loadingContainer}><AnimatedLogo /></div>
                        ) : isEmpty ? (
                            <div className={blog.loadingContainer}><p>No posts found.</p></div>
                        ) : (
                            <>
                                {posts[0] && (
                                    <div className={blog.featuredPost}>
                                        <WpBlogCard post={posts[0]} featured />
                                    </div>
                                )}

                                <div className={blog.blogGrid}>
                                    {posts.slice(1).map(p => p && <WpBlogCard key={p.id} post={p} />)}
                                </div>

                                <div style={{ marginTop: '1rem' }}>
                                    <button
                                        className={buttons.primary}
                                        onClick={loadMore}
                                        disabled={loading || !hasNext}
                                    >
                                        {loading ? 'Loading…' : hasNext ? 'Load More' : 'No more posts'}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className={blog.sideSections}>
                        <div className={blog.sidePanelSection}>
                            <form onSubmit={onSearchSubmit}>
                                <div className={form.row}>
                                    <input
                                        type="text"
                                        placeholder="Search Articles..."
                                        className={form.input}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <button className={buttons.primarySmall}>Search</button>
                                </div>
                            </form>
                        </div>

                        <div className={blog.sidePanelSection} id="categories">
                            <h3>Categories</h3>
                            <div
                                className={`${blog.categoryItem} ${selectedCategoryId === null ? blog.active : ''}`}
                                onClick={() => onCategoryClick(null)}
                            >
                                <p className={blog.categoryName}>All</p>
                            </div>

                            {categories.map((category) => category && (
                                <div
                                    key={category.slug}
                                    className={`${blog.categoryItem} ${selectedCategoryId === category.databaseId ? blog.active : ''}`}
                                    onClick={() => onCategoryClick(category)}
                                >
                                    <p className={blog.categoryName}>{category.name}</p>
                                    <p className={blog.categoryCount}>{category.count}</p>
                                </div>
                            ))}
                        </div>

                        <div className={blog.sidePanelSection}>
                            <h3>Tags</h3>
                            <div className={blog.tags}>
                                {tags.map((tag) => tag && (
                                    <div key={tag.slug} className={blog.tag}>
                                        <p>{tag.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={`${blog.sidePanelSection} ${blog.subscribe}`}>
                            <img src={'/icons/email.svg'} alt="email icon" />
                            <h3>Subscribe</h3>
                            <p>Get the latest travel tips and guides directly in your inbox every week.</p>
                            <form>
                                <input type="text" className={form.input} />
                                <button className={buttons.primary}>Subscribe Now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}