import Tmdb from "../tmdb/tmdb";
import Supabase from "./supabase";
import { Redis } from "@upstash/redis/nodejs";

const superbase = Supabase();

type Props = {
  pathname: string;
};

export default async function movie() {
    try {
        const { data: movie } = await superbase
          .from("tmdbmovies")
          .select("*")
          .order("id", { ascending: false })
          .limit(5);
        if (movie === null) {
          return;
        } else {
          const mappedData = movie.map(async(item: any) => {
            const movieFetch = await Tmdb({
              id:item.title,
              type:item.type
            })
            const withquality = {
              ...movieFetch,
              quality: item.quality
            }
            return withquality;
          });
          const movieData = await Promise.all(mappedData);
          console.log(movieData)
          return movieData;

        }
    } catch (error) {
      console.log(error);
    }
}
