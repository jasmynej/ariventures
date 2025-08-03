'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Blocks from 'editorjs-blocks-react-renderer';
import type { BlogPost } from '@/types';
import { fetchBlogPost } from '@/lib/blogFunctions';
import blogStyles from '@/styles/blog.module.css'
import {formatDate} from "@/lib/utils";
import { useRouter } from 'next/navigation';
const customRenderers = {
    image: ({ data }: any) => (
        <div style={{ margin: '1em 0' }}>
            <img
                src={data.file.url}
                alt={data.caption || 'Blog image'}
                style={{ width: '300px', borderRadius: '8px' }}
            />
            {data.caption && <p style={{ fontSize: '0.9em', color: '#666' }}>{data.caption}</p>}
        </div>
    ),
};

export default function BlogPost() {
    const params = useParams<{ slug: string }>();
    const [post, setPost] = useState<BlogPost | null>(null);
    const router = useRouter();
    useEffect(() => {
        if (params.slug) {
            fetchBlogPost(params.slug).then((d) => setPost(d));
        }
    }, [params.slug]);

    if (!post) return <p>Loading...</p>;

    return (
        <div className={blogStyles.blogPostContainer}>
            <div className={blogStyles.postContent}>
                <p onClick={() => router.push('/blog')}>
                    <i className="fi fi-ts-arrow-small-left"></i>
                    Back
                </p>
                <div className={blogStyles.postMetadata}>
                    <span className={blogStyles.category}>{post.category.name}</span>
                    <span className={blogStyles.date}>{formatDate(post.published_at)}</span>
                </div>
                <h1 className={blogStyles.postTitle}>{post.title}</h1>
                <div className={blogStyles.coverImage}
                     style={{ backgroundImage: `url(${post.cover_image})` }}>
                </div>
                <Blocks data={post.content} renderers={customRenderers} />
            </div>
            <div>

            </div>
        </div>

    );
}