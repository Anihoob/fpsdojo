"use client";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./components.css";
import Link from "next/link";
import Supabase from "@/thirdparty_req/supabase";
import animereq from "@/thirdparty_req/animereq";
import moviereq from "@/thirdparty_req/moviereq";
import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";
import Image from "next/image";

type Props = {
  starting: number;
  ending: number;
};

type animeslider = {
  id?: number;
  title?: string;
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
            .from("tv_series")
            .select("*")
            .order("id", { ascending: true })
            .range(props.starting, props.ending);
          if (anime === null) {
            setAnimecontainer([]);
          } else {
            const mappedData: animeslider[] = anime.map((item: any) => ({
              id: item.id,
              title: item.title,
              season: item.seasons,
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
            .from("movies")
            .select("*")
            .order("id", { ascending: true })
            .range(props.starting, props.ending);
          if (movie === null) {
            setAnimecontainer([]);
          } else {
            const mappedData: animeslider[] = movie.map((item: any) => ({
              id: item.id,
              title: item.title,
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

  const [animeData, setAnimeData] = useState<animedes[] | null>(null);

  async function fetchDetails() {
    if (!animecontainer) return;
    if (pathname === "/") {
      if (animeData === null) {
        try {
          const animeDataPromise = animecontainer.map(async (singleanime) => {
            const animeFetch = animereq({ id: singleanime.title });
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
    } else if (pathname === "/Movies") {
      if (animeData === null) {
        try {
          const movieDataPromise = animecontainer.map(async (singlemovie) => {
            const movieFetch = await moviereq({ id: singlemovie.title });
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
          {animeData?.map((animeinfo) => (
            <SwiperSlide className="homesliderswiperslide" key={animeinfo.id}>
              <Link
                href={
                  pathname === "/Movies"
                    ? `/AniDojo/movie/${animeinfo.id.replace("movie/", "")}`
                    : `/AniDojo/anime/${animeinfo.id}`
                }
              >
                <Image
                  width={100}
                  height={100}
                  style={{
                    width: "210px",
                    height: "130px",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  quality={75}
                  src={pathname === "/" ? animeinfo.image : animeinfo.cover}
                  alt={animeinfo.title}
                />
                <div className="homesliderswiperslide-info">
                  <h4 className="homesliderswiperslide-name">
                    {animeinfo.title}
                  </h4>
                  <span>
                    {animeinfo.movie_quality && (
                      <h4 className="homesliderswiperslide-datentime">
                        {animeinfo.movie_quality}
                      </h4>
                    )}
                    <hr />
                    <h4 className="homesliderswiperslide-datentime">
                      {animeinfo.releaseDate?.substring(0, 4)}
                    </h4>
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
