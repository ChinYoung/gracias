import { login } from '@/fn/login'
import { getCloudflareContext } from '@opennextjs/cloudflare'
import Link from 'next/link'

export default async function Home() {
  const env = getCloudflareContext().env
  const req = await fetch(`${env.API_HOST}/api/list`)
  const res = await req.json<{ data: string[] }>()
  const resData = res.data
  const token = await login()
  console.log('🚀 ~ Home ~ token:', token)

  return (
    <>
      {resData.map((item) => (
        <Link key={item} href={`/${item}`}>
          {item}
        </Link>
      ))}
    </>
  )
}
