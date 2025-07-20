export type BlogPost = {
    id: string;
    title: string;
    slug: string;
    content: any;
    cover_image: string;
    status: string;
    published_at: string
    created_at: string
    updated_at: string
}

export type NewBlogPost = {
    title: string;
    slug: string;
    content: any;
    cover_image: FileList | string,
    published_at: Date,
    author_id: string;
}

export type NewPostRequest = {
    title: string;
    slug: string;
    content: any;
    cover_image: string
    published_at?: Date,
    status: string;
    author_id: string;
}

export type BlogPosts = BlogPost[];