"use client";
import malapi from "@/thirdparty_req/malapi";
import { useEffect, useState } from "react";

interface dataType{
  mal_id: number;
  title:string;
  images: {
    webp: {
      image_url:string
    }
  }
  synopsis:string;
  episodes:string;
  genres: string | any;
}

export default function page() {

  const [fetchedanime, setFetchedanime] = useState<dataType| null>(null)
  const tempTitle = "Bleach: Sennen Kessen-hen"
  async function fetchMal() {
    const results = await malapi({ name: tempTitle });
    const animeData = results.find((bruh:any)=> bruh.title === tempTitle)
    setFetchedanime(animeData)
    }

  useEffect(() => {
    fetchMal();
  }, []);

  return (
    <div>
      {fetchedanime && (
        <>
        <h4 style={{ color:"white"}}>{fetchedanime.title}</h4>
        <img src={fetchedanime.images.webp.image_url} alt="" />
        <p style={{ color:"white"}}>{fetchedanime.genres[0].name}</p>
        </>
      )}
    </div>
  )
}
