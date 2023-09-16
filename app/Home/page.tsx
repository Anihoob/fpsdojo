import CaroselSlider from '@/components/caroselslider'
import Styles from './home.module.css'
import MainSlider from '@/components/slidermain'
import Bot from '@/components/bot'

export default function Home() {
  return (
    <div className={Styles.homemain}>
        <MainSlider/>
        <CaroselSlider starting={0} ending={4}/>
        <CaroselSlider starting={5} ending={9}/>
        <CaroselSlider starting={10} ending={14}/>
    </div>
  )
}
