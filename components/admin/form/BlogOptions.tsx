import { useFormContext } from "react-hook-form";
import blogFormStyles from '@/styles/admin/blogForm.module.css'
import adminUsers from '@/data/adminUsers.json'
export default function BlogOptions(){
    const { register} = useFormContext();
    return (
        <div className={blogFormStyles.blogOptionsWrapper}>
            <h2 className={blogFormStyles.formSectionTitle}>Publishing Options</h2>
            <label className={blogFormStyles.label}>Author</label>
            <select className={blogFormStyles.select} {...register("author_id", { required: true })}>
                {
                    adminUsers.map((user)=> {
                        return (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        )
                    })
                }
            </select>
            <label className={blogFormStyles.label}>Publish Date</label>
            <input type="date" className={blogFormStyles.datePicker} {...register("published_at", { required: false })}/>
        </div>
    )
}