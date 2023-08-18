"use client";
import { useEffect, useState } from "react";
import Styles from "./search.module.css";
import Supabase from "@/thirdparty_req/supabase";
import Link from "next/link";

type searchCard = {
  id?: number | string | any ;
  title: string;
  description?: string;
  image?: string;
  name?: string;
  releaseDate?: string;
  cover?: string;
  type?: string;
};

export default function page() {
  const superbase = Supabase();
  const [searchItem, setSearchItem] = useState<any>();
  const { closest } = require("fastest-levenshtein");

  const [animecontainer, setAnimecontainer] = useState<searchCard[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function fetchSupabase() {
    if (searchItem) {
      try {
        const { data: anime } = await superbase.from("tv_series").select("*");
        const { data: movie } = await superbase.from("movies").select("*");
        
        if (anime && movie) {
          const animeData: searchCard[] = anime.map((item: any) => ({
            title: item.title,
          }));
          
          const movieData: searchCard[] = movie.map((item: any) => ({
            title: item.title,
          }));
          
          const merge = animeData.concat(movieData);
          
          const filteredResults: searchCard[] = merge.filter((item: searchCard) =>
            item.title.toLowerCase().includes(searchItem.toLowerCase())
          );
          
          const updatedSearchResults: searchCard[] = await Promise.all(
            filteredResults.map(async (result) => {
              try {
                const res = await fetch(
                  `https://consument-rouge.vercel.app/anime/gogoanime/info/${result.title}`
                , {cache :"force-cache"});
                const data = await res.json();
                
                if (data.id === result.title) {
                  return {
                    ...result,
                    id: data.id,
                    image: data.image,
                    title: data.title,
                    name: data.title,
                    releaseDate: data.releaseDate,
                    type: "anime",
                  };
                } else {
                  const res = await fetch(
                    `https://consument-rouge.vercel.app/movies/flixhq/info?id=${result.title}`
                  ,{cache:"force-cache"});
                  const deta = await res.json();

                    if (deta) {
                      return {
                        ...result,
                        id: deta.id.replace("movie/", ""),
                        image: deta.image,
                        title: deta.title,
                        name: deta.name,
                        releaseDate: deta.releaseDate,
                        cover: deta.cover,
                        type: "movie",
                      };
                    } else {
                      return result;
                    }
                
                }
              } catch (error) {
                console.error(error);
                return result;
              }
            })
          );
          
          setAnimecontainer(updatedSearchResults);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    } else {
      setAnimecontainer([]);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      fetchSupabase();
    }, 500); 
    return () => clearTimeout(timeoutId);
  }, [searchItem]);

  return (
    <div className={Styles.searchmain}>
      <div className={Styles.search}>
        <h4 className={Styles.searchTitle}>Search</h4>
        <input
          onChange={(e) => setSearchItem((e.target as HTMLInputElement).value)}
          type="search"
          className={Styles.searchbar}
          placeholder="..."
          value={searchItem}
        />
        {isLoading ? (
          <p>Loading....</p>
        ) :(
          <div className={Styles.searched}>
          {animecontainer?.map((lol) => (
            <Link
            href={
              lol.type === "anime"
              ? `/AniDojo/anime/${lol.id}`
              : `/AniDojo/movie/${lol.id}`
            }
            className={Styles.fetchedItem}
            >
              <div className={Styles.fetchedspan}>
                <img
                  className={Styles.fetchedImg}
                  src={lol.image || lol.cover}
                  />
                <span>
                  <h4 className={Styles.fetchedTitle}>
                    {lol.title}
                  </h4>
                  <h4 className={Styles.fetchedTitle}>{lol.releaseDate?.substring(0,4)}</h4>
                </span>
              </div>
              <hr className={Styles.fetcheddivider} />
            </Link>
          ))}
        </div>
          )}
      </div>
    </div>
  );
}
