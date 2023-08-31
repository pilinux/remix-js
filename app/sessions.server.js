// https://remix.run/docs/en/1.19.3/utils/sessions
import { createCookieSessionStorage } from "@remix-run/node"; // or cloudflare/deno

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the CookieOptions to create one
    // name
    // domain
    // path
    // maxAge
    // httpOnly
    // secure
    // sameSite
    cookie: {
      name: "__session",
      domain: process.env.COOKIE_DOMAIN,
      path: process.env.COOKIE_PATH,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.COOKIE_SAME_SITE,
      secrets: [process.env.SESSION_SECRET],
    },
  });

export { getSession, commitSession, destroySession };
