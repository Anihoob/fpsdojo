"use client";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./components.css";
import Link from "next/link";
import Supabase from "@/thirdparty_req/supabase";
import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";

type Props = {
  starting:number;
  ending:number;
};



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
  duration:string | any;
  cover: string | any;
};

export default function CaroselSlider(props: Props) {

  const pathname = usePathname();
  const superbase = Supabase();

  const [animecontainer, setAnimecontainer] = useState<animeslider[] | null>(
    null
  );

  async function fetchcarosel() {
    if(pathname === "/"){
      if(animecontainer === null){
        try {
          const { data: anime } = await superbase
            .from("tv_series")
            .select("*")
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
      }else{
        return;
      }
    }else if(pathname === "/Movies"){
      if (animecontainer === null) {
        try {
          const { data: movie } = await superbase
            .from("movies")
            .select("*")
            .range(props.starting, props.ending);
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
      } else {
        return;
      }
    }
  }

  useEffect(() => {
    fetchcarosel();
  });

  const [animeData, setAnimeData] = useState<animedes[] | null>(null);
  const { closest } = require("fastest-levenshtein");

  async function fetchDetails() {
    if (!animecontainer) return;
    if(pathname === "/"){
      if(animeData === null){
        try {
          const animeDataPromise = animecontainer.map(async (singleanime) => {
            const res = await fetch(
              `https://api.consumet.org/anime/gogoanime/info/${singleanime.title}` , {cache: 'force-cache'}
            );
            const demta = await res.json();
            // console.log(demta)
            return { ...demta };
          });
          const animeData = await Promise.all(animeDataPromise);
          setAnimeData(animeData);
        } catch (error) {
          console.error(error);
        }
      }else{
        return;
      }
    }else if(pathname === "/Movies"){
      if (animeData === null) {
        try {
          const movieDataPromise = animecontainer.map(async (singlemovie) => {
            const singlemovi = singlemovie.title;
            const res = await fetch(
              `https://ani-dojo-api.vercel.app/movies/flixhq/${singlemovie.title}` ,
              { cache: "force-cache" }
            );
            const demta = await res.json();
            const { results } = demta;

            const closestMatch = closest(
              singlemovi,
              results.map((move: any) => move.title)
            );

            const closestMovie = results.find(
              (lmao: any) => lmao.title === closestMatch
            );

            const closestMovieId = closestMovie.id;
            const closestMovieTitle = closestMovie.title;

            const movieInfo = await fetch(
              `https://ani-dojo-api.vercel.app/movies/flixhq/info?id=${closestMovieId}`,
              { cache: "force-cache" }
            );
            const finalDemta = await movieInfo.json();
            return finalDemta;
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
      <h4 className="homesliderswiper-sec">60FPS</h4>
      <Swiper
        spaceBetween={30}
        slidesPerView={1.5}
        className="homesliderswiper"
      >
        {animeData?.map((animeinfo) => (
          <SwiperSlide className="homesliderswiperslide" key={animeinfo.id}>
            <Link href={pathname === "/Movies"
                  ? `/AniDojo/movie/${animeinfo.title}`
                  : `/AniDojo/anime/${animeinfo.id}`}>
              <img
                src={pathname === "/" ? animeinfo.image : animeinfo.cover}
                alt=""
              />
              <div className="homesliderswiperslide-info">
                <h4 className="homesliderswiperslide-name">{animeinfo.title}</h4>
                {pathname === "/" && (
                  <hr />
                  )}
                <h4>{pathname === "/" && animeinfo.releaseDate}</h4>
                {/* <h4>{pathname === "/Movies" && animeinfo.duration}</h4> */}
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
