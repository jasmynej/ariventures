import {MediaUploadOptions, NewBlogPost, NewPostRequest} from "@/types";
import {uploadMedia} from "@/lib/media";
import axios from "axios";

function createSlug(title: string) {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}


async function newBlogPostApi(newPost: NewBlogPost, status: string) {
    // @ts-ignore
    let uploadOptions: MediaUploadOptions = {
        bucket:'blog-assets',
        folder:'header-images',
        file: newPost.cover_image[0]
    }
    let cover_img_url = await uploadMedia(uploadOptions);
    const formattedPost: NewPostRequest = {
        title: newPost.title,
        slug: createSlug(newPost.title),
        cover_image: cover_img_url,
        content: newPost.content,
        author_id: newPost.author_id,
        published_at: newPost.published_at,
        status: status
    }
    axios.post('/api/blog', formattedPost)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error);
        })

}
export {createSlug, newBlogPostApi};