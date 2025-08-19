import axios from "axios";
import {createClient} from "@/lib/client";
import {Countries} from "@/types";

const supabase = createClient();

async function getAllCountries () {
    const response = await axios.get("/api/countries");
    const countries: Countries = response.data;
    return countries;
}

async function getCountriesWithVisaStatus(): Promise<Countries> {
    const { data: countries} = await supabase.rpc("get_passport_info_with_status")
    return countries
}
export {getAllCountries, getCountriesWithVisaStatus};