
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
function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  const requestTimestamps: number[] = [];
  const maxRequests: number = 5;
  const timeWindow: number = 500;
  
  export default async function moviereq(props: any): Promise<any> {
    const currentTime: number = Date.now();
    while (requestTimestamps.length > 0 && currentTime - requestTimestamps[0] >= timeWindow) {
      requestTimestamps.shift();
    }
  
    if (requestTimestamps.length >= maxRequests) {
      const nextRequestAllowed: number = requestTimestamps[0] + timeWindow;
      const waitTime: number = nextRequestAllowed - currentTime;
      await delay(waitTime);
    }
  
    const rez = await fetch(`https://api-dojoverse.vercel.app/movies/flixhq/info?id=${props.id}`, { cache: "force-cache" });
    const deta = await rez.json();
  
    requestTimestamps.push(currentTime);
  
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
  