import {GetAllPostsDocument, GetAllPostsQuery, PostsByModifiedQuery} from "@/wordpress/gql/graphql";
import {NodeOfConnection} from "@/types/core";

export type CategoryNode = NodeOfConnection<GetAllPostsQuery['categories']>;
export type TagNode = NodeOfConnection<GetAllPostsQuery['tags']>;
export type PostNode = NodeOfConnection<GetAllPostsQuery['posts']>;
export type PipelinePostNode = NodeOfConnection<PostsByModifiedQuery['posts']>

export type NormalizedPost = {
    wp_post_id: number
    title: string
    slug: string
    plaintext: string
    categories: string[]
    tags: string[]
    published_at: Date
    excerpt: string
    modified: Date
}