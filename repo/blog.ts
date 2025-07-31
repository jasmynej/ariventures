import { createClient } from '@/lib/client'

export async function getAllBlogPosts() {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
}

export async function getBlogPostBySlug(slug: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) throw error;
    return data;
}

export async function createBlogPost(post: {
    title: string;
    slug: string;
    content: any;
    cover_image: string;
    author_id: string;
    status?: string;
    published_at?: string;
}) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('blog_posts')
        .insert([post])
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function updateBlogPost(id: string, updates: Partial<Omit<Parameters<typeof createBlogPost>[0], "author_id">>) {
    const supabase = createClient();
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
    const supabase = createClient();
    const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

    if (error) throw error;
}

export async function getAllCategories() {
    const supabase = createClient();
    const { data, error } = await supabase.from("blog_categories").select("*");
    if (error) throw new Error(error.message);
    return data;
}

export async function getAllTags() {
    const supabase = createClient();
    const { data, error } = await supabase.from("blog_tags").select("*");
    if (error) throw new Error(error.message);
    return data;
}

export async function getCategoryBySlug(slug: string) {
    const supabase = createClient();
    const { data, error } = await supabase.from("blog_categories")
        .select("*")
        .eq('slug', slug)
        .single();
    if (error) throw new Error(error.message);
    return data;
}