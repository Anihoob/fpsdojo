import { Redis } from "@upstash/redis/nodejs";

interface Props {
  id: string | any;
  type: string | any;
}

export default async function Tmdb(props: Props) {
  const redis = new Redis({
    url: process.env.NEXT_PUBLIC_REDIS_URL as string,

    token:
      process.env.NEXT_PUBLIC_REDIS_TOKEN as string,
  });

  const cacheKey = `tmdb:${props.type}:${props.id}`;
  const cachedData:any = await redis.get(cacheKey)
  
  if(cachedData){
    // console.log('Data retrieved from cache');
    return cachedData
  }

  const baseUrl = "https://api.themoviedb.org/3";
  const dataUrl = `${baseUrl}/${props.type}/${props.id}`;
  const logoUrl = `${dataUrl}/images`;
  const imageUrl = `https://image.tmdb.org/t/p/original`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
    },
  };

  try {
    const [mainResponse, imagesResponse] = await Promise.all([
      fetch(dataUrl, options),
      fetch(logoUrl, options),
    ]);

    if (!mainResponse.ok || !imagesResponse.ok) {
      throw new Error("response code 400");
    }

    const mainData = await mainResponse.json();
    const logoData = await imagesResponse.json();

    const combinedData = {
      ...mainData,
      extra: logoData,
    };
    // console.log(combinedData)
    // console.log('data fetched from db')

    await redis.set(cacheKey, JSON.stringify(combinedData))

    if (props.type === "tv") {
      return {
        id: combinedData.id,
        title: combinedData.name,
        episodes: combinedData.number_of_episodes,
        logo: `${imageUrl}${combinedData.extra.logos[0].file_path}`,
        genre: combinedData.genres[1].name,
        description: combinedData.overview,
        year: combinedData.first_air_date,
        cover: `${imageUrl}${combinedData.extra.backdrops[0].file_path}`,
        poster: `${imageUrl}${combinedData.extra.posters[0].file_path}`,
        type: "tv",
      };
    } else if (props.type === "movie") {
      return {
        id: combinedData.id,
        title: combinedData.original_title,
        logo: `${imageUrl}${combinedData.extra.logos[0].file_path}`,
        genre: combinedData.genres[1].name,
        description: combinedData.overview,
        year: combinedData.release_date,
        cover: `${imageUrl}${combinedData.extra.backdrops[0].file_path}`,
        poster: `${imageUrl}${combinedData.extra.posters[0].file_path}`,
        runtime: combinedData.runtime,
        type: "movie",
      };
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

type seasondataType = {
  id: string | number;
  seasonNo: string;
};

export async function tmdbseasondata(props: seasondataType) {
  const imageUrl = `https://image.tmdb.org/t/p/original`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
    },
  };

  if (props.seasonNo === "0") {
    return;
  }
  try {
    const request = await fetch(
      `https://api.themoviedb.org/3/tv/${props.id}/season/${props.seasonNo}`,
      options
    );
    const data = await request.json();
    if (data && Array.isArray(data.episodes)) {
      const episodedata = data.episodes;
      return episodedata;
    }
  } catch (error) {
    console.log(error);
  }
}
