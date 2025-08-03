'use client'
import blogForm from '@/styles/admin/blogForm.module.css'
import {useState, useEffect} from 'react'
import {BlogCategory} from "@/types";
import {fetchCategories} from "@/lib/blogFunctions";
import TagInput from "@/components/admin/form/TagInput";
import { Controller, useFormContext } from 'react-hook-form';

export function BlogCategoriesTags() {
    const [categories, setCategories] = useState<BlogCategory[]>([])
    const { control, register } = useFormContext();
    useEffect(() => {
        fetchCategories().then(res => (
            setCategories(res)))
    }, []);
    return (
        <div className={blogForm.blogOptionsWrapper}>
            <h2 className={blogForm.formSectionTitle}>
                Categories & Tags

            </h2>
            <label className={blogForm.label}>Category</label>
            <select className={blogForm.select} {...register('category')}>
                {categories.length > 0 && (
                    categories.map((category) => (
                        <option key={category.id}>{category.name}</option>
                    ))
                )}
            </select>
            <Controller
                name="tags"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                    <TagInput value={field.value} onChange={field.onChange} />
                )}
            />
        </div>
    )
}