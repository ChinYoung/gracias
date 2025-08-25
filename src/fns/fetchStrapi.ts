import { login } from '@/fns/login'
import { getCloudflareContext } from '@opennextjs/cloudflare'

export async function fetchStrapi(...args: Parameters<typeof fetch>) {
  const env = getCloudflareContext().env
  const cf_token = await login()
  return fetch(args[0], {
    ...args[1],
    headers: {
      ...(args[1]?.headers || {}),
      Authorization: `Bearer ${env.STRAPI_TOKEN}`,
      'cf-access-token': cf_token,
    },
  })
}
