import Styles from './home.module.css'
import GetAnimes from './getAnimes'
import { getAnime } from '@/lib/supabase/carosel'
import { AnimeCarousel } from '@/components/caroselslider'

export default async function Home() {
  const animeDetails = await getAnime()
  return (
    <div className={Styles.homemain}>
      <GetAnimes/>
      <AnimeCarousel data={animeDetails}/>
    </div>
  )
}
