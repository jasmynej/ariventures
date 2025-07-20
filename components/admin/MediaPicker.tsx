'use client';

import React, { useEffect, useState } from 'react';
import { fetchImages, uploadMedia } from '@/lib/media';
import blogForm from '@/styles/admin/blogForm.module.css';

type MediaPickerProps = {
    value?: string | FileList;
    onChange: (value: string | FileList) => void;
};

export default function MediaPicker({ value, onChange }: MediaPickerProps) {
    const [images, setImages] = useState<{ name: string; url: string }[]>([]);
    const [uploading, setUploading] = useState(false);
    const [tab, setTab] = useState(0);

    useEffect(() => {
        fetchImages().then(setImages);
    }, []);


    async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        const url = await uploadMedia({ file, bucket: "blog-assets" });
        setImages(prev => [{ name: file.name, url }, ...prev]);
        setUploading(false);
        onChange(e.target.files as FileList); // update react-hook-form with FileList
    }

    return (
        <div>
            <div className={blogForm.mediaPickerTabs}>
                <p
                    className={tab === 0 ? blogForm.activeTab : ''}
                    onClick={() => setTab(0)}
                >
                    Upload Media
                </p>
                <p
                    className={tab === 1 ? blogForm.activeTab : ''}
                    onClick={() => setTab(1)}
                >
                    Choose Existing
                </p>
            </div>

            {tab === 0 && (
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
                        onChange={handleUpload}
                        className={blogForm.hiddenInput}
                    />
                </div>
            )}

            {tab === 1 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '1em' }}>
                    {images.map(img => (
                        <div
                            key={img.url}
                            onClick={() => onChange(img.url)}
                            style={{
                                cursor: 'pointer',
                                border: value === img.url ? '2px solid var(--primary-rose)' : '1px solid #ccc',
                                padding: '2px',
                            }}
                        >
                            <img
                                src={img.url}
                                alt={img.name}
                                style={{ width: 100, height: 100, objectFit: 'cover' }}
                            />
                        </div>
                    ))}
                </div>
            )}


        </div>
    );
}