// example: how to delete cookies
import { Form, Link } from "@remix-run/react";
import { redirect } from "@remix-run/node";

import { cookieHandler } from "~/cookies.server";

export const action = async ({ request }) => {
  let headers = new Headers();
  const cookieHeader = request.headers.get("Cookie");

  const userPrefs1 = cookieHandler("test1");
  const cookie1 = (await userPrefs1.parse(cookieHeader)) || {};
  if (Object.keys(cookie1).length !== 0) {
    headers.append(
      "Set-Cookie",
      await userPrefs1.serialize(cookie1, { maxAge: -1 })
    );
  }

  const userPrefs2 = cookieHandler("test2");
  const cookie2 = (await userPrefs2.parse(cookieHeader)) || {};
  if (Object.keys(cookie2).length !== 0) {
    headers.append(
      "Set-Cookie",
      await userPrefs2.serialize(cookie2, { maxAge: -1 })
    );
  }

  return redirect("/cookie-set", { headers });
};

export default function CookieDeleteRoute() {
  return (
    <>
      <div className="container-sm">
        <div className="row">
          <div className="col-sm-4"></div>
          <h3>Delete demo cookie?</h3>
          <Form method="post">
            <div className="mb-2">
              <button type="submit" className="btn btn-danger">
                Delete Cookie
              </button>
            </div>
          </Form>
          <Link to="/">Never mind</Link>
        </div>
      </div>
    </>
  );
}
