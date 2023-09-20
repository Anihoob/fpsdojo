interface Props {
    id: string | any;
  }
export default async function tmdb() {
    const res = await fetch(`https://api.themoviedb.org/3/movie/868759?api_key=${process.env.NEXT_PUBLIC_TMDB_API}`)
    const data = res.json()
    return data

}
