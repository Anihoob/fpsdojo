"use client";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./components.css";

type Props = {
  section: string;
};

export default function HomeSlider(props: Props) {
  return (
    <>
      <h4 className="homesliderswiper-sec">{props.section}</h4>
      <Swiper
        spaceBetween={30}
        slidesPerView={1.5}
        className="homesliderswiper"
      >
        <SwiperSlide className="homesliderswiperslide">
          <img
            src="https://res.cloudinary.com/dp9icjdvf/image/upload/v1667323320/Frame_4bluelock_2_oilzbq.png"
            alt=""
          />
          <div className="homesliderswiperslide-info">
            <h4 className="homesliderswiperslide-name">Blue Lock</h4>
            <hr />
            <h4>S1</h4>
          </div>
        </SwiperSlide>
        <SwiperSlide className="homesliderswiperslide">
          <img
            src="https://res.cloudinary.com/dxi9wcchp/image/upload/v1635591823/jujutsu-kaisen_xa1hsz.jpg"
            alt=""
          />
          <div className="homesliderswiperslide-info">
            <h4 className="homesliderswiperslide-name">Jujutsu Kaisen</h4>
            <hr />
            <h4>S1</h4>
          </div>
        </SwiperSlide>
        <SwiperSlide className="homesliderswiperslide">
          <img
            src="https://res.cloudinary.com/dp9icjdvf/image/upload/v1667323320/Frame_4bluelock_2_oilzbq.png"
            alt=""
          />
          <div className="homesliderswiperslide-info">
            <h4 className="homesliderswiperslide-name">Blue Lock</h4>
            <hr />
            <h4>S1</h4>
          </div>
        </SwiperSlide>
        <SwiperSlide className="homesliderswiperslide">
          <img
            src="https://res.cloudinary.com/dxi9wcchp/image/upload/v1635591823/jujutsu-kaisen_xa1hsz.jpg"
            alt=""
          />
          <div className="homesliderswiperslide-info">
            <h4 className="homesliderswiperslide-name">Jujutsu Kaisen</h4>
            <hr />
            <h4>S1</h4>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
