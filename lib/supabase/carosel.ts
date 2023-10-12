import Supabase from "./supabase";

type Carosel = {
  start: number;
  end: number;
};

const superbase = Supabase();

export default async function CaroselAnime(props: Carosel) {
    try {
      const { data: anime } = await superbase
        .from("tmdbanimes")
        .select("*")
        .order("id", { ascending: true })
        .range(props.start, props.end);
      if (anime) {
        const mappedData = anime.map((item: any) => ({
          id: item.id,
          title: item.title,
          type: item.type,
        }));
        return mappedData;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
}

export async function CaroselMovies(props: Carosel) {
    try {
      const { data: anime } = await superbase
        .from("tmdbmovies")
        .select("*")
        .order("id", { ascending: true })
        .range(props.start, props.end);
      if (anime) {
        const mappedData = anime.map((item: any) => ({
          id: item.id,
          title: item.title,
          type: item.type,
          movies_quality: item.movies_quality,
        }));
        return mappedData;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  
}
