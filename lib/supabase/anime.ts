import animereq from "../animereq";
import Tmdb from "../tmdb/tmdb";
import Supabase from "./supabase";
import { Redis } from "@upstash/redis/nodejs";



const superbase = Supabase();

export default async function anime() {
    try {
        const { data: anime } = await superbase
          .from("tmdbanimes")
          .select("*")
          .order("id", { ascending: false })
          .limit(5);
        if (anime === null) {
          return;
        } else {
          const mappedData = anime.map(async(item: any) => {
            const animeFetch = await Tmdb({
              id:item.title,
              type:item.type
            })
            return animeFetch;
          });
          const animeData = await Promise.all(mappedData);
          return animeData;
        }
    } catch (error) {
      console.log(error);
    }
}
