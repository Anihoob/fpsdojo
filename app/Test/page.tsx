import { getLatestAnime } from "@/lib/supabase/carosel";

export default async function page() {

  const bruh = await getLatestAnime()

  return (
    <>
    </>
  )
}
