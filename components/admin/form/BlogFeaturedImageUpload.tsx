'use client';

import { useFormContext, Controller } from "react-hook-form";
import React, { useEffect, useState } from "react";
import blogForm from '@/styles/admin/blogForm.module.css';
import MediaPicker from "@/components/admin/MediaPicker";

export default function BlogFeaturedImageUpload() {
    const { control } = useFormContext();
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    return (
        <div className={blogForm.imageUploadContainer}>
            <h2 className={blogForm.formSectionTitle}>Cover Image</h2>
            <Controller
                name="cover_image"
                control={control}
                render={({ field: { onChange, value } }) => {
                    useEffect(() => {
                        if (value instanceof FileList && value[0]) {
                            const objectUrl = URL.createObjectURL(value[0]);
                            setPreviewUrl(objectUrl);
                            return () => URL.revokeObjectURL(objectUrl);
                        } else if (typeof value === 'string') {
                            setPreviewUrl(value);
                        }
                    }, [value]);

                    return (
                        <>
                            <MediaPicker value={value} onChange={onChange} />
                            {previewUrl && (
                                <img
                                    src={previewUrl}
                                    alt="Selected"
                                    className={blogForm.imagePreview}
                                />
                            )}
                        </>
                    );
                }}
            />
        </div>
    );
}