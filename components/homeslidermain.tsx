'use client'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./components.css";

// import required modules
import { Pagination } from "swiper";

export default function HomeMainSlider() {
  return (
    <>
      <Swiper
        pagination={true}
        modules={[Pagination]}
        className="homemainsliderswiper"
      >
        <SwiperSlide className="homemainsliderswiperslide">
            <img src="https://res.cloudinary.com/dxi9wcchp/image/upload/v1635591822/jujutsu_kaizen_gazruz.jpg" alt="" />
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
            <img src="https://res.cloudinary.com/dp9icjdvf/image/upload/v1667323307/Frame_3bluelockposter_foyhti.png" alt="" />
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