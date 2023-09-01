// https://remix.run/docs/en/1.19.3/utils/cookies
import { createCookie } from "@remix-run/node"; // or cloudflare/deno

export function cookieHandler(key) {
  const userPrefs = createCookie(key, {
    domain: process.env.COOKIE_DOMAIN,
    path: process.env.COOKIE_PATH,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.COOKIE_SAME_SITE,
    secrets: [process.env.SESSION_SECRET],
  });
  return userPrefs;
}
