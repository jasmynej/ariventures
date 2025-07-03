// lib/supabase-client.ts
import {createBrowserClient} from '@supabase/ssr'// optional if using types
import { Database } from '@/types/supabase'
import { cookies } from 'next/headers'

export const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

