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
  season?: number;
  description?: string | undefined;
};
type animedes = {
  id?: number | string | any;
  title?: string;
  description?: string | undefined;
  image: string;
  type?: string;
  releaseDate?: string;
  totalEpisodes: number;
  cover: string;
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
      if (animecontainer === null) {
        try {
          const { data: anime } = await superbase
            .from("tv_series")
            .select("*")
            .order("id", { ascending: false })
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
          }
        } catch (error) {
          console.log(error);
        }
      }
    } else if (pathname === "/Movies") {
      if (animecontainer === null) {
        try {
          const { data: movie } = await superbase
            .from("movies")
            .select("*")
            .order("id", { ascending: false })
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
      } else {
        return;
      }
    }
  }
  useEffect(() => {
    fetchslideranime();
  });

  const [animeData, setAnimeData] = useState<animedes[] | null>(null);

  async function fetchDetails() {
    if (!animecontainer) return;
    if (pathname === "/") {
      if (animeData === null) {
        try {
          const animeDataPromise = animecontainer.map(async (singleanime) => {
            const res = await fetch(
              `https://consument-rouge.vercel.app/anime/gogoanime/info/${singleanime.title}`,
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
      } else {
        return;
      }
    } else if (pathname === "/Movies") {
      if (animeData === null) {
        try {
          const movieDataPromise = animecontainer.map(async (singlemovie) => {
            const singlemovi = singlemovie.title;
            const res = await fetch(
              `https://consument-rouge.vercel.app/movies/flixhq/info?id=${singlemovi} `,
              { cache: "force-cache" }
            );
            const demta = await res.json();
            return { ...demta };
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
            <Image
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
              src={
                pathname === "/"
                  ? animedescription.image
                  : animedescription.cover
              }
              alt=""
            />
            <Link
              className="homemainsliderinfo"
              href={
                pathname === "/Movies"
                  ? `/AniDojo/movie/${animedescription.id.replace(
                      "movie/",
                      ""
                    )}`
                  : `/AniDojo/anime/${animedescription.id}`
              }
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
                <h6>{animedescription.releaseDate?.substring(0, 4)}</h6>
              </span>
              <p className="about">{animedescription.description}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
