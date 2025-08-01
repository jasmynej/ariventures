import {createClient} from '@/lib/client'
import {BlogPostTag, NewPostRequest} from "@/types";

const supabase = createClient();
export async function getAllBlogPosts() {
    const { data, error } = await supabase
        .from('blog_posts')
        .select(`
            *,
            category:category (
                id,
                name,
                slug
            ),
            tags:blog_post_tags (
                tag:tag_id (
                    id,
                    name,
                    slug
                )
            )
        `)
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
}

export async function getBlogPostBySlug(slug: string) {
    const { data, error } = await supabase
        .from('blog_posts')
        .select(`
            *,
            category:category (
                id,
                name,
                slug
            ),
            tags:blog_post_tags (
                tag:tag_id (
                    id,
                    name,
                    slug
                )
            )
        `)
        .eq('slug', slug)
        .single();

    if (error) throw error;
    return {
        ...data,
        tags: data.tags.map((entry: { tag: any }) => entry.tag)
    };
}

export async function createBlogPost(post: NewPostRequest) {
    const { data, error } = await supabase
        .from('blog_posts')
        .insert([post])
        .select()
        .single();

    if (error) {
        console.log(error);
        throw error
    }
    return data;
}

export async function updateBlogPost(id: string, updates: Partial<Omit<Parameters<typeof createBlogPost>[0], "author_id">>) {
    const { data, error } = await supabase
        .from('blog_posts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function deleteBlogPost(id: string) {
    const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

    if (error) throw error;
}

export async function getAllCategories() {
    const { data, error } = await supabase.from("blog_categories").select("*");
    if (error) throw new Error(error.message);
    return data;
}

export async function getAllTags() {
    const { data, error } = await supabase.from("blog_tags").select("*");
    if (error) throw new Error(error.message);
    return data;
}

export async function getCategoryBySlug(slug: string) {
    const { data, error } = await supabase.from("blog_categories")
        .select("*")
        .eq('slug', slug)
        .single();
    if (error) throw new Error(error.message);
    return data;
}

export async function getOrCreateCategory(category: string): Promise<number> {
    const slug = category.toLowerCase().replace(/\s+/g, '-');
    const { data: existing, error: fetchError } = await supabase
        .from('blog_categories')
        .select('id')
        .eq('slug', slug)
        .single();

    if (existing) return existing.id;

    const { data: created, error: insertError } = await supabase
        .from('blog_categories')
        .insert({name:category, slug })
        .select()
        .single();

    if (insertError) throw new Error(insertError.message);
    return created.id;
}

export async function getOrCreateTags(names: string[]): Promise<number[]> {
    const tag_ids: number[] = [];

    for (const name of names) {
        const slug = name.toLowerCase().replace(/\s+/g, '-');

        const { data: existing } = await supabase
            .from('blog_tags')
            .select('id')
            .eq('slug', slug)
            .single();

        if (existing) {
            tag_ids.push(existing.id);
            continue;
        }

        const { data: created, error: insertError } = await supabase
            .from('blog_tags')
            .insert({ name, slug })
            .select('*')
            .single();

        if (insertError) throw new Error(insertError.message);
        tag_ids.push(created.id);
    }

    return tag_ids;
}

export async function insertBlogTags(post_id:string, tag_ids: number[]) {
    const records: Omit<BlogPostTag, 'id'>[] = tag_ids.map(tag_id => ({
        post_id,
        tag_id
    }));

    const { data, error } = await supabase
        .from('blog_post_tags')
        .insert(records);

    if (error) {
        throw new Error(`Failed to insert blog post tags: ${error.message}`);
    }

    return data;
}