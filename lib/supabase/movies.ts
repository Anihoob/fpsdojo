import Supabase from "./supabase";

const superbase = Supabase();


type Props ={
    pathname:string;

}


export default async function Smovie(props:Props) {
  if (props.pathname === "/Movies") {
    try {
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
          type:item.type,
          quality: item.movies_quality,
        }));
        return mappedData;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
