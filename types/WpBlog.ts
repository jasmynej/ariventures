import {GetAllPostsDocument, GetAllPostsQuery} from "@/wordpress/gql/graphql";
import {NodeOfConnection} from "@/types/core";

export type CategoryNode = NodeOfConnection<GetAllPostsQuery['categories']>;
export type TagNode = NodeOfConnection<GetAllPostsQuery['tags']>;
export type PostNode = NodeOfConnection<GetAllPostsQuery['posts']>;
