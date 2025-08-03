'use client';
import { useRouter } from 'next/navigation';
import {useState, useEffect} from 'react';
import buttons from '@/styles/buttons.module.css'
import layout from '@/styles/layout.module.css'
import {BlogPosts} from "@/types";
import {getAllBlogPosts, deleteBlogPost} from "@/repo/blog";
import tables from "@/styles/tables.module.css"
import tableStyles from "@/styles/tables.module.css";
import buttonStyles from "@/styles/buttons.module.css";
export default function AdminBlog(){
    const router = useRouter();
    const [posts, setPosts] = useState<BlogPosts>([]);

    useEffect(() => {
        getAllBlogPosts().then(posts => setPosts(posts));
    }, []);

    const deletePost = (id: string) => {
        deleteBlogPost(id).then(() => {
            console.log('deleted '+ id)
            setPosts(prev => prev.filter(post => post.id !== id));
        })
    }

    return (
        <div className={layout.section}>
            <h1>All Blog Posts</h1>
            <button
                className={buttons.primary}
                onClick={() => router.push("/admin/blog/new")}>New Post</button>
            <div className={tables.primaryTableWrapper}>
                <table className={tables.primaryTable}>
                    <thead className={tables.primaryTableHeader}>
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                    </thead>
                    <tbody>
                    {posts.map((post, i) => {
                        return (
                            <tr key={post.id}>
                                <td>
                                    <div></div>
                                    <p>{post.title}</p>
                                </td>
                                <td>{post.category.name}</td>
                                <td>{post.published_at}</td>
                                <td>{post.status}</td>
                                <td>
                                    <div className={tableStyles.actions}>
                                        <button className={buttonStyles.edit}>
                                            <i className="fi fi-tr-pen-square"></i>
                                        </button>
                                        <button
                                            onClick={() => {deletePost(post.id)}}
                                            className={buttonStyles.trash}>
                                            <i className="fi fi-tr-trash-xmark"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>

        </div>
    )
}