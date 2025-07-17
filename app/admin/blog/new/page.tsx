'use client'
import {useForm, FormProvider, FieldValues} from "react-hook-form";
import BlogDetails from "@/components/admin/form/BlogDetails";
import blogFormStyles from "@/styles/admin/blogForm.module.css"
import buttons from "@/styles/buttons.module.css"
import text from "@/styles/typography.module.css"
import React from "react";
import {useRef} from "react";

export default function NewBlogPost() {
    const form = useForm();
    const submitTypeRef = useRef<'draft' | 'publish'>('draft');

    const onSubmit = form.handleSubmit((data: FieldValues, event?: React.BaseSyntheticEvent) => {
        const submitType = submitTypeRef.current;

        console.log("Submit Type:", submitType);

        if (submitType === 'publish') {
            // publish API
        } else {
            // save draft API
        }
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
                            onClick={() => (submitTypeRef.current = 'draft')}
                            className={buttons.borderButton}
                        >
                            Save As Draft
                        </button>

                        <button
                            type="submit"
                            onClick={() => (submitTypeRef.current = 'publish')}
                            className={buttons.primarySmall}
                        >
                            Publish
                        </button>
                    </div>
                </div>
                <div className={blogFormStyles.colMain}>
                    <BlogDetails/>
                </div>

            </form>
        </FormProvider>
    )
}