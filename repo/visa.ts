import {createClient} from "@/lib/client";
import {UpdateVisaStatus, VisaFilterParams, VisaStatus} from "@/types";

const supabase = createClient();

async function getAllVisaStatus(
    pageSize: number = 100,
    page: number = 1,
    includeNulls: boolean = false,
    filters: VisaFilterParams = {
        status: null,
        passport: null,
        destination: null
    }
) {
    let query = supabase
        .from("visa_status")
        .select(`
            id,
            passport(*), 
            destination(*),
            status,
            notes
        `)
        .range((page - 1) * pageSize, page * pageSize - 1);

    let countQuery = supabase
        .from("visa_status")
        .select("*", { count: "exact", head: true });

    if (!includeNulls) {
        console.log("not including nulls")
        query = query.not("status", "is", null);
        countQuery = countQuery.not("status", "is", null);
    }

    // Apply filters dynamically
    if (filters?.status) {
        query = query.eq("status", filters.status);
        countQuery = countQuery.eq("status", filters.status);
    }

    if (filters?.passport !== null && filters?.passport !== undefined) {
        query = query.eq("passport", filters.passport);
        countQuery = countQuery.eq("passport", filters.passport);
    }

    if (filters?.destination !== null && filters?.destination !== undefined) {
        query = query.eq("destination", filters.destination);
        countQuery = countQuery.eq("destination", filters.destination);
    }

    const { data: visas } = await query;
    const { count } = await countQuery;

    const totalPages = Math.ceil((count || 0) / pageSize);

    return { visas, count, page, pageSize, totalPages };
}

async function getStatus(passport: number, destination: number) {
    const {data: visaStatus, error} = await supabase
        .from("visa_status")
        .select("" +
            "id, " +
            "passport(*), " +
            "destination(*), " +
            "status, " +
            "notes")
        .eq("passport", passport)
        .eq("destination", destination)

    if (error) throw error
    return visaStatus
}

async function getStatusById(id: number) {
    const { data: status} = await supabase
        .from("visa_status")
        .select()
        .eq("id", id)
    return status
}

async function updateStatus(id: number, updatedStatus: UpdateVisaStatus) {
    const { data: newStatus, error} = await supabase
        .from("visa_status")
        .update(updatedStatus)
        .eq("id", id)
        .select('*');
    console.log(updatedStatus)
    if(error) throw error
    return newStatus
}

export {getAllVisaStatus, getStatus, getStatusById, updateStatus}