
interface Props{
    id:string |any;
}

// export default async function moviereq(props:Props) {
//     const rez = await fetch(`https://api-dojoverse.vercel.app/movies/flixhq/info?id=${props.id}`, {cache : "force-cache"})
//     const deta = await rez.json()
//     return {
//         id: deta.id.replace("movie/", ""),
//         title: deta.title,
//         image:deta.image,
//         releaseDate: deta.releaseDate,
//         cover: deta.cover,
//         description: deta.description,
//         genres: deta.genres,
//         duration:deta.duration,
//         type: "Movie",
//     }
// }


function delay(ms:any) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  

  let lastRequestTime = 0;

  const minRequestInterval = 1000;
  
  export default async function moviereq(props:Props) {
    const currentTime = Date.now();
    const timeElapsed = currentTime - lastRequestTime;
  
    if (timeElapsed < minRequestInterval) {
      const delayTime = minRequestInterval - timeElapsed;
      await delay(delayTime);
    }
  
    const rez = await fetch(`https://api-dojoverse.vercel.app/movies/flixhq/info?id=${props.id}`, { cache: "force-cache" });
    const deta = await rez.json();
  
    lastRequestTime = Date.now();
  
    return {
      id: deta.id.replace("movie/", ""),
      title: deta.title,
      image: deta.image,
      releaseDate: deta.releaseDate,
      cover: deta.cover,
      description: deta.description,
      genres: deta.genres,
      duration: deta.duration,
      type: "Movie",
    };
  }
  