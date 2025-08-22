import {wp} from "@/wordpress/client";
import {
    GetPostBySlugDocument,
    GetPostBySlugQuery,
    GetAllPostsDocument,
    GetAllPostsQuery,
    RootQueryToPostConnectionWhereArgs, PostObjectsConnectionOrderbyEnum, OrderEnum, PostStatusEnum
} from "@/wordpress/gql/graphql";

const defaultWhere: RootQueryToPostConnectionWhereArgs = {
    status: 'PUBLISH' as PostStatusEnum,
    orderby: [{ field: 'DATE' as PostObjectsConnectionOrderbyEnum, order: 'DESC' as OrderEnum }],
};




async function fetchWpBlogPost(slug: string): Promise<GetPostBySlugQuery> {
    return await wp.request(GetPostBySlugDocument, {slug})
}

async function fetchWpBlogPosts(first: number, after: string, where: RootQueryToPostConnectionWhereArgs = defaultWhere): Promise<GetAllPostsQuery> {
    return await wp.request(GetAllPostsDocument, {first, after, where})
}


function getBlogExcerpt(excerpt: string | null | undefined, maxLength = 100): string {
    if (!excerpt) return "";

    // Strip all HTML tags
    const plainText = excerpt.replace(/<[^>]+>/g, "").trim();

    return plainText.length > maxLength
        ? plainText.slice(0, maxLength).trim() + "..."
        : plainText;
}

export {
    getBlogExcerpt,
    fetchWpBlogPost,
    fetchWpBlogPosts
};