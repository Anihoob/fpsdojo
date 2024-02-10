import { SliderAnime } from "@/components/slidermain";
import Tmdb from "../tmdb/tmdb";
import Supabase from "./supabase";

const superbase = Supabase();

export default async function Anime() {
  try {
    const { data: anime } = await superbase
      .from("tmdbanimes")
      .select("*")
      .order("id", { ascending: false })
      .limit(5);
    if (anime === null) return;
    else {
      const mappedData = anime.map(async (item: any) => {
        try {
          const animeFetch = await Tmdb({
            id: item.title,
            type: item.type,
          });
          return animeFetch;
        } catch (err) {
          console.log(err);
        }
      });
      const animeFetchedData = await Promise.all(mappedData);
      if (!animeFetchedData) return;
      else return animeFetchedData
    }
  } catch (error) {
    console.log(error);
  }
}
