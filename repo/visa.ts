import {createClient} from "@/lib/client";
import {VisaStatus} from "@/types";

const supabase = createClient();

async function getAllVisaStatus(pageSize: number = 100, page: number = 1, includeNulls: boolean = false) {
    let query = supabase
        .from("visa_status")
        .select(`
                id,
                passport(name, flag_img), 
                destination(name, flag_img),
                status,
                notes
            `)
        .range((page - 1) * pageSize, page * pageSize - 1);
    let countQuery = supabase.from("visa_status").select("*", { count: "exact", head: true });
    if (!includeNulls) {
        query = query.not("status", "is", null);
        countQuery = countQuery.not("status", "is", null);
    }

    const { data: visas} = await query;
    const { count } = await countQuery;

    // @ts-ignore
    const totalPages = Math.ceil(count / pageSize);
    return {visas, count, page, pageSize, totalPages}
}

export {getAllVisaStatus}