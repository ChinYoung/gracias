import { TStrapiRes, TStrapiTag } from '@/types/strapi.type'
import { getCloudflareContext } from '@opennextjs/cloudflare'

export default async function Home() {
  const env = getCloudflareContext().env
  const res = await fetch(`${env.API_HOST}/api/power/tags`)
  const jsonData = await res.json<TStrapiRes<TStrapiTag[]>>()
  console.log('🚀 ~ Home ~ resData:', jsonData)

  return (
    <>
      {jsonData.data.map((tag) => (
        <div key={tag.documentId}>{tag.name}</div>
      ))}
    </>
  )
}
