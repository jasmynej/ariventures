import {NextRequest, NextResponse} from "next/server";
import {getAllVisaStatus, getStatus} from "@/repo/visa";
import {VisaFilterParams} from "@/types";

export async function GET(req: NextRequest){
    const searchParams = req.nextUrl.searchParams
    if(searchParams.has('page')){
        const page = parseInt(searchParams.get("page") || "1")
        const pageSize = parseInt(searchParams.get("pageSize") || "100")
        const includeNulls = searchParams.get('includeNulls') === 'true';

        console.log(includeNulls)
        // Optional filters
        const status = searchParams.get("status");
        const passportParam = searchParams.get("passport");
        const destinationParam = searchParams.get("destination");

        const filters: VisaFilterParams = {
            status: status || null,
            passport: passportParam ? parseInt(passportParam) : null,
            destination: destinationParam ? parseInt(destinationParam) : null,
        };


        const visas = await getAllVisaStatus(pageSize, page, includeNulls, filters)
        return NextResponse.json(visas)
    }
    else if (searchParams.has("passport")){
        const passport = parseInt(searchParams.get("passport") || "1")
        const destination = parseInt(searchParams.get("destination") || "2")

        const visa = await getStatus(passport, destination)
        return NextResponse.json(visa[0])
    }
    else {
        return NextResponse.json({ error: "No valid query parameters provided" }, { status: 400 });
    }
}
