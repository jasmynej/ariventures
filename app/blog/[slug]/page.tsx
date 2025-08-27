'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import parse from 'html-react-parser';
import blogStyles from '@/styles/blog.module.css';
import { formatDate } from '@/lib/utils';
import type { GetPostBySlugQuery } from '@/wordpress/gql/graphql';
import {fetchWpBlogPost} from "@/lib/blog";

type Post = NonNullable<GetPostBySlugQuery['post']>;

export default function BlogPost() {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (!slug) return;
        // make sure fetchWpBlogPost returns the GraphQL result shape { post: {...} }
        fetchWpBlogPost(slug).then((d: GetPostBySlugQuery) => setPost(d.post ?? null));
    }, [slug]);

    if (!post) return <p>Loading...</p>;

    const primaryCategory = post.categories?.nodes?.[0]?.name ?? 'Uncategorized';
    const cover = post.featuredImage?.node?.sourceUrl ?? '';

    return (
        <div className={blogStyles.blogPostContainer}>
            <div className={blogStyles.postContent}>
                <p onClick={() => router.push('/blog')}>
                    <i className="fi fi-ts-arrow-small-left"></i> Back
                </p>

                <div className={blogStyles.postMetadata}>
                    <span className={blogStyles.category}>{primaryCategory}</span>
                    <span className={blogStyles.date}>
            {post.date ? formatDate(post.date) : ''}
          </span>
                </div>

                <h1 className={blogStyles.postTitle}>{post.title}</h1>

                {cover && (
                    <div className={blogStyles.coverImage} style={{ backgroundImage: `url(${cover})` }} />
                )}

                {/* content is HTML from WP */}
                <div className="prose">{parse(post.content ?? '')}</div>
                {post.tags?.nodes?.length ? (
                        <div className={blogStyles.postTags}>
                            {post.tags.nodes.map(t =>
                                t && <span key={t.name}>{t.name}</span>)}
                        </div>

                ) : null}


            </div>
        </div>
    );
}