interface Props{
  id?:number | string | any;
    name?:string | any;
}


export async function malapi(props: Props) {
    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${props.name}`, {cache:"force-cache"})
    const data = await res.json()
    if (data && Array.isArray(data.data)) {
        return data.data;
      } else {
        return [];
      }
}

export async function fetchJikan(props:Props){
  const res = await fetch(`https://api.jikan.moe/v4/anime/${props.id}`, {cache:"force-cache"})
  const response = await res.json();
  const data = response.data;
  return {...data}
}