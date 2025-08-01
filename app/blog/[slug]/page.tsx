'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Blocks from 'editorjs-blocks-react-renderer';
import type { BlogPost } from '@/types';
import { fetchBlogPost } from '@/lib/blogFunctions';
import blogStyles from '@/styles/blog.module.css'
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

    useEffect(() => {
        if (params.slug) {
            fetchBlogPost(params.slug).then((d) => setPost(d));
        }
    }, [params.slug]);

    if (!post) return <p>Loading...</p>;

    return (
        <div >
            <img src={post.cover_image} className={blogStyles.coverImage} />
            <h1>{post.title}</h1>
            <Blocks data={post.content} renderers={customRenderers} />
        </div>
    );
}