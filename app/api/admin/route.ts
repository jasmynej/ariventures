import {NextRequest, NextResponse} from "next/server";
import {createClient} from "@/lib/server"


export async function GET(req: NextRequest){
    const supabase = await createClient()

    const {data, error} = await supabase
        .from('admin')
        .select('*')

    if (error) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json({data})


}