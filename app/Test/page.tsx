
import search from "@/lib/search"

export default async function page() {

  const searchcrow = await search({query:'bleach'})
  console.log(searchcrow)
  return (
    <div>page</div>
  )
}
