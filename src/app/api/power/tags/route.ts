import { login } from '@/fn/login'
import { getCloudflareContext } from '@opennextjs/cloudflare'
import { NextResponse } from 'next/server'

export async function GET() {
  const env = getCloudflareContext().env
  const cf_token = await login()
  const res = await fetch(`${env.STRAPI_URL}/api/tags`, {
    headers: {
      Authorization: `Bearer ${env.STRAPI_TOKEN}`,
      'cf-access-token': cf_token,
    },
  })
  const text = await res.text()
  return new NextResponse(text)
}
