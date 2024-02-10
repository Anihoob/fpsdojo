export const dynamic = 'force-dynamic'
import Styles from './movies.module.css'
import GetMovies from './getMovies'
import { MovieCarousel } from '@/components/caroselslider'
import { getMovies } from '@/lib/supabase/carosel'

export default async function Movies() {
  const movieDetails = await getMovies()
  return (
    <div className={Styles.moviesmain}>
      <GetMovies/>
      <MovieCarousel data={movieDetails}/>
    </div>
  )
}
