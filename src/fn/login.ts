import dayjs from 'dayjs'

let token = ''
let tokenLifetime = '1977-01-01T00:00:00Z'

function getCookieValue(
  cookieStr: string | null,
  key: string,
): string | undefined {
  if (!cookieStr) return undefined
  const match = cookieStr.match(new RegExp(`${key}=([^;]+)`))
  return match ? match[1] : undefined
}

export async function login() {
  if (token && dayjs(tokenLifetime).isAfter(dayjs())) {
    return token
  }
  const res = await fetch('https://power.rakkipower.win', {
    headers: {
      'CF-Access-Client-Id': process.env.CF_CLIENT_ID!,
      'CF-Access-Client-Secret': process.env.CF_CLIENT_SECRET!,
    },
  })
  const setCookieStr = res.headers.get('set-cookie')
  const tokenRes = getCookieValue(setCookieStr, 'CF_Authorization')
  const tokenLifetimeRes = getCookieValue(setCookieStr, 'Expires')
  if (tokenRes && tokenLifetimeRes) {
    token = tokenRes
    tokenLifetime = tokenLifetimeRes
  }

  return token
}
