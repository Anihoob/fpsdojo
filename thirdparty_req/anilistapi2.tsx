interface Props{
    id: string;
}


export default async function anilistapi2(props:Props) {
    const res = await fetch(`https://consument-rouge.vercel.app/anime/enime/info?id=${props.id}`)
    const data = await res.json()
    return {...data}
}
