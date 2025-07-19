'use client';

import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import blogForm from '@/styles/admin/blogForm.module.css';

export default function BlogFeaturedImageUpload() {
    const { register, watch } = useFormContext();
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const file = watch("cover_image")?.[0]; // react-hook-form stores file input as an array

    useEffect(() => {
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);

            return () => URL.revokeObjectURL(objectUrl); // clean up on unmount
        }
    }, [file]);

    return (
        <div className={blogForm.imageUploadContainer}>
            <h2 className={blogForm.formSectionTitle}>Cover Image</h2>
            <div className={blogForm.imageUpload}>
                <div className={blogForm.imgIcon}>
                    <i className="fi fi-br-add-image"></i>
                </div>
                <label htmlFor="coverImage" className={blogForm.uploadLabel}>
                    Choose Image
                </label>
                <input
                    type="file"
                    id="coverImage"
                    accept="image/*"
                    {...register("cover_image", { required: true })}
                    className={blogForm.hiddenInput}
                />

                {previewUrl && (
                    <img
                        src={previewUrl}
                        alt="Cover preview"
                        className={blogForm.imagePreview}
                    />
                )}
            </div>


        </div>
    );
}