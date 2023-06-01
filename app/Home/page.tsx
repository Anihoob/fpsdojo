
import HomeSlider from '@/components/homeslider'
import Styles from './home.module.css'
import HomeMainSlider from '@/components/homeslidermain'

export default function Home() {
  return (
    <div className={Styles.homemain}>
        <HomeMainSlider/>
        <HomeSlider section='60FPS'/>
        <HomeSlider section='120FPS'/>
    </div>
  )
}
