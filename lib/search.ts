import { Redis } from "@upstash/redis/nodejs";
import Supabase from "./supabase/supabase";

type searchProps = {
  query: string;
};


export default async function search(props: searchProps) {
  const redis = new Redis({
    url: process.env.NEXT_PUBLIC_REDIS_URL as string,
    token: process.env.NEXT_PUBLIC_REDIS_TOKEN as string,
  });

  const superbase = Supabase();
  const query = props.query.toLowerCase();
  const cacheKey = `search:${props.query}`;
  const cachedData = await redis.get(cacheKey);
  if(cachedData) {
    return cachedData;
  }
  const { data: anime } = await superbase.from("tmdbanimes").select("*");
  const { data: movie } = await superbase.from("tmdbmovies").select("*");

  const mappedAnime = anime?.map((item: any) => ({
    id: item.title,
    title: item.anime_name,
    type: item.type,
    class: 'anime'
  }));

  const mappedMovie = movie?.map((item: any) => ({
    id: item.title,
    title: item.movie_name,
    type: item.type,
    class: 'movie'
  }));

  const merged = [...mappedAnime as any[], ...mappedMovie as any[]];

  const filtered = merged.filter((item: any) => item.title.includes(query));
  await redis.set(cacheKey, filtered);
 return filtered;
 
}
