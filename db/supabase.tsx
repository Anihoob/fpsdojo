import { createClient } from '@supabase/supabase-js'

export default function Supabase() {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_API as string)

    return supabase
}
