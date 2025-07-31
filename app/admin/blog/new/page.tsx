'use client'
import {useForm, FormProvider, FieldValues} from "react-hook-form";
import BlogDetails from "@/components/admin/form/BlogDetails";
import blogFormStyles from "@/styles/admin/blogForm.module.css"
import buttons from "@/styles/buttons.module.css"
import text from "@/styles/typography.module.css"
import React from "react";
import {useRef} from "react";
import BlogFeaturedImageUpload from "@/components/admin/form/BlogFeaturedImageUpload";
import BlogOptions from "@/components/admin/form/BlogOptions";
import {newBlogPostApi} from "@/lib/blogFunctions";
import type {NewBlogPost} from "@/types";
import MediaPicker from "@/components/admin/MediaPicker";
import {BlogCategoriesTags} from "@/components/admin/form/BlogCategoriesTags";
import {BlogStatus} from "@/types/Blog";

export default function NewBlogPost() {
    const form = useForm({
        defaultValues: {
            author_id: "bc4bc21c-78ca-4b5c-b9f2-c267c9444c5c", // set current logged in user id
            published_at: null, // Format: YYYY-MM-DD
            category: "General Travel",
        }
    });
    const submitTypeRef = useRef<BlogStatus>(BlogStatus.DRAFT);

    const onSubmit = form.handleSubmit((data: FieldValues, event?: React.BaseSyntheticEvent) => {
        const submitType = submitTypeRef.current;

        console.log("Submit Type:", submitType);
        console.log(data)
        const newPost: NewBlogPost = {
            title:data.title,
            slug: data.slug,
            content: data.content,
            cover_image: data.cover_image,
            author_id: data.author_id,
            published_at: data.published_at,
            status: submitType,
            tags: data.tags,
            category: data.category,
        }

        newBlogPostApi(newPost, submitType).then((data) => {
            console.log(data)
        })

    });

    return (
        <FormProvider {...form}>
            <form onSubmit={onSubmit} className={blogFormStyles.blogForm}>
                <div className={blogFormStyles.header}>
                    <h1 className={text.adminPageTitle}>
                        <span><i className="fi fi-tr-arrow-small-left"></i></span>
                        Create New Blog Post</h1>
                    <div className={blogFormStyles.headerActions}>
                        <button
                            type="submit"
                            onClick={() => (submitTypeRef.current = BlogStatus.DRAFT)}
                            className={buttons.borderButton}>
                            Save As Draft
                        </button>

                        <button
                            type="submit"
                            onClick={() => (submitTypeRef.current = BlogStatus.PUBLISHED)}
                            className={buttons.primarySmall}>
                            Publish
                        </button>
                    </div>
                </div>

                <div className={blogFormStyles.innerFormWrapper}>
                    <div className={blogFormStyles.colMain}>
                        <BlogFeaturedImageUpload/>
                        <BlogDetails/>
                    </div>
                    <div className={blogFormStyles.colSecondary}>
                        <BlogOptions/>
                        <BlogCategoriesTags/>
                    </div>
                </div>

            </form>
        </FormProvider>
    )
}