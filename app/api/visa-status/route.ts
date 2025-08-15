import {NextRequest, NextResponse} from "next/server";
import {getAllVisaStatus} from "@/repo/visa";

export async function GET(req: NextRequest){
    const searchParams = req.nextUrl.searchParams
    const pageParam = searchParams.get('page');
    const pageSizeParam = searchParams.get('pageSize');
    const pageSize = pageSizeParam && !isNaN(parseInt(pageSizeParam))
        ? parseInt(pageSizeParam)
        : 100;

    // Failsafe: default to includeNulls = false if not provided or invalid
    const includeNullsParam = searchParams.get('includeNulls');
    const includeNulls = includeNullsParam === 'true';

    // Failsafe: default to page 1 if not provided or invalid
    const page = pageParam && !isNaN(parseInt(pageParam)) ? parseInt(pageParam) : 1;
    const visas = await getAllVisaStatus(pageSize, page, includeNulls)
    return NextResponse.json(visas)
}