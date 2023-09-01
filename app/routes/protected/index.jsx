// a valid JWT is required to access this page
import { useLoaderData, Link } from "@remix-run/react";
import { json } from "@remix-run/node";
import { useState, useEffect } from "react";

import { remoteApi } from "~/api.server";
import { cookieHandler } from "~/cookies.server";

export async function loader({ request }) {
  const cookieHeader = request.headers.get("Cookie");

  // JWT Access
  const userPrefs1 = cookieHandler("__access");
  const cookie1 = (await userPrefs1.parse(cookieHeader)) || {};
  if (Object.keys(cookie1).length === 0) {
    // no token found in the cookie
    return json({ message: "unauthorized" }, 401);
  }

  // forward the token to the remote API
  try {
    const url = remoteApi + "/api/v1/test-jwt";
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie1.jwt}`,
      },
    });

    if (res.status !== 200 && res.status < 500) {
      return json({ message: "unauthorized" }, 401);
    }

    if (res.status >= 500) {
      return json({ message: "remote server error" }, res.status);
    }

    const data = await res.json();

    return json({ message: data.message }, 200);
  } catch (e) {
    return json({ message: "internal server error" }, 500);
  }
}

export default function ProtectedRoute() {
  const data = useLoaderData();
  const [isAuthorized, setIsAuthorized] = useState(false); // initial state is false

  useEffect(() => {
    if (
      data.message !== "unauthorized" &&
      data.message !== "remote server error" &&
      data.message !== "internal server error"
    ) {
      setIsAuthorized(true);
    }
  }, [data.message]);

  return (
    <div className="container-sm">
      <div className="row">
        <div className="col-sm-4"></div>
        <h2>Protected Area | Test JWT</h2>
        <div className="mb-3">
          <div className="mb-2">
            <p>{data.message}</p>
          </div>
        </div>

        <hr />
        {isAuthorized ? <Link to="/logout">Logout</Link> : null}
        <Link to="/">Home</Link>
      </div>
    </div>
  );
}
