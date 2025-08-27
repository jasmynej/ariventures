import {NextResponse} from "next/server";
import {syncBatch} from "@/lib/pipeline";

export async function GET(){
    let wm = await syncBatch()
    return NextResponse.json(wm)
}
