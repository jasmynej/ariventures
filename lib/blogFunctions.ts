import {
    BlogCategory,
    BlogPost,
    BlogPosts,
    BlogTag,
    MediaUploadOptions,
    NewBlogPost,
    NewPostRequest
} from "@/types";
import {uploadMedia} from "@/lib/media";
import axios, {AxiosResponse} from "axios";
import {BlogStatus} from "@/types/Blog";
import {getOrCreateCategory, getOrCreateTags, insertBlogTags} from "@/repo/blog";

function createSlug(title: string) {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}


async function newBlogPostApi(newPost: NewBlogPost, status: BlogStatus) {
    let cover_img_url: string;

    if (newPost.cover_image instanceof FileList) {
        const uploadOptions: MediaUploadOptions = {
            bucket: 'blog-assets',
            file: newPost.cover_image[0]
        };
        cover_img_url = await uploadMedia(uploadOptions);
    } else {
        cover_img_url = newPost.cover_image;
    }

    let category_id = await getOrCreateCategory(newPost.category);
    let tag_ids = await getOrCreateTags(newPost.tags);
    const formattedPost: NewPostRequest = {
        title: newPost.title,
        slug: createSlug(newPost.title),
        cover_image: cover_img_url,
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

async function fetchBlogPosts(): Promise<BlogPosts> {
    const postsResponse: AxiosResponse = await axios.get('/api/blog');
    return postsResponse.data;
}

async function fetchBlogPost(slug: string): Promise<BlogPost> {
    const postResponse: AxiosResponse = await axios.get(`/api/blog/${slug}`);
    return postResponse.data;
}
async function fetchCategories(): Promise<BlogCategory[]> {
    const res = await fetch("/api/blog/categories");
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
}


async function fetchTags(): Promise<BlogTag[]> {
    const res = await fetch("/api/blog/tags");
    if (!res.ok) throw new Error("Failed to fetch tags");
    return res.json();
}

async function fetchCategoryBySlug(slug: string): Promise<BlogCategory> {
    const res = await fetch("/api/blog/category/" + slug);
    if (!res.ok) throw new Error("Failed to fetch category with slug: "+slug);
    return res.json();
}

function getBlogExcerpt(content: any, maxLength = 100): string {
    const paragraph = content.blocks.find(
        (block: any) => block.type === "paragraph"
    );

    if (!paragraph) return "";

    // Remove inline HTML tags (e.g., <b>, <i>, etc.)
    const plainText = paragraph.data.text.replace(/<[^>]+>/g, "");

    return plainText.length > maxLength
        ? plainText.slice(0, maxLength).trim() + "..."
        : plainText;
}

export {
    createSlug,
    newBlogPostApi,
    fetchBlogPost,
    fetchBlogPosts,
    fetchTags,
    fetchCategories,
    fetchCategoryBySlug,
    getBlogExcerpt,
};