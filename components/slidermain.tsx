"use client";
import { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./components.css";
// import swiper modules
import { Pagination } from "swiper";

import Image from "next/image";
// type interface

type animeslider = {
  id?: number | string | any;
  title?: string;
  movies_quality?: string | any;
};
type animedes = {
  id?: number | string | any;
  title?: string | any;
  description?: string | undefined;
  image?: string | any;
  type?: string;
  releaseDate?: string | any;
  totalEpisodes?: number | any;
  cover?: string | any;
  genres?: string | any;
  otherName?: string | any;
  movie_quality?: string | any;
};

import { usePathname } from "next/navigation";
// supabase
// import Supabase from "@/lib/supabase/supabase";
// import animereq from "@/lib/animereq";
// import moviereq from "@/lib/moviereq";
import Link from "next/link";
import Sanime from "@/lib/supabase/anime";
import Smovie from "@/lib/supabase/movies";
import Tmdb from "@/lib/tmdb/tmdb";


export default function MainSlider() {
  const pathname = usePathname();

  const [animeData, setAnimeData] = useState<animedes[] | any>(null);

  async function fetchDetails() {
    const animecontainer = await Sanime({ pathname: pathname });
    const moviecontainer = await Smovie({ pathname: pathname });
    if (animecontainer) {
      try {
        const animeDataPromise = animecontainer?.map(async (singleanime :any) => {
          // const animeFetch = await animereq({ id: singleanime.title });
          const animeFetch = await Tmdb({
            id: singleanime.title,
            type: singleanime.type,
          });
          return animeFetch;
        });
        const animeData = await Promise.all(animeDataPromise);
        setAnimeData(animeData);
      } catch (error) {
        console.error(error);
      }
    } else if (moviecontainer) {
      try {
        const movieDataPromise = moviecontainer?.map(async (singlemovie:any) => {
          // const movieFetch = await moviereq({ id: singlemovie.title });
          const movieFetch = await Tmdb({
            id: singlemovie.title,
            type: singlemovie.type,
          });
          const moviQuality = singlemovie.quality;
          const withMovieQuality = {
            ...movieFetch,
            movie_quality: moviQuality,
          };
          return withMovieQuality;
        });
        const MovieData = await Promise.all(movieDataPromise);
        setAnimeData(MovieData);
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  }

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <>
      <Swiper
      speed={500}
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
            {pathname === "/" && (
              <>
                <Image
                  className="deskimg"
                  width={700}
                  height={700}
                  src={`https://image.tmdb.org/t/p/original${animedescription.extra.backdrops[0].file_path}`}
                  quality={75}
                  alt={animedescription.title}
                />
                <Image
                  className="mobileimg"
                  width={400}
                  height={400}
                  src={`https://image.tmdb.org/t/p/original${animedescription.poster_path}`}
                  quality={75}
                  alt={animedescription.title}
                />
              </>
            )}
            {pathname === "/Movies" && (
              <>
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
                  width={700}
                  height={700}
                  src={`https://image.tmdb.org/t/p/original${animedescription.extra.backdrops[0].file_path}`}
                  quality={75}
                  alt={animedescription.title}
                />
              </>
            )}
            <div className="homemainsliderinfo">
              <span className="homemainsliderinfo-name">
                <img
                  src={`https://image.tmdb.org/t/p/original${animedescription.extra.logos[0].file_path}`}
                  alt=""
                />
              </span>

              <span>
                {/* {animedescription.type === "Anime" && <h6>Tv</h6>}
                {animedescription.type === "Movie" && <h6>Movie</h6>} */}
                <h6>{animedescription.genres[1].name}</h6>
                {animedescription.first_air_date ? (
                  <h6>{animedescription.first_air_date.substring(0, 4)}</h6>
                ) : (
                  <h6>{animedescription.release_date.substring(0, 4)}</h6>
                )}
              </span>
              {/* {animedescription.movie_quality && (
                <span>
                  <h6>{animedescription.movie_quality}</h6>
                </span>
              )} */}
              <p className="about">{animedescription.overview}</p>
              <Link
                href={
                  pathname === "/"
                    ? `AniDojo/anime/${animedescription.id}`
                    : `AniDojo/movie/${animedescription.id}`
                }
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
