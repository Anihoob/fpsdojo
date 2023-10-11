"use client";
import { useEffect, useState } from "react";
import Styles from "./search.module.css";
import Supabase from "@/lib/supabase/supabase";
import Link from "next/link";
import Image from "next/image";
import search from "@/lib/search";
import Tmdb from "@/lib/tmdb/tmdb";

export default function SearchPage() {
  const [searchitem, setSearchitem] = useState<string>("");
  const [searchedtype, setSearchedtype] = useState<string>('')
  const [searchResults, setSearchResults] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function fetchResults() {
    setIsLoading(true);
    const searchit = await search({query:searchitem}) 
    if(searchit && Array.isArray(searchit)){
      try{
        const mapdata = searchit.map(async( lmao:any)=> {
          setSearchedtype(lmao.class)
          const fetchdata = await Tmdb({id:lmao.id, type:lmao.type})
          return fetchdata
        })
        const promisedData = await Promise.all(mapdata)
        setSearchResults(promisedData)
        setIsLoading(false)
      }catch(error){
        console.log(error)
      }
    }
  }

  return (
    <div className={Styles.searchmain}>
      <div className={Styles.search}>
        <h4 className={Styles.searchTitle}>Search</h4>
        <span className={Styles.searchwithbtn}>
          <input
            onChange={(e) =>
              setSearchitem((e.target as HTMLInputElement).value)
            }
            type="search"
            className={Styles.searchbar}
            placeholder="Search Anime/Movies"
            value={searchitem}
          />
          <button onClick={fetchResults} className={Styles.searchbtn}>
            Search
          </button>
        </span>
        <div className={Styles.searched}>
        {isLoading ? (
            <p>Loading...</p>
          ) : searchResults ? (
            searchResults.map((lol:any) => (
              <Link
              key={lol.id}
                href={searchedtype === 'anime' ?
                `/AniDojo/anime/${lol.id}`:
                `/AniDojo/movie/${lol.id}`
                }
                className={Styles.fetchedItem}
              >
                <div className={Styles.fetchedspan}>
                  <Image
                    width={60}
                    height={60}
                    quality={75}
                    className={Styles.fetchedImg}
                    src={`https://image.tmdb.org/t/p/original${lol.extra.backdrops[0].file_path}`}
                    alt={lol.title ? lol.title : lol.name}
                  />
                  <span>
                    <h4 className={Styles.fetchedTitle}>{lol.name ? lol.name : lol.title}</h4>
                    <h4 className={Styles.fetchedTitle}>
                      {lol.first_air_date ? lol.first_air_date.substring(0,4): lol.release_date.substring(0,4)}
                    </h4>
                  </span>
                </div>
                <hr className={Styles.fetcheddivider} />
              </Link>
            ))
          ) : !isLoading && !searchResults && (
            <p>Search Something</p>
          )}
        </div>
      </div>
    </div>
  );
}
