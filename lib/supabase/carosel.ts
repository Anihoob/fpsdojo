import Tmdb from "../tmdb/tmdb";
import Supabase from "./supabase";

const superbase = Supabase();

export async function getAnime() {
  if (!superbase) return;
  const { data: animeId } = await superbase
    .from("tmdbanimes")
    .select("*")
    .order("id", { ascending: true });
  if (!animeId) return;
  const mappAnimeId = animeId.map(async (item: any) => {
    const fetchAnimeDetails = await Tmdb({
      id: item.title,
      type: item.type,
    });
    return fetchAnimeDetails;
  });
  return Promise.all(mappAnimeId);
}

export async function getMovies() {
  if (!superbase) return;
  const { data: movieId } = await superbase
    .from("tmdbmovies")
    .select("*")
    .order("id", { ascending: true });
    if(!movieId) return;
    const mappMovieId = movieId.map(async(item:any)=> {
      const fetchMovieDetails = await Tmdb({
        id:item.title,
        type:item.type,
      })
      return fetchMovieDetails
    })
    return Promise.all(mappMovieId)
}
