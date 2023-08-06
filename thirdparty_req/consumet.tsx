import { ANIME } from "@consumet/extensions";

export const getStaticProps = async ()=>{
    const Zoro = new ANIME.Zoro();
    const anime = Zoro.search("One Piece").then((data)=>{
      console.log(data)
      console.log(anime)
    })

    return{
      props:{animeData:anime}
    }
}