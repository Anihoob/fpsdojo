import CaroselSlider from '@/components/caroselslider'
import Styles from './home.module.css'
import MainSlider from '@/components/slidermain'

export default function Home() {
  return (
    <div className={Styles.homemain}>
        <MainSlider/>
        <CaroselSlider starting={1} ending={5}/>
        <CaroselSlider starting={6} ending={10}/>
    </div>
  )
}
