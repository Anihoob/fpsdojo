import Supabase from "./supabase";

type Props ={
    pathname:string;

}

const superbase = Supabase()

export default async function anime(props:Props) {
    if(props.pathname === "/"){
        try {
            const { data: anime } = await superbase
              .from("tv_series")
              .select("*")
              .order("id", { ascending: false })
              .limit(5);
            if (anime === null) {
              return
            } else {
              const mappedData = anime.map((item: any) => ({
                id: item.id,
                title: item.title,
              }));
              return mappedData
            }
          } catch (error) {
            console.log(error);
          }
    }

}
