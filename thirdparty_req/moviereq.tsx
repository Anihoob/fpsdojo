
interface Props{
    id:string |any;
}

export default async function moviereq(props:Props) {
    const rez = await fetch(`https://consument-rouge.vercel.app/movies/flixhq/info?id=${props.id}`, {cache : "force-cache"})
    const deta = await rez.json()
    return {
        id: deta.id.replace("movie/", ""),
        title: deta.title,
        releaseDate: deta.releaseDate,
        cover: deta.cover,
        description: deta.description,
        genres: deta.genres,
        type: "Movie",
    }
}
