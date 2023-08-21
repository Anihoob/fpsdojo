interface Props{
    name:string;
}


export default async function malapi(props: Props) {
    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${props.name}`)
    const data = await res.json()
    if (data && Array.isArray(data.data)) {
        return data.data;
      } else {
        return [];
      }
}
