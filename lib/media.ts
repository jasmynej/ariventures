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