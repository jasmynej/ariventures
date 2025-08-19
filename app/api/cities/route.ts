import {NextResponse} from "next/server";
import {getAllCities} from "@/repo/cities";

export async function GET() {
    const cities = await getAllCities()
    return NextResponse.json(cities)
}