"use client";

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

import Supabase from "@/thirdparty_req/supabase";
import { fetchJikan } from "@/thirdparty_req/malapi";

export default function page() {
  const superbase = Supabase();

  const [malid, setMalid] = useState<any>();
  const [details, setDetails] = useState<dataType[]>();

  async function fetchSupabase() {
    const { data: testing } = await superbase.from("testing").select("*");
    const mapped = testing?.map((lel: any) => lel.id);
    setMalid(mapped);
  }

  useEffect(() => {
    fetchSupabase();
  }, []);

  async function fetchedAnime() {
    if (!malid) return;
    const detailsPromises = malid.map(async (id: string) => {
      const jikan = await fetchJikan({ id: id });
      return jikan;
    });

    const fetchedDetails = await Promise.all(detailsPromises);
    setDetails(fetchedDetails);
  }

  useEffect(() => {
    fetchedAnime();
  }, [malid]);

  return (
    <>
      {details &&
        details.map((anime: dataType) => (
          <div style={{ color: "white" }} key={anime.mal_id}>
            <h4>{anime.title}</h4>
            <img src={anime.images?.webp.image_url} alt="" />
            <p>{anime.type}</p>
            <p>{anime.episodes}</p>
            <p>{anime.rating}</p>
            <p>{anime.synopsis}</p>
          </div>
        ))}
    </>
  );
}
