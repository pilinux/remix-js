// example: how to set session
import { Form, Link } from "@remix-run/react";
import { redirect } from "@remix-run/node";

import { getSession, commitSession } from "~/sessions.server";

export const action = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  session.set("customKey1", "customValue1");
  session.set("customKey2", "customValue2");
  session.set("customKey3", "customValue3");

  return redirect("/session-delete", {
    headers: {
      "Set-Cookie": await commitSession(session, {
        maxAge: 300,
      }),
    },
  });
};

export default function SessionSetRoute() {
  return (
    <>
      <div className="container-sm">
        <div className="row">
          <div className="col-sm-4"></div>
          <h3>Set demo session?</h3>
          <Form method="post">
            <div className="mb-2">
              <button type="submit" className="btn btn-success">
                Set Session
              </button>
            </div>
          </Form>
          <Link to="/">Never mind</Link>
        </div>
      </div>
    </>
  );
}
