import axios from "axios";
import {City, VisaStatus, VisaStatusResponse} from "@/types";

async function fetchAllCities(): Promise<City[]>{
    const cities = await axios.get('/api/cities')
    return cities.data
}

async function fetchAllVisaStatus(page: number, includeNulls: boolean, pageSize: number): Promise<VisaStatusResponse> {
    const visaStatuses = await axios.get(`/api/visa-status?page=${page}&pageSize=${pageSize}&includeNulls=${includeNulls}`)
    return visaStatuses.data
}

async function fetchVisaStatus(passport: number | undefined, destination: number | undefined): Promise<VisaStatus>{
    const visaStatus = await axios.get(`/api/visa-status?passport=${passport}&destination=${destination}`)
    return visaStatus.data
}
export {fetchAllCities, fetchAllVisaStatus, fetchVisaStatus}