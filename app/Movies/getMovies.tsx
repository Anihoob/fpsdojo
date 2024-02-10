import SliderMovie from "@/components/slidermain"
import movie from "@/lib/supabase/movies"

export default async function GetMovies() {
    let data = await movie()
  return (
    <SliderMovie movieData={data}/>
  )
}
