interface Props {
  id: string | any;
}

export default async function animereq(props: Props) {
  const res = await fetch(
    `https://api.consumet.org/anime/gogoanime/info/${props.id}`,
    { cache: "force-cache" }
  );
  const data = await res.json();
  return {
    id: data.id,
    title: data.title,
    image: data.image,
    totalEpisodes: data.totalEpisodes,
    releaseDate: data.releaseDate,
    description: data.description,
    genres: data.genres,
    otherName:data.otherName,
    type: "Anime",
  };
}
