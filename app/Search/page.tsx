"use client";
import { useEffect, useState } from "react";
import Styles from "./search.module.css";
import Supabase from "@/thirdparty_req/supabase";

type searchCard = {
  id: number | string;
  title: string;
  description?: string;
};

type animedes = {
  id?: number | string | any;
  title?: string;
  description?: string | undefined;
  image?: string;
  type?: string;
  releaseDate?: string;
  totalEpisodes: number;
  cover: string;
};

export default function page() {
  const superbase = Supabase();
  const [searchItem, setSearchItem] = useState<any>();
  const { closest } = require("fastest-levenshtein");

  const [animecontainer, setAnimecontainer] = useState<searchCard[] | null>(
    null
  );
  // console.log(animecontainer)

  async function fetchSupabase() {
    if (animecontainer === null) {
      try {
        const { data: anime } = await superbase.from("tv_series").select("*");
        const { data: movie } = await superbase.from("movies").select("*");
        if (anime && movie) {
          const animeData: searchCard[] = anime.map((item: any) => ({
            id: item.id,
            title: item.title,
          }));
          const movieData: searchCard[] = movie.map((item: any) => ({
            id: item.id,
            title: item.title,
          }));
          const merge = animeData.concat(movieData);
          const searchResults: searchCard[] = merge.filter((item: searchCard) =>
            item.title.toLowerCase().includes(searchItem.toLowerCase())
          );
          setAnimecontainer(searchResults);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  useEffect(() => {
    fetchSupabase();
  });

  return (
    <div className={Styles.searchmain}>
      <div className={Styles.search}>
        <h4>Search</h4>
        <input
          onChange={(e) => setSearchItem((e.target as HTMLInputElement).value)}
          type="search"
          className={Styles.searchbar}
          placeholder="..."
          value={searchItem}
        />
        {animecontainer?.map((lel) => (
          <p>{lel.title}</p>
        ))}
      </div>
    </div>
  );
}
