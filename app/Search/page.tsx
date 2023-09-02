"use client";
import { useEffect, useState } from "react";
import Styles from "./search.module.css";
import Supabase from "@/thirdparty_req/supabase";
import Link from "next/link";
import animereq from "@/thirdparty_req/animereq";
import moviereq from "@/thirdparty_req/moviereq";
import { searchAnime, searchMovie } from "@/thirdparty_req/search";
import { debounce } from "lodash";

type searchCard = {
  id?: number | string | any;
  title: string;
  description?: string;
  image?: string;
  name?: string;
  releaseDate?: string;
  cover?: string;
  type?: string;
  otherName?: string | any;
};

export default function page() {
  const superbase = Supabase();
  // const [searchItem, setSearchItem] = useState<any>();

  // const [animecontainer, setAnimecontainer] = useState<searchCard[] | null>(
  //   null
  // );
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  // async function fetchSupabase() {
  //   if (searchItem) {
  //     try {
  //       const { data: anime } = await superbase.from("tv_series").select("*");
  //       const { data: movie } = await superbase.from("movies").select("*");

  //       if (anime && movie) {
  //         const animeData: searchCard[] = anime.map((item: any) => ({
  //           title: item.title,
  //         }));

  //         const movieData: searchCard[] = movie.map((item: any) => ({
  //           title: item.title,
  //         }));

  //         const merge = animeData.concat(movieData);

  //         const filteredResults: searchCard[] = merge.filter(
  //           (item: searchCard) =>
  //             item.title.toLowerCase().includes(searchItem.trim().toLowerCase())
  //         );

  //         const updatedSearchResults: searchCard[] = await Promise.all(
  //           filteredResults.map(async (result) => {
  //             console.log(result)
  //             try {
  //               const animeFetch = await animereq({ id: result.title });
  //               if (animeFetch.id === result.title) {
  //                 return animeFetch;
  //               } else {
  //                 const movieFetch = await moviereq({ id: result.title });
  //                 return movieFetch;
  //               }
  //             } catch (error) {
  //               console.error(error);
  //               return result;
  //             }
  //           })
  //         );
  //         console.log(updatedSearchResults)
  //         setAnimecontainer(updatedSearchResults);
  //         setIsLoading(false);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       setIsLoading(false);
  //     }
  //   } else {
  //     setAnimecontainer([]);
  //     setIsLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   setIsLoading(true);
  //   const timeoutId = setTimeout(() => {
  //     fetchSupabase();
  //   }, 500);
  //   return () => clearTimeout(timeoutId);
  // }, [searchItem]);

  const [searchitem, setSearchitem] = useState<string>("");
  const [searchResults, setSearchResults] = useState<searchCard[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

  async function fetchResults() {
    if (searchitem === "") {
      setSearchResults([]);
      setErrorMsg("Search Something");
      return;
    }

    const { data: movies } = await superbase.from("movies").select("title");
    const { data: animeData } = await superbase
      .from("tv_series")
      .select("title");

    const movieTitles = movies?.map((movie) => movie.title);
    const animeTitles = animeData?.map((anime) => anime.title);

    const searchMovieResults = await searchMovie({ title: searchitem });
    const searchAnimeResults = await searchAnime({ title: searchitem });

    const updatedSearchResults: searchCard[] = [];

    if (movieTitles && animeTitles) {
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
          }
        }
      }
      if (updatedSearchResults.length === 0) {
        setErrorMsg("No Result Found");
      }
    }

    setSearchResults(updatedSearchResults);
  }

  useEffect(() => {
    const Search = setTimeout(() => {
      fetchResults();
    }, 800);

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
                  <img
                    className={Styles.fetchedImg}
                    src={lol.image || lol.cover}
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
