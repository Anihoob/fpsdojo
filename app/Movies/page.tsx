
import CaroselSlider from '@/components/caroselslider'
import Styles from './movies.module.css'
import MainSlider from '@/components/slidermain'

export default function Movies() {
  return (
    <div className={Styles.moviesmain}>
        <MainSlider />
        <CaroselSlider starting={6} ending={10}/>
        <CaroselSlider starting={11} ending={15}/>
        <CaroselSlider starting={16} ending={20}/>
        <CaroselSlider starting={21} ending={99}/>
    </div>
  )
}
