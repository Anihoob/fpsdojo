"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./components.css";
// import swiper modules
import { Pagination } from "swiper";

import Image from "next/image";
import Link from "next/link";

export default function SliderMovie({ movieData }: any) {
  return (
    <>
      <Swiper
        speed={600}
        loop={true}
        pagination={true}
        modules={[Pagination]}
        className="homemainsliderswiper"
      >
        {movieData?.map((moviedescription: any) => (
          <SwiperSlide
            key={moviedescription.id}
            className="homemainsliderswiperslide"
          >
            
            <Image
              className="mobileimg"
              width={350}
              height={350}
              src={`https://image.tmdb.org/t/p/original${moviedescription.poster_path}`}
              quality={75}
              alt={moviedescription.title}
            />
              {moviedescription.extra.backdrops[0] ? 
            <img
            src={`https://image.tmdb.org/t/p/original${moviedescription.extra.backdrops[0].file_path}`}
            alt={moviedescription.title}
            className="deskimg"
            />
            :
            <img
            src={`https://image.tmdb.org/t/p/original${moviedescription.backdrop_path}`}
            alt={moviedescription.title}
            className="deskimg"
            />
          }

            <div className="homemainsliderinfo">
              <span className="homemainsliderinfo-name">
                <img
                  src={`https://image.tmdb.org/t/p/original${moviedescription.extra.logos[0].file_path}`}
                  alt={moviedescription.title}
                />
              </span>
              <span>
                <h6>{moviedescription.genres[1].name}</h6>
                <h6>{moviedescription.release_date.substring(0, 4)}</h6>
              </span>
              <p className="about">{moviedescription.overview}</p>
              <Link
                href={`AniDojo/movie/${moviedescription.id}`}
                className={"btntopage"}
              >
                DOWNLOAD
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export function SliderAnime({ animeData }: any) {
  return (
    <>
      <Swiper
        speed={600}
        loop={true}
        pagination={true}
        modules={[Pagination]}
        className="homemainsliderswiper"
      >
        {animeData?.map((animedescription: any) => (
          <SwiperSlide
            key={animedescription.id}
            className="homemainsliderswiperslide"
          >
            {animedescription.extra.backdrops[0] ? 
            <img
            src={`https://image.tmdb.org/t/p/original${animedescription.extra.backdrops[0].file_path}`}
            alt={animedescription.title}
            className="deskimg"
            />
            :
            <img
            src={`https://image.tmdb.org/t/p/original${animedescription.backdrop_path}`}
            alt={animedescription.title}
            className="deskimg"
            />
          }
            <Image
              className="mobileimg"
              width={350}
              height={350}
              src={`https://image.tmdb.org/t/p/original${animedescription.poster_path}`}
              quality={75}
              alt={animedescription.title}
            />

            <div className="homemainsliderinfo">
              <span className="homemainsliderinfo-name">
                <img
                  src={`https://image.tmdb.org/t/p/original${animedescription.extra.logos[0].file_path}`}
                  alt={animedescription.title}
                />
              </span>

              <span>
                <h6>{animedescription.genres[1].name}</h6>
                {animedescription.first_air_date ? (
                  <h6>{animedescription.first_air_date.substring(0, 4)}</h6>
                ) : (
                  <h6>{animedescription.release_date.substring(0, 4)}</h6>
                )}
              </span>
              <p className="about">{animedescription.overview}</p>
              <Link
                href={`AniDojo/anime/${animedescription.id}`}
                className={"btntopage"}
              >
                DOWNLOAD
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
