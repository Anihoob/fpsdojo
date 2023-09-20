import { useEffect, useState } from "react";

import "./test.css";

interface dataType {
  mal_id?: string | number;
  title?: string | any;
  images?: {
    webp: {
      image_url: string;
    };
  };
  type?: string;
  episodes?: number | string;
  year?: string | Date | any;
  rating?: string | any;
  synopsis?: string;
}

import Supabase from "@/lib/supabase/supabase";
import tmdb from "@/lib/tmdb";
const superbase = Supabase();

export default async function page() {
  const TMDB = await tmdb();
  const movieData = TMDB;
  console.log(movieData)

  return (
  <div style={{color:'white'}}>
    {movieData && 
    <>
    <h4>{movieData.original_title}</h4>
    <p>{movieData.overview}</p>
    <img src={`https://image.tmdb.org/t/p/w500${movieData.backdrop_path}`} alt="" />
    </>
    }
    </div>);
}
