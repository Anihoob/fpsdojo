interface Props{
    title:string | any;
}


export default async function anilistapi(props: Props) {
    const res = await fetch(`https://consument-rouge.vercel.app/anime/enime/${props.title}`)
    const data = await res.json()
    if (data && Array.isArray(data.results)) {
      return data.results;
    } else {
      return [];
    }
}
