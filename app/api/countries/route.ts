import {NextResponse} from "next/server";
import {createClient} from "@/lib/server"

export async function GET(){
    const supabase = await createClient()
    const {data, error} = await supabase
        .from('countries')
        .select('*')
        .order('name', {ascending: true})

    if (error) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json(data)
}