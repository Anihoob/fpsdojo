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
import anime from "@/lib/supabase/anime";
import movie from "@/lib/supabase/movies";

export default async function SliderMovie() {
  const movieData = await movie()

  return (
    <>
      <Swiper
        speed={600}
        loop={true}
        pagination={true}
        modules={[Pagination]}
        className="homemainsliderswiper"
      >
        {movieData?.map((animedescription: any) => (
          <SwiperSlide
            key={animedescription.id}
            className="homemainsliderswiperslide"
          >
            <Image
              className="mobileimg"
              width={350}
              height={350}
              src={`https://image.tmdb.org/t/p/original${animedescription.poster_path}`}
              quality={75}
              alt={animedescription.title}
            />
            <Image
              className="deskimg"
              width={900}
              height={900}
              src={`https://image.tmdb.org/t/p/original${animedescription.extra.backdrops[0].file_path}`}
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
                <h6>{animedescription.release_date.substring(0, 4)}</h6>
              </span>
              <p className="about">{animedescription.overview}</p>
              <Link
                href={`AniDojo/movie/${animedescription.id}`}
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

export async function SliderAnime() {
  const animeData = await anime();

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
            <Image
              className="deskimg"
              width={900}
              height={900}
              src={`https://image.tmdb.org/t/p/original${animedescription.extra.backdrops[0].file_path}`}
              quality={75}
              alt={animedescription.title}
            />
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
