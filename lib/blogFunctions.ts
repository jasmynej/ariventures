import {BlogPost, BlogPosts, MediaUploadOptions, NewBlogPost, NewPostRequest} from "@/types";
import {uploadMedia} from "@/lib/media";
import axios, {AxiosResponse} from "axios";

function createSlug(title: string) {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}


async function newBlogPostApi(newPost: NewBlogPost, status: string) {
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

    const formattedPost: NewPostRequest = {
        title: newPost.title,
        slug: createSlug(newPost.title),
        cover_image: cover_img_url,
        content: newPost.content,
        author_id: newPost.author_id,
        published_at: newPost.published_at,
        status: status
    };

    try {
        const response = await axios.post('/api/blog', formattedPost);
        console.log(response);
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


export {createSlug, newBlogPostApi, fetchBlogPost, fetchBlogPosts};