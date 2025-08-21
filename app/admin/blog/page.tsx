'use client';
import { useRouter } from 'next/navigation';
import {useState, useEffect} from 'react';
import buttons from '@/styles/buttons.module.css'
import layout from '@/styles/layout.module.css'
import {PostNode} from "@/types";
import {fetchWpBlogPosts} from "@/lib/blogFunctions";
import tables from "@/styles/tables.module.css"
import tableStyles from "@/styles/tables.module.css";
import buttonStyles from "@/styles/buttons.module.css";
import {OrderEnum, PostObjectsConnectionOrderbyEnum, RootQueryToPostConnectionWhereArgs} from "@/wordpress/gql/graphql";
export default function AdminBlog(){
    const router = useRouter();
    const [posts, setPosts] = useState<PostNode[]>([]);
    const whereQuery  : RootQueryToPostConnectionWhereArgs = {
        orderby: [{ field: 'DATE' as PostObjectsConnectionOrderbyEnum, order: 'DESC' as OrderEnum }]
    }
    useEffect(() => {
        fetchWpBlogPosts(100, '', whereQuery)
            .then((data)=> {
                setPosts((data.posts?.nodes ?? []).filter(Boolean) as PostNode[])
            })
    }, []);

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
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                    </thead>
                    <tbody>
                    {posts.map((post) => {
                        return (
                            <tr key={post.id}>
                                <td>
                                    <p>{post.title}</p>
                                </td>
                                <td>{post.date}</td>
                                <td>{post.status}</td>
                                <td>
                                    <div className={tableStyles.actions}>
                                        <button className={buttonStyles.edit}>
                                            <i className="fi fi-tr-pen-square"></i>
                                        </button>
                                        <button>
                                            <i className="fi fi-rr-eye"></i>
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