export enum BlogStatus {
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED',
    PRIVATE = 'PRIVATE',
    SCHEDULED = 'SCHEDULED',
}

export type BlogCategory = {
    id: number;
    name: string;
    slug: string;
}

export type BlogTag = {
    id: number;
    name: string;
    slug: string;
}

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
    category: BlogCategory;
    tags: BlogTag[];
}

export type NewBlogPost = {
    title: string;
    slug: string;
    content: any;
    cover_image: FileList | string,
    published_at: Date,
    author_id: string;
    status: BlogStatus;
    category: string;
    tags: string[];
}

export type NewPostRequest = {
    title: string;
    slug: string;
    content: any;
    cover_image: string
    published_at?: Date,
    status: string;
    author_id: string;
    category: number;
}

export type BlogPostTag = {
    id: number;
    post_id: string;
    tag_id: number;
}
export type BlogPosts = BlogPost[];