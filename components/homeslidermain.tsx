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
        </SwiperSlide>
        <SwiperSlide className="homemainsliderswiperslide">
            <img src="https://res.cloudinary.com/dp9icjdvf/image/upload/v1667323307/Frame_3bluelockposter_foyhti.png" alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}