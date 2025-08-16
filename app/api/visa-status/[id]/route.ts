import {NextRequest, NextResponse} from "next/server";
import {getStatusById, updateStatus} from "@/repo/visa";

export async function GET(req: NextRequest, props: { params: Promise<{ id: number }> }) {
    const params = await props.params;
    const status = await getStatusById(params.id)
    return NextResponse.json(status ? status[0] : [0])
}

export async function PATCH(req: NextRequest, props: {params: Promise<{id: number}>}){
    const params = await props.params;
    const statusBody = await req.json()
    const updatedStatus =await updateStatus(params.id, statusBody)

    return NextResponse.json(updatedStatus)
}