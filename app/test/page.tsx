'use client'
import { wp } from '@/wordpress/client';
import {GetAllPostsDocument, GetAllPostsQuery} from "@/wordpress/gql/graphql";
import {useEffect, useState} from "react";

export default function TestComponents(){
    const [posts, setPosts] = useState<NonNullable<GetAllPostsQuery['posts']>['nodes']>([])
    const vars = {first: 10}
    useEffect(() => {
        const data =wp.request(GetAllPostsDocument, vars).then((data)=> {
            console.log(data)
            setPosts(data.posts?.nodes ?? [])
        })
    }, []);

    return (
        <div>
            <ul>
                {posts?.map((p) =>
                    p ? <li key={p.id}>{p.title}</li> : null
                )}
            </ul>
        </div>
    )
}