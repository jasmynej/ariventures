import axios from "axios";
import {City, VisaStatusResponse} from "@/types";

async function fetchAllCities(): Promise<City[]>{
    const cities = await axios.get('/api/cities')
    return cities.data
}

async function fetchAllVisaStatus(page: number, includeNulls: boolean, pageSize: number): Promise<VisaStatusResponse> {
    const visaStatuses = await axios.get(`/api/visa-status?
    page=${page}&
    pageSize=${pageSize}&
    includeNulls=${includeNulls}`)
    return visaStatuses.data
}

export {fetchAllCities, fetchAllVisaStatus}