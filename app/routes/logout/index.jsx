// // example: logout action
import { Form, Link } from "@remix-run/react";
import { redirect } from "@remix-run/node";

import { cookieHandler } from "~/cookies.server";

export const action = async ({ request }) => {
  let headers = new Headers();
  const cookieHeader = request.headers.get("Cookie");

  // JWT Access
  const userPrefs1 = cookieHandler("__access");
  const cookie1 = (await userPrefs1.parse(cookieHeader)) || {};
  if (Object.keys(cookie1).length !== 0) {
    headers.append(
      "Set-Cookie",
      await userPrefs1.serialize(cookie1, { maxAge: -1 })
    );
  }

  // JWT Refresh
  const userPrefs2 = cookieHandler("__refresh");
  const cookie2 = (await userPrefs2.parse(cookieHeader)) || {};
  if (Object.keys(cookie2).length !== 0) {
    headers.append(
      "Set-Cookie",
      await userPrefs2.serialize(cookie2, { maxAge: -1 })
    );
  }

  return redirect("/login", { headers });
};

// on client-side
export default function Logout() {
  return (
    <div className="container-sm">
      <div className="row">
        <div className="col-sm-4"></div>
        <h2>Logout?</h2>
        <div className="mb-3">
          <Form method="post">
            <div className="mb-2">
              <button type="submit" className="btn btn-danger">
                Logout
              </button>
            </div>
          </Form>
        </div>

        <hr />
        <Link to="/">Home</Link>
      </div>
    </div>
  );
}
