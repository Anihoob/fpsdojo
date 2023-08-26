"use client";

import { useEffect, useState } from "react";

import "./test.css";

interface dataType {
  id?: string;
  title?: string | any;
  image?:string | any;
  cover?:string | any;
  type?:string;
}

import { searchAnime, searchMovie } from "@/thirdparty_req/search";
import Supabase from "@/thirdparty_req/supabase";
import animereq from "@/thirdparty_req/animereq";
import moviereq from "@/thirdparty_req/moviereq";

export default function page() {
  const superbase = Supabase();
  const [searchitem, setSearchitem] = useState<string>('');
  const [searchResults, setSearchResults] = useState<dataType[]>([]);
  
  async function fetchResults() {
    if (searchitem === "") {
      setSearchResults([]);
      return;
    }
  
    const { data: movies } = await superbase.from("movies").select("title");
    const { data: animeData } = await superbase.from("tv_series").select("title");
  
    const movieTitles = movies?.map((movie) => movie.title);
    const animeTitles = animeData?.map((anime) => anime.title);
  
    const searchMovieResults = await searchMovie({ title: searchitem });
    const searchAnimeResults = await searchAnime({ title: searchitem });
  
    const updatedSearchResults: dataType[] = [];
  
    for (const title of searchMovieResults) {
      if (movieTitles?.includes(title)) {
        const movieFetch = await moviereq({ id: title });
        updatedSearchResults.push(movieFetch);
      }
    }
  
    for (const title of searchAnimeResults) {
      if (animeTitles?.includes(title)) {
        const animeFetch = await animereq({ id: title });
        updatedSearchResults.push(animeFetch);
      }
    }
  
    setSearchResults(updatedSearchResults);
  }
  
  useEffect(() => {
    fetchResults();
  }, [searchitem]);

  return (
    <>
      <input
      type="search"
      onChange={(e) => setSearchitem(e.target.value)}
      value={searchitem}
    />
    {searchResults.length > 0 && searchitem ? (
      searchResults.map((searchResult, index) => (
        <div key={index} className="testing">
          <img
            style={{ width: '150px', height: '150px' }}
            src={searchResult.type === "Anime" ? searchResult.image : searchResult.cover}
            alt=""
          />
          <h4 style={{ color: 'white' }}>{searchResult.title}</h4>
        </div>
      ))
    ) : (
      <p>No results found.</p>
    )}
    </>
  );
}
