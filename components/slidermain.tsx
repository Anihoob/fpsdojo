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

// type interface

type animeslider = {
  id?: number;
  title?: string;
  season?: number;
  description?: string | undefined;
};
type animedes = {
  id?: number;
  title?: string;
  description?: string | undefined;
  image?: string;
  type?: string;
  releaseDate?: string;
  totalEpisodes: number;
};

import { usePathname } from "next/navigation";
// supabase
import Supabase from "@/thirdparty_req/supabase";
import Link from "next/link";

export default function MainSlider() {
  const pathname = usePathname();
 

  const superbase = Supabase();

  const [animecontainer, setAnimecontainer] = useState<animeslider[] | null>(
    null
  );

  async function fetchslideranime() {
    if (pathname === "/") {
      try {
        const { data: anime } = await superbase
          .from("tv_series")
          .select("*")
          .limit(5);
        if (anime === null) {
          setAnimecontainer([]);
        } else {
          const mappedData: animeslider[] = anime.map((item: any) => ({
            id: item.id,
            title: item.title,
            season: item.seasons,
          }));
          setAnimecontainer(mappedData);
          // console.log(animecontainer)
        }
      } catch (error) {
        console.log(error);
      }
    } else if (pathname === "/Movies") {
      try {
        const { data: movie } = await superbase
          .from("movies")
          .select("*")
          .limit(5);
        if (movie === null) {
          setAnimecontainer([]);
        } else {
          const mappedData: animeslider[] = movie.map((item: any) => ({
            id: item.id,
            title: item.title,
          }));
          setAnimecontainer(mappedData);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    fetchslideranime();
  });

  const [animeData, setAnimeData] = useState<animedes[] | null>(null);
  const { closest } = require("fastest-levenshtein");

  async function fetchDetails() {
    if (!animecontainer) return;
    if (pathname === "/") {
      try {
        const animeDataPromise = animecontainer.map(async (singleanime) => {
          const res = await fetch(
            `https://ani-dojo-api.vercel.app/anime/gogoanime/info/` +
              singleanime.title,
            { cache: "force-cache" }
          );
          const demta = await res.json();
          return { ...demta };
        });
        const animeData = await Promise.all(animeDataPromise);
        setAnimeData(animeData);
      } catch (error) {
        console.error(error);
      }
    } else if (pathname === "/Movies") {
      try {
        const movieDataPromise = animecontainer.map(async (singlemovie) => {
          const singlemovi = singlemovie.title;
          const res = await fetch(
            `https://ani-dojo-api.vercel.app/movies/flixhq/ ` +
              singlemovie.title,{ cache: "force-cache" }
          );
          const demta = await res.json();
          const { results } = demta;

          const closestMatch = closest(singlemovi, results.map((move: any) => move.title));
          const closestMovie = results.find((lmao :any) => lmao.title === closestMatch);
          const closestMovieId = closestMovie.id;

          const movieInfo = await fetch (`https://ani-dojo-api.vercel.app/movies/flixhq/info?id=` + closestMovieId)
          const finalDemta = await movieInfo.json()
          return finalDemta
        });
        const MovieData = await Promise.all(movieDataPromise);
        setAnimeData(MovieData)  
      } catch (error) {

      }
    }
  }

  useEffect(() => {
    fetchDetails();
  });

  return (
    <>
      <Swiper
        pagination={true}
        modules={[Pagination]}
        className="homemainsliderswiper"
      >
        {animeData?.map((animedescription) => (
          <SwiperSlide
            key={animedescription.id}
            className="homemainsliderswiperslide"
          >
            <img src={animedescription.image} alt="" />
            <Link
              className="homemainsliderinfo"
              href={pathname === "/Movies" ? `/AniDojo/movie/${animedescription.title}` : `/AniDojo/anime/${animedescription.id}` }
            >
              <h4 className="homemainsliderinfo-name">
                {animedescription.title?.toUpperCase()}
              </h4>
              <span>
                {animedescription.totalEpisodes > 1 && <h6>Tv</h6>}
                {animedescription.type === "Movie" && <h6>Movie</h6>}
                {animedescription.totalEpisodes > 1 && (
                  <h6>{animedescription.totalEpisodes}</h6>
                )}
                <h6>{animedescription.releaseDate}</h6>
              </span>
              <p className="about">{animedescription.description}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
