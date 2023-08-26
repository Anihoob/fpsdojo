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

  const [searchitem, setSearchitem] = useState<any>();
  const [searchResults, setSearchResults] = useState<dataType[]>([]);

async function fetch() {
  if (!searchitem) {
    setSearchResults([]);
    return;
  }

  const getMovie = await searchMovie({ title: searchitem });
  const { data: movies } = await superbase.from("movies").select("title");
  const movieTitles = movies?.map((movie) => movie.title);
  const foundMovies = getMovie.filter((title: any) =>
    movieTitles?.includes(title)
  );

  const getAnime = await searchAnime({ title: searchitem });
  const { data: animeData } = await superbase.from("tv_series").select("title");
  const animeTitles = animeData?.map((anime) => anime.title);
  const foundAnime = getAnime.filter((title: any) =>
    animeTitles?.includes(title)
  );

  const updatedSearchResults: dataType[] = [];

  for (const foundTitle of foundMovies) {
    const movieFetch = await moviereq({ id: foundTitle });
    updatedSearchResults.push(movieFetch);
  }

  for (const foundTitle of foundAnime) {
    const animeFetch = await animereq({ id: foundTitle });
    updatedSearchResults.push(animeFetch);
  }

  setSearchResults(updatedSearchResults);
}

useEffect(() => {
  fetch();
}, [searchitem]);

  return (
    <>
      <input
      type="search"
      onChange={(e) => setSearchitem(e.target.value)}
      value={searchitem}
    />
    {searchResults.length > 0 ? (
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
