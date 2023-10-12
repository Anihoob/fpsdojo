
import CaroselSlider from '@/components/caroselslider'
import Styles from './movies.module.css'
import SliderMovie from '@/components/slidermain'

export default function Movies() {
  return (
    <div className={Styles.moviesmain}>
        <SliderMovie/>
        <CaroselSlider starting={1} ending={5}/>
        <CaroselSlider starting={6} ending={10}/>
        <CaroselSlider starting={11} ending={15}/>
        <CaroselSlider starting={16} ending={20}/>
        <CaroselSlider starting={21} ending={25}/>
        <CaroselSlider starting={26} ending={30}/>
        <CaroselSlider starting={31} ending={35}/>
        <CaroselSlider starting={36} ending={40}/>
        <CaroselSlider starting={41} ending={45}/>
        {/* <CaroselSlider starting={46} ending={50}/> */}
    </div>
  )
}
