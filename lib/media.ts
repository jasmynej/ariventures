import { createClient } from './client'; // or wherever your Supabase client is
import {MediaUploadOptions} from "@/types";
import { v4 as uuidv4 } from 'uuid';

export async function uploadMedia({
                                      bucket,
                                      folder,
                                      file,
                                  }: MediaUploadOptions): Promise<string> {
    const supabase = createClient();

    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = folder ? `${folder}/${fileName}` : fileName;

    const { error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
        });

    if (error) {
        throw new Error(`Media upload failed: ${error.message}`);
    }

    const { data: publicUrlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);
    console.log(publicUrlData.publicUrl);
    return publicUrlData.publicUrl;
}

export async function fetchImages() {
    const supabase = createClient();

    const { data, error } = await supabase
        .storage
        .from('blog-assets')
        .list('', {
            limit: 100,
            offset: 0,
            sortBy: { column: 'created_at', order: 'desc' },
        });

    if (error) throw error;

    return data.map(file => ({
        name: file.name,
        url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blog-assets/${file.name}`,
    }));
}