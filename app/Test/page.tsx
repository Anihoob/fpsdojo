
import search from "@/lib/search"
import anime from "@/lib/supabase/anime"
import movie from "@/lib/supabase/movies"

export default async function page() {

  const bruh = await movie()
  console.log(bruh)

  return (
    <div>
      {bruh?.map((lmao)=> (
        <h4 style={{color:'white'}}>{lmao.title}</h4>
      ))}
    </div>
  )
}
