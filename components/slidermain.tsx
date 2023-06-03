'use client'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./components.css";

// import required modules
import { Pagination } from "swiper";

type imageUrl ={
  image1:string;
  image2:string;
} 

export default function MainSlider(props:imageUrl) {
  return (
    <>
      <Swiper
        pagination={true}
        modules={[Pagination]}
        className="homemainsliderswiper"
      >
        <SwiperSlide className="homemainsliderswiperslide">
            <img src={props.image1} alt="" />
            <div className="homemainsliderinfo">
              <h4 className="homemainsliderinfo-name">JUJUTSU KAISEN</h4>
              <span>
                <h6>TV</h6>
                <h6>23min</h6>
                <h6>16+</h6>
              </span>
              <p className="about">Yuuji Itadori searches for the rest of the cursed talisman in order to exorcise himself.</p>
            </div>
        </SwiperSlide>
        <SwiperSlide className="homemainsliderswiperslide">
            <img src={props.image2} alt="" />
            <div className="homemainsliderinfo">
              <h4 className="homemainsliderinfo-name">BLUE LOCK</h4>
              <span>
                <h6>TV</h6>
                <h6>23min</h6>
                <h6>6+</h6>
              </span>
              <p className="about">Japan's desire for World Cup glory leads the Japanese Football Association to launch a new training programme.</p>
            </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}