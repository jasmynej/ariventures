'use client'
import { Controller, useFormContext } from "react-hook-form";
import dynamic from "next/dynamic";

const BlogEditor = dynamic(() => import("@/components/admin/form/BlogEditor"), {
    ssr: false,
});
import styles from "@/styles/admin/blogForm.module.css"
import {createSlug} from "@/lib/blogFunctions";
export default function BlogDetails() {
    const { control, register, watch } = useFormContext();
    const title = watch("title")

    return (
        <div className={styles.blogDetailsWrapper}>
            <h3 className={styles.formSectionTitle}>Blog Details</h3>
            <div className={styles.fieldGroup}>
                <label htmlFor="title" className={styles.label}>
                    Blog Title
                </label>
                <input
                    type="text"
                    id="title"
                    placeholder="Enter blog post title"
                    className={styles.inputTitle}
                    {...register("title", { required: true })}
                />
                {title && (
                    <div>
                        <label htmlFor="title" className={styles.label}>Slug</label>
                        <input type="text" className={styles.input}
                               value={createSlug(title)}
                               {...register("slug", { required: true })}
                        />
                    </div>

                )}
            </div>

            {/* Blog Content (Editor.js) */}
            <div className={styles.fieldGroup}>
                <label className={styles.label}>Blog Content</label>
                <Controller
                    name="content"
                    control={control}
                    defaultValue={null}
                    render={({ field }) => (
                        <BlogEditor value={field.value} onChangeAction={field.onChange} />
                    )}
                />
            </div>
        </div>
    );
}