import { login } from "@/fns/login";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function fetchStrapi(...args: Parameters<typeof fetch>) {
  const env = getCloudflareContext().env;
  const cf_token = await login();
  const res = await fetch(`${env.STRAPI_URL}/api/${args[0]}`, {
    ...args[1],
    headers: {
      ...(args[1]?.headers || {}),
      Authorization: `Bearer ${env.STRAPI_TOKEN}`,
      "cf-access-token": cf_token,
    },
  });
  if (res.ok) {
    return res;
  }
  if (res.status === 404) {
    throw new NotFoundError(res.statusText);
  }
  throw new Error(res.statusText);
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}
