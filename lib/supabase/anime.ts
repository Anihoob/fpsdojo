import Supabase from "./supabase";
import { Redis } from "@upstash/redis/nodejs";

type Props = {
  pathname: string;
};

const superbase = Supabase();

export default async function anime(props: Props) {
  const redis = new Redis({
    url: process.env.NEXT_PUBLIC_REDIS_URL as string,
    token: process.env.NEXT_PUBLIC_REDIS_TOKEN as string,
  });
  if (props.pathname === "/") {
    try {
      const cacheKey = `anime:data`;
      const cachedData: any = await redis.get(cacheKey);

      if (cachedData) {
        return cachedData;
      } else {
        const { data: anime } = await superbase
          .from("tmdbanimes")
          .select("*")
          .order("id", { ascending: false })
          .limit(5);
        if (anime === null) {
          return;
        } else {
          const mappedData = anime.map((item: any) => ({
            id: item.id,
            title: item.title,
            type: item.type,
          }));

          await redis.set(cacheKey, JSON.stringify(mappedData));
          return mappedData;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
