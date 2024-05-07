import Tmdb from "../tmdb/tmdb";
import Supabase from "./supabase";

const superbase = Supabase();


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
            try {
              const movieFetch = await Tmdb({
                id:item.title,
                type:item.type
              })
              const withquality = {
                ...movieFetch,
                quality: item.quality
              }
              return withquality;
            } catch (error) {
              console.error(error)
            }
          });
          const movieData = await Promise.all(mappedData);
          if(!movieData) return;
          return movieData;
        }
    } catch (error) {
      console.log(error);
    }
}
