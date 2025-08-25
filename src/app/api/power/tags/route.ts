import { fetchStrapi } from '@/fns/fetchStrapi'
import { TStrapiRes, TStrapiTag } from '@/types/strapi.type'
import { getCloudflareContext } from '@opennextjs/cloudflare'
import { NextResponse } from 'next/server'

export async function GET() {
  const env = getCloudflareContext().env
  const res = await fetchStrapi(`${env.STRAPI_URL}/api/tags`)
  return new NextResponse(res.body, {
    headers: { 'Content-Type': 'application/json' },
  })
}
