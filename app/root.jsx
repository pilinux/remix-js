import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import useErrorHandler from "./errors";

import styles from "@tabler/core/dist/css/tabler.min.css";

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

// https://remix.run/docs/en/main/guides/errors
// https://remix.run/docs/en/main/route/error-boundary-v2
export function ErrorBoundary() {
  // status, statusText, data, message, stack
  const { statusText } = useErrorHandler();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>{statusText}</title>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
