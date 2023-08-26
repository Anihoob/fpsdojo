interface Props{
    title:string;
}


export async function searchAnime(props:Props) {
    const res = await fetch(`https://consument-rouge.vercel.app/anime/gogoanime/${props.title}`)
    const data = await res.json()
    if (data && Array.isArray(data.results)) {
        const result = data.results
        return result.map((bruh:any)=> bruh.id)
    }
}

export async function searchMovie(props:Props) {
    const res = await fetch(`https://consument-rouge.vercel.app/movies/flixhq/${props.title}`)
    const data = await res.json()
    if (data && Array.isArray(data.results)) {
        const result = data.results
        return result.map((bruh:any)=> bruh.id)
    }
    
}


