
import CaroselSlider from '@/components/caroselslider'
import Styles from './movies.module.css'
import MainSlider from '@/components/slidermain'

export default function Movies() {
  return (
    <div className={Styles.moviesmain}>
        <MainSlider image1='https://res.cloudinary.com/dp9icjdvf/image/upload/v1654939148/thebatman22.jpg' image2='https://res.cloudinary.com/dp9icjdvf/image/upload/v1657454462/1917potrait.jpg'/>
        <CaroselSlider section='60FPS'/>
        <CaroselSlider section='120FPS'/>
    </div>
  )
}
