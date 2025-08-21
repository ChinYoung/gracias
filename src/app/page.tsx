import { getCloudflareContext } from '@opennextjs/cloudflare'

export default async function Home() {
  const env = getCloudflareContext().env
  const res = await fetch(`${env.API_HOST}/api/power/tags`)
  const resData = await res.json()
  console.log('🚀 ~ Home ~ resData:', resData)

  return (
    <>
      <div>WIP</div>
    </>
  )
}
