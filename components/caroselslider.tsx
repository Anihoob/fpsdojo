"use client";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./components.css";
import Link from "next/link";
import Supabase from "@/thirdparty_req/supabase";
import { useEffect, useState } from "react";

type Props = {
  section: string;
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
};

export default function CaroselSlider(props: Props) {
  const superbase = Supabase();

  const [animecontainer, setAnimecontainer] = useState<animeslider[] | null>(
    null
  );

  async function fetchcarosel() {
    if(animecontainer === null){
      try {
        const { data: anime } = await superbase
          .from("tv_series")
          .select("*")
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
  }

  useEffect(() => {
    fetchcarosel();
  });

  const [animeData, setAnimeData] = useState<animedes[] | null>(null);

  async function fetchDetails() {
    if (!animecontainer) return;
    if(animeData === null){
      try {
        const animeDataPromise = animecontainer.map(async (singleanime) => {
          const res = await fetch(
            `https://api.consumet.org/anime/gogoanime/info/` + singleanime.title, {cache: 'force-cache'}
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
  }

  useEffect(() => {   
      fetchDetails();
  });

  return (
    <>
      <h4 className="homesliderswiper-sec">{props.section}</h4>
      <Swiper
        spaceBetween={30}
        slidesPerView={1.5}
        className="homesliderswiper"
      >
        {animeData?.map((animeinfo) => (
          <SwiperSlide className="homesliderswiperslide">
            <Link href={`/Anidojo/${animeinfo.releaseDate}/${animeinfo.id}`}>
              <img
                src={animeinfo.image}
                alt=""
              />
              <div className="homesliderswiperslide-info">
                <h4 className="homesliderswiperslide-name">{animeinfo.title}</h4>
                <hr />
                <h4>{animeinfo.releaseDate}</h4>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
