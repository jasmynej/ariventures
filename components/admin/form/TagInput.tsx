'use client'

import React, { useState } from 'react';
import styles from '@/styles/admin/blogForm.module.css'; // optional: your custom styles

export default function TagInput({ value, onChange }: {
    value: string[],
    onChange: (tags: string[]) => void
}) {
    const [input, setInput] = useState('');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const newTag = input.trim();
            if (newTag && !value.includes(newTag)) {
                onChange([...value, newTag]);
            }
            setInput('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        onChange(value.filter(tag => tag !== tagToRemove));
    };

    return (
        <div>
            <label className={styles.label}>Tags</label>
            <div className={styles.container}>
                <input
                    type="text"
                    placeholder="Add tags separated by commas"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={styles.input}
                />
            </div>

            <div className={styles.tagList}>
                {value.map(tag => (
                    <div key={tag} className={styles.tag}>
                        <p>{tag}</p>
                        <div onClick={() => removeTag(tag)} className={styles.closeButton}>×</div>
                    </div>
                ))}
            </div>
        </div>
    );
}