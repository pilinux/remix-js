import { Link } from "@remix-run/react";

import useErrorHandler from "~/errors";

import styles from "~/styles/_index.css";

export const links = () => [{ rel: "stylesheet", href: styles }];

export const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="container-sm">
      <div className="row">
        <div className="col-sm-4">
          <h1>Welcome to Remix</h1>
          <div className="alert alert-primary" role="alert">
            A simple primary alert—check it out!
          </div>
          <div className="mb-2">
            <button type="button" className="btn btn-primary">
              Press button
            </button>
          </div>
          <ul className="index-ul">
            <li>
              <a
                target="_blank"
                href="https://remix.run/tutorials/blog"
                rel="noreferrer"
              >
                15m Quickstart Blog Tutorial
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://remix.run/tutorials/jokes"
                rel="noreferrer"
              >
                Deep Dive Jokes App Tutorial
              </a>
            </li>
            <li>
              <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
                Remix Docs
              </a>
            </li>
            <li>
              <Link to="session-set">Example: Set Session</Link>
            </li>
            <li>
              <Link to="session-delete">Example: Delete Session</Link>
            </li>
            <li>
              <Link to="cookie-set">Example: Set Cookie</Link>
            </li>
            <li>
              <Link to="cookie-delete">Example: Delete Cookie</Link>
            </li>
            <li>
              <Link to="status">Remote API Status [GET]</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  const { status, statusText, data, message, stack } = useErrorHandler();

  if (status === 401) {
    return (
      <div className="container-sm">
        <div className="row">
          <div className="col">
            <div className="error-container">
              <p>You must be logged in.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-sm">
      <div className="row">
        <div className="col">
          <div className="error-container">
            Something unexpected went wrong. Sorry about that.
            {statusText && <p>{statusText}</p>}
            {data && <p>{data}</p>}
            {message && <p>{message}</p>}
            {stack && <pre>{stack}</pre>}
          </div>
        </div>
      </div>
    </div>
  );
}
