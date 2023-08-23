"use client";
import malapi from "@/thirdparty_req/anilistapi";
import anilistapi2 from "@/thirdparty_req/anilistapi2";
import { useEffect, useState } from "react";

interface dataType {
  id: string;
  title:string;
  image:string;
  cover:string;
  releaseDate:string;
  description:string;
  genres:string;

}

export default function page() {
  const [fetchedanime, setFetchedanime] = useState<dataType | null>(null);
  const tempTitle = "BLEACH: Thousand-Year Blood War";
  async function fetchMal() {
    const results = await malapi({ title: tempTitle });
    const findId = results.find((bruh:any)=> bruh.title === tempTitle)
    const getId = findId.id
    const getDetails = await anilistapi2({id: getId})
    setFetchedanime(getDetails)
  }

  useEffect(() => {
    fetchMal();
  }, []);

  return (
    <div>
      {fetchedanime && (
        <>
          <h4 style={{ color: "white" }}>{fetchedanime.title}</h4>
          <img src={fetchedanime.image} alt="" />
          <img src={fetchedanime.cover} alt="" />
          <p style={{ color: "white" }}>{fetchedanime.genres[0]}</p>
          <p style={{ color: "white" }}>{fetchedanime.description}</p>
        </>
      )}
    </div>
  );
}
