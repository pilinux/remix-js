// example: how to set cookies
import { Form, Link } from "@remix-run/react";
import { redirect } from "@remix-run/node";

import { cookieHandler } from "~/cookies.server";

export const action = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");

  const userPrefs1 = cookieHandler("test1");
  const cookie1 = (await userPrefs1.parse(cookieHeader)) || {};
  cookie1.customKey1 = "customValue1";
  cookie1.customKey2 = "customValue2";
  cookie1.customKey3 = "customValue3";

  const userPrefs2 = cookieHandler("test2");
  const cookie2 = (await userPrefs2.parse(cookieHeader)) || {};
  cookie2.customKey1 = "customValue4";
  cookie2.customKey2 = "customValue5";
  cookie2.customKey3 = "customValue6";

  let headers = new Headers();
  headers.append(
    "Set-Cookie",
    await userPrefs1.serialize(cookie1, { maxAge: 300 })
  );
  headers.append(
    "Set-Cookie",
    await userPrefs2.serialize(cookie2, { maxAge: 600 })
  );

  return redirect("/cookie-delete", {
    headers,
  });
};

export default function CookieSetRoute() {
  return (
    <>
      <div className="container-sm">
        <div className="row">
          <div className="col-sm-4"></div>
          <h3>Set demo cookie?</h3>
          <Form method="post">
            <div className="mb-2">
              <button type="submit" className="btn btn-success">
                Set Cookie
              </button>
            </div>
          </Form>
          <Link to="/">Never mind</Link>
        </div>
      </div>
    </>
  );
}
