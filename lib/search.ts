import Supabase from "./supabase/supabase";

type searchProps = {
  query: string;
};

interface Tmdb {
  id: number;
  title: string;
  type: string;
}

export default async function search(props: searchProps) {
  const query = props.query.toLowerCase();
  const superbase = Supabase();

  const { data: anime } = await superbase.from("tmdbanimes").select("*");
  const { data: movie } = await superbase.from("tmdbmovies").select("*");

  const mappedAnime = anime?.map((item: any) => ({
    id: item.title,
    title: item.anime_name,
    type: item.type
  }));

  const mappedMovie = movie?.map((item: any) => ({
    id: item.title,
    title: item.movie_name,
    type: item.type
  }));

  const merged = [...mappedAnime as any[], ...mappedMovie as any[]];

  const filtered = merged.filter((item: any) => item.title.includes(query));
  console.log(filtered)
 return filtered;
 
}
