"use client";
import { useEffect, useState } from "react";
import Styles from "./search.module.css";
import Supabase from "@/thirdparty_req/supabase";
import Link from "next/link";
import animereq from "@/thirdparty_req/animereq";
import moviereq from "@/thirdparty_req/moviereq";
import { searchAnime, searchMovie } from "@/thirdparty_req/search";
import Image from "next/image";

type searchCard = {
  id?: number | string | any;
  title: string;
  description?: string;
  image?: string | any;
  name?: string;
  releaseDate?: string;
  cover?: string | any;
  type?: string;
  otherName?: string | any;
};

export default function SearchPage() {
  const superbase = Supabase();
  const [searchitem, setSearchitem] = useState<string>("");
  const [searchResults, setSearchResults] = useState<searchCard[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

  async function fetchResults() {
    if (searchitem.trim() === "" || searchitem === "") {
      setSearchResults([]);
      setErrorMsg("Search Something");
      return;
    }

    const updatedSearchResults: searchCard[] = [];
    const { data: movies } = await superbase.from("movies").select("title");
    const { data: animeData } = await superbase
      .from("tv_series")
      .select("title");

    const movieTitles = movies?.map((movie) => movie.title);
    const animeTitles = animeData?.map((anime) => anime.title);

    const searchMovieResults = await searchMovie({ title: searchitem });
    const searchAnimeResults = await searchAnime({ title: searchitem });

    if (movieTitles && animeTitles && searchitem.length > 1) {
      setErrorMsg("loading....")
      for (const title of searchMovieResults) {
        if (movieTitles?.includes(title)) {
          const movieFetch = await moviereq({ id: title });
          setErrorMsg("loading...");
          updatedSearchResults.push(movieFetch);
        }
      }

      if (updatedSearchResults.length === 0) {
        for (const title of searchAnimeResults) {
          if (animeTitles?.includes(title)) {
            const animeFetch = await animereq({ id: title });
            setErrorMsg("loading...");
            updatedSearchResults.push(animeFetch);
          } else {
            setErrorMsg("No Result Found");
          }
        }
      }

      setSearchResults(updatedSearchResults);
    }
  }

  useEffect(() => {
    const Search = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(Search);
  }, [searchitem]);

  return (
    <div className={Styles.searchmain}>
      <div className={Styles.search}>
        <h4 className={Styles.searchTitle}>Search</h4>
        <input
          onChange={(e) => setSearchitem((e.target as HTMLInputElement).value)}
          type="search"
          className={Styles.searchbar}
          placeholder="Search Anime/Movies"
          value={searchitem}
        />
        <div className={Styles.searched}>
          {searchResults && searchResults.length > 0 && searchitem ? (
            searchResults.map((lol) => (
              <Link
                href={
                  lol.type === "Anime"
                    ? `/AniDojo/anime/${lol.id}`
                    : `/AniDojo/movie/${lol.id.replace("movie/", "")}`
                }
                className={Styles.fetchedItem}
              >
                <div className={Styles.fetchedspan}>
                  <Image
                    width={60}
                    height={60}
                    quality={75}
                    className={Styles.fetchedImg}
                    src={lol.image ? lol.image : lol.cover}
                    alt={lol.title}
                  />
                  <span>
                    <h4 className={Styles.fetchedTitle}>{lol.title}</h4>
                    <h4 className={Styles.fetchedTitle}>
                      {lol.releaseDate?.substring(0, 4)}
                    </h4>
                  </span>
                </div>
                <hr className={Styles.fetcheddivider} />
              </Link>
            ))
          ) : (
            <p>{errorMsg}</p>
          )}
        </div>
      </div>
    </div>
  );
}
