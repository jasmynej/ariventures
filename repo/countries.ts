import axios from "axios";
import {Countries} from "@/types";

async function getAllCountries () {
    const response = await axios.get("/api/countries");
    const countries: Countries = response.data;
    return countries;
}

export {getAllCountries};