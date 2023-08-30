import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";

import { remoteApi } from "~/api.server";

// https://remix.run/docs/en/1.19.3/other-api/fetch
// https://remix.run/docs/en/1.19.3/utils/json
// https://remix.run/docs/en/main/guides/bff
// https://remix.run/docs/en/main/guides/api-routes
// https://remix.run/docs/en/main/guides/resource-routes
export async function loader() {
  try {
    const res = await fetch(remoteApi, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });

    const data = await res.json();

    return json({ message: data.message }, res.status);
  } catch (e) {
    return json({ message: "remote API down" }, 502);
  }
}

// check status of the remote API
export default function Status() {
  const data = useLoaderData();

  return (
    <div className="container-sm">
      <div className="row">
        <div className="col-sm-4"></div>
        <h3>Status: API</h3>
        <p>{data.message}</p>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
}
