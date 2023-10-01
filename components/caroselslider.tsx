"use client";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./components.css";
import Link from "next/link";
import Supabase from "@/lib/supabase/supabase";
import animereq from "@/lib/animereq";
import moviereq from "@/lib/moviereq";
import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Tmdb from "@/lib/tmdb/tmdb";

type Props = {
  starting: number;
  ending: number;
};

type animeslider = {
  id?: number;
  title?: string;
  type?: string;
  movies_quality?: string | any;
  description?: string | undefined;
};
type animedes = {
  id?: number | string | any;
  title: string;
  description?: string | undefined;
  image?: string | any;
  type?: string;
  releaseDate?: string;
  duration?: string | any;
  cover?: string | any;
  otherName?: string | any;
  movie_quality?: string | any;
  year?: string | any;
};

export default function CaroselSlider(props: Props) {
  const pathname = usePathname();
  const superbase = Supabase();

  const [animecontainer, setAnimecontainer] = useState<animeslider[] | null>(
    null
  );

  async function fetchcarosel() {
    if (pathname === "/") {
      if (animecontainer === null) {
        try {
          const { data: anime } = await superbase
            .from("tmdbanimes")
            // .from("tv_series")
            .select("*")
            .order("id", { ascending: true })
            .range(props.starting, props.ending);
          if (anime === null) {
            setAnimecontainer([]);
          } else {
            const mappedData: animeslider[] = anime.map((item: any) => ({
              id: item.id,
              title: item.title,
              type: item.type,
              // season: item.seasons,
            }));
            setAnimecontainer(mappedData);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        return;
      }
    } else if (pathname === "/Movies") {
      if (animecontainer === null) {
        try {
          const { data: movie } = await superbase
            .from("tmdbmovies")
            .select("*")
            .order("id", { ascending: true })
            .range(props.starting, props.ending);
          if (movie === null) {
            setAnimecontainer([]);
          } else {
            const mappedData: animeslider[] = movie.map((item: any) => ({
              id: item.id,
              title: item.title,
              type: item.type,
              movies_quality: item.movies_quality,
            }));
            setAnimecontainer(mappedData);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        return;
      }
    }
  }

  useEffect(() => {
    fetchcarosel();
  });

  const [animeData, setAnimeData] = useState<animedes[] | any>(null);

  async function fetchDetails() {
    if (!animecontainer) return;
    if (animeData === null) {
      try {
        const animeDataPromise = animecontainer.map(async (singleanime) => {
          // const animeFetch = animereq({ id: singleanime.title });
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
    } else {
      return;
    }
    if (animeData === null) {
      try {
        const movieDataPromise = animecontainer.map(async (singlemovie) => {
          // const movieFetch = await moviereq({ id: singlemovie.title });
          const movieFetch = await Tmdb({
            id: singlemovie.title,
            type: singlemovie.type,
          });
          const moviQuality = singlemovie.movies_quality;
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
  });

  return (
    <>
      {animeData !== null ? (
        <Swiper
          spaceBetween={20}
          slidesPerView={1.6}
          breakpoints={{
            425: {
              spaceBetween: 10,
              slidesPerView: 1.7,
            },
            768: {
              spaceBetween: 15,
              slidesPerView: 3,
            },
            1024: {
              spaceBetween: 20,
              slidesPerView: 4,
            },
            1440: {
              spaceBetween: 20,
              slidesPerView: 5,
            },
          }}
          className="homesliderswiper"
        >
          {animeData?.map((animeinfo: any) => (
            <SwiperSlide className="homesliderswiperslide" key={animeinfo.id}>
              <Link
                href={
                  pathname === "/Movies"
                    ? `/AniDojo/movie/${animeinfo.id}`
                    : `/AniDojo/anime/${animeinfo.id}`
                }
              >
                <Image
                  width={500}
                  height={500}
                  style={{
                    width: "210px",
                    height: "130px",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  quality={75}
                  src={`https://image.tmdb.org/t/p/original${animeinfo.extra.backdrops[0].file_path}`}
                  alt={animeinfo.name}
                />
                <div className="homesliderswiperslide-info">
                  <h4 className="homesliderswiperslide-name">
                    {animeinfo.name}
                  </h4>
                  <span>
                    {animeinfo.movie_quality && (
                      <h4 className="homesliderswiperslide-datentime">
                        {animeinfo.movie_quality}
                      </h4>
                    )}
                    <hr />
                    {animeinfo.first_air_date ? (
                      <h4 className="homesliderswiperslide-datentime">
                        {animeinfo.first_air_date.substring(0,4)}
                      </h4>
                    ) : (
                      <h4 className="homesliderswiperslide-datentime">
                        {animeinfo.release_date.substring(0,4)}
                      </h4>
                    )}
                  </span>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : null}
    </>
  );
}
