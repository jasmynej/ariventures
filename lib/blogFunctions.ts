import {BlogCategory, BlogPost, BlogPosts, BlogTag, NewBlogPost, NewPostRequest} from "@/types";
import axios, {AxiosResponse} from "axios";
import {BlogStatus} from "@/types/Blog";
import {getOrCreateCategory, getOrCreateTags, insertBlogTags} from "@/repo/blog";
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
function createSlug(title: string) {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}


async function newBlogPostApi(newPost: NewBlogPost, status: BlogStatus) {
    // let cover_img_url: string;
    //
    // if (newPost.cover_image instanceof FileList) {
    //     const uploadOptions: MediaUploadOptions = {
    //         bucket: 'blog-assets',
    //         file: newPost.cover_image[0]
    //     };
    //     cover_img_url = await uploadMedia(uploadOptions);
    // } else {
    //     cover_img_url = newPost.cover_image;
    // }

    let category_id = await getOrCreateCategory(newPost.category);
    let tag_ids = await getOrCreateTags(newPost.tags);

    const formattedPost: NewPostRequest = {
        title: newPost.title,
        slug: createSlug(newPost.title),
        // @ts-ignore
        cover_image: newPost.cover_image,
        content: newPost.content,
        author_id: newPost.author_id,
        published_at: newPost.published_at,
        status: status.valueOf(),
        category: category_id,
    };

    try {
        console.log(formattedPost);
        const response = await axios.post('/api/blog', formattedPost);
        const blogPost: BlogPost = await response.data;
        const tags = await insertBlogTags(blogPost.id, tag_ids);
        console.log(tags);
        console.log(blogPost);
    } catch (error) {
        console.error(error);
    }
}


async function fetchWpBlogPost(slug: string): Promise<GetPostBySlugQuery> {
    return await wp.request(GetPostBySlugDocument, {slug})
}

async function fetchWpBlogPosts(first: number, after: string, where: RootQueryToPostConnectionWhereArgs = defaultWhere): Promise<GetAllPostsQuery> {
    return await wp.request(GetAllPostsDocument, {first, after, where})
}
async function fetchCategories(): Promise<BlogCategory[]> {
    const res = await fetch("/api/blog/categories");
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
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
    createSlug,
    newBlogPostApi,
    fetchCategories,
    getBlogExcerpt,
    fetchWpBlogPost,
    fetchWpBlogPosts
};