
import CaroselSlider from '@/components/caroselslider'
import Styles from './home.module.css'
import MainSlider from '@/components/slidermain'

export default function Home() {
  return (
    <div className={Styles.homemain}>
        <MainSlider image1='https://res.cloudinary.com/dxi9wcchp/image/upload/v1635591822/jujutsu_kaizen_gazruz.jpg' image2='https://res.cloudinary.com/dp9icjdvf/image/upload/v1667323307/Frame_3bluelockposter_foyhti.png'/>
        <CaroselSlider section='60FPS'/>
        <CaroselSlider section='120FPS'/>
    </div>
  )
}
