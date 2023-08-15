"use client";
import { useEffect, useState } from "react";
import Styles from "./search.module.css";
import Supabase from "@/thirdparty_req/supabase";

type searchCard = {
  id?: number | string ;
  title?: string;
  season?: number;
  description?: string ;
};

export default function page() {
  const superbase = Supabase();
  const [searchItem, setSearchItem] = useState<any>();
  const { closest } = require("fastest-levenshtein");

  const [animecontainer, setAnimecontainer] = useState<searchCard[] | null>(
    null
  );

  async function fetchSupabase() {
    if (animecontainer === null) {
      try {
        const { data: anime } = await superbase.from('tv_series').select('*');
        const { data: movie } = await superbase.from('movies').select('*');
        if(anime && movie){

            const animeData: searchCard[] = anime.map((item: any) => ({
                id: item.id,
                title: item.title,
            }));
            
            const movieData: searchCard[] = movie.map((item: any) => ({
                id: item.id,
                title: item.title,
            }));
            setAnimecontainer(animeData.concat(movieData));
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  useEffect(()=>{
    fetchSupabase()
  })

  const [fetchedItem, setFetchedItem] = useState<searchCard[]>()
  
  function searchSupabase(){
    if(!animecontainer)return;
      if(!fetchedItem){
        const searched = closest(searchItem, animecontainer.map((bruh:any)=> bruh.title))
        setFetchedItem(searched)
      }
    }
  

  return (
    <div className={Styles.searchmain}>
      <div className={Styles.search}>
        <h4>Search</h4>
        <input
          onChange={(e) => setSearchItem((e.target as HTMLInputElement).value)}
          type="search"
          className={Styles.searchbar}
          placeholder="..."
        />

        <button onClick={searchSupabase}>bruh</button>
      </div>
    </div>
  );
}
