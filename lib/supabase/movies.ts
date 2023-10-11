import Supabase from "./supabase";
import { Redis } from "@upstash/redis/nodejs";

const superbase = Supabase();

type Props = {
  pathname: string;
};

export default async function Smovie(props: Props) {
  const redis = new Redis({
    url: process.env.NEXT_PUBLIC_REDIS_URL as string,

    token: process.env.NEXT_PUBLIC_REDIS_TOKEN as string,
  });
  if (props.pathname === "/Movies") {
    try {
      // const cacheKey = `movie:data`;
      // const cachedData: any = await redis.get(cacheKey);

      // if (cachedData) {
      //   return cachedData;
      // } else {
        const { data: movie } = await superbase
          .from("tmdbmovies")
          .select("*")
          .order("id", { ascending: false })
          .limit(5);
        if (movie === null) {
          return;
        } else {
          const mappedData = movie.map((item: any) => ({
            id: item.id,
            title: item.title,
            type: item.type,
            quality: item.movies_quality,
          }));
          // await redis.set(cacheKey, JSON.stringify(mappedData));
          return mappedData;
        }
      // }
    } catch (error) {
      console.log(error);
    }
  }
}
