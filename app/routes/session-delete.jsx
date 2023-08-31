// example: how to delete session
import { Form, Link } from "@remix-run/react";
import { redirect } from "@remix-run/node";

import { getSession, destroySession } from "~/sessions.server";

export const action = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  // only for example purpose:
  // print custom values on the console
  const message1 = session.get("customKey1") || null;
  const message2 = session.get("customKey2") || null;
  const message3 = session.get("customKey3") || null;

  console.log(message1);
  console.log(message2);
  console.log(message3);

  return redirect("/session-set", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};

export default function SessionDeleteRoute() {
  return (
    <>
      <div className="container-sm">
        <div className="row">
          <div className="col-sm-4">
            <h3>Delete demo session?</h3>
            <Form method="post">
              <div className="mb-2">
                <button type="submit" className="btn btn-danger">
                  Delete Session
                </button>
              </div>
            </Form>
            <Link to="/">Never mind</Link>
          </div>
        </div>
      </div>
    </>
  );
}
