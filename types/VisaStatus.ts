import {Country} from "@/types/Country";

export type VisaStatus = {
    id: string
    passport: Country
    destination: Country
    status: string
    notes: string
}

export type VisaStatusResponse = {
    visas: VisaStatus[]
    count: number
    page: number
    pageSize: number
    totalPages: number
}

export type UpdateVisaStatus = {
    status: string
    notes: string
}

export type VisaFilterParams = {
    status: string | null
    passport: number | null
    destination: number | null
}