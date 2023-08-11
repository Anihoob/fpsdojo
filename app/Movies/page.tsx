
import CaroselSlider from '@/components/caroselslider'
import Styles from './movies.module.css'
import MainSlider from '@/components/slidermain'

export default function Movies() {
  return (
    <div className={Styles.moviesmain}>
        <MainSlider />
        <CaroselSlider section='60FPS'/>
        <CaroselSlider section='120FPS'/>
    </div>
  )
}
