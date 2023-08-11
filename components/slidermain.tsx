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
type imageUrl = {
  image1: string;
  image2: string;
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

// supabase
import Supabase from "@/thirdparty_req/supabase";
import Link from "next/link";

export default function MainSlider(props: imageUrl) {
  const superbase = Supabase();

  const [animecontainer, setAnimecontainer] = useState<animeslider[] | null>(
    null
  );

  async function fetchslider() {
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
  }

  useEffect(()=>{
    fetchslider();
  })

  const [animeData, setAnimeData] = useState<animedes[] | null>(null);

  async function fetchDetails() {
    if (!animecontainer) return;

    try {
      const animeDataPromise = animecontainer.map(async (singleanime) => {
        const res = await fetch(
          `https://api.consumet.org/anime/gogoanime/info/` + singleanime.title,{cache:'force-cache'}
        );
        const demta = await res.json();
        // console.log(demta)
        return { ...demta};
      });
      const animeData = await Promise.all(animeDataPromise);
      setAnimeData(animeData);
    } catch (error) {
      console.error(error);
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
                <Link className="homemainsliderinfo" href={`/Anidojo/${animedescription.releaseDate}/${animedescription.id}`}
                >
                <h4 className="homemainsliderinfo-name">
                  {animedescription.title?.toUpperCase()}
                </h4>
                <span>
                  {animedescription.totalEpisodes > 1 && <h6>Tv</h6>}
                  {animedescription.totalEpisodes < 1 && <h6>Movie</h6>}
                  {animedescription.totalEpisodes > 1 &&<h6>{animedescription.totalEpisodes}</h6>}
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
