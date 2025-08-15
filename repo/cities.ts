import {createClient} from "@/lib/client";
import {City} from "@/types";

const supabase = createClient();

async function getAllCities(): Promise<City[]>{
    const {data: cities, error} = await supabase
        .from("cities")
        .select(`*,
                country:countries (*),
                images: city_images(*)`)
        .order('country_id')
    if (error) throw error;


    return cities
}

export {getAllCities}