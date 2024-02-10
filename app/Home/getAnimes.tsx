import { SliderAnime } from "@/components/slidermain"
import Anime from "@/lib/supabase/anime"

export default async function GetAnimes() {
    let data = await Anime()
  return (
    <>
    <SliderAnime animeData={data} />
    </>
  )
}
