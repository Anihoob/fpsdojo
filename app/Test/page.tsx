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
import Animetmdb from "@/lib/tmdb/tmdb";
const superbase = Supabase();


async function fetchSupabase(){
  try{
    const {data:anime} = await superbase.from('testing').select('*')
    return anime
  }catch(error){
    console.log(error)
  }
}

type tmdbType ={
  name:string | number;
  number_of_episodes:number;
  logos:string;
  genres:string;
  overview:string;
  first_air_date:string | number;
  backdrop_path:string;
  posters:string;
}


export default async function page() {
  const data = await Animetmdb({id:'98123', type:'tv'})
  return (
  <div style={{color:'white'}}>
  {data &&(
    <>
    <img src={data.logo} alt="" />
    <h4>{data.title}</h4>
    <p>{data.episodes}</p>
    <p>{data.genre}</p>
    <p>{data.description}</p>
    <p>{data.year.substring(0,4)}</p>
    <img src={data.cover} alt="" />
    <img src={data.poster} alt="" />
    </>
  )}
  </div>
  );
}
