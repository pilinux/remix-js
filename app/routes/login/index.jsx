// example: login action
import { json } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { useState } from "react";

import { remoteApi } from "~/api.server";
import { sha512, sha3_512 } from "~/crypto";
import { jwtExpiry } from "~/jwt";
import { cookieHandler } from "~/cookies.server";

function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(email);
}

function validatePassword(password) {
  // ,;.:-_#'+*@<>!"§$|%&/()[]=?{}\
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[,;.:\-\_#\'+*@<>!"§$|%&/\(\)\[\]=?\{\}\\]).{6,}$/;
  return regex.test(password);
}

// https://remix.run/docs/en/main/guides/resource-routes
// on server-side
export const action = async ({ request }) => {
  const routePart = new URL(request.url).pathname;

  const form = await request.formData();
  const email = form.get("email");
  const sha2Password = form.get("password");

  // on server-side, hash the password again
  const sha3Password = sha3_512(sha2Password);

  switch (request.method) {
    case "POST": {
      // console.log(email);
      // console.log(sha2Password);
      // console.log(sha3Password);

      // build JSON object
      const requestData = {
        email: email,
        password: sha3Password,
      };

      // convert the object to a JSON string
      const jsonBody = JSON.stringify(requestData);

      // forward to remote API
      try {
        const url = remoteApi + "/api/v1" + routePart;

        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonBody,
        });

        const data = await res.json();
        // console.log(data);
        // console.log(res.status);
        // console.log(res.statusText);

        // authentication successful
        if (res.status === 200) {
          // handle JWT
          const { accessJWT, refreshJWT } = data;
          const expAccessJWT = jwtExpiry(accessJWT);
          const expRefreshJWT = jwtExpiry(refreshJWT);
          // console.log(accessJWT);
          // console.log(refreshJWT);
          // console.log(expAccessJWT);
          // console.log(expRefreshJWT);

          // construct HttpOnly cookie
          const cookieHeader = request.headers.get("Cookie");

          // JWT Access
          const userPrefs1 = cookieHandler("__access");
          const cookie1 = (await userPrefs1.parse(cookieHeader)) || {};
          cookie1.jwt = accessJWT;

          // JWT Refresh
          const userPrefs2 = cookieHandler("__refresh");
          const cookie2 = (await userPrefs2.parse(cookieHeader)) || {};
          cookie2.jwt = refreshJWT;

          let headers = new Headers();
          headers.append(
            "Set-Cookie",
            await userPrefs1.serialize(cookie1, {
              expires: new Date(expAccessJWT),
            })
          );
          headers.append(
            "Set-Cookie",
            await userPrefs2.serialize(cookie2, {
              expires: new Date(expRefreshJWT),
            })
          );

          // construct a JSON response with headers to set cookies
          return json(
            { message: "ok" },
            {
              status: 200,
              headers,
            }
          );
        }

        // authentication failed
        return json({ message: data.message }, res.status);
      } catch (e) {
        return json({ message: "remote API down" }, 502);
      }
    }
  }
};

// on client-side
export default function Login() {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [authError, setAuthError] = useState("");
  const [serverError, setServerError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid) {
      setEmailError("Invalid email format");
      setPasswordError("");
      setAuthError("");
      setServerError("");
      return;
    }
    if (!isPasswordValid) {
      setEmailError("");
      setPasswordError(
        "Password must be at least 6 characters long and contain A-Z, a-z, 0-9, and minimum one special character"
      );
      setAuthError("");
      setServerError("");
      return;
    }
    setEmailError("");
    setPasswordError("");
    setAuthError("");
    setServerError("");

    // on client-side, hash the password
    const sha2Password = sha512(password);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", sha2Password);

    // send data to remix server
    try {
      const res = await fetch("/login", {
        method: "POST",
        body: formData,
      });

      if (res.status === 200) {
        // authentication successful, perform client-side redirect
        window.location.href = "/logout";
      }
      if (res.status !== 200 && res.status < 500) {
        setAuthError("Invalid email or password");
      }
      if (res.status >= 500) {
        setServerError("Remote server error");
      }
    } catch (e) {
      setServerError("Internal server error");
    }
  }

  return (
    <div className="container-sm">
      <div className="row">
        <div className="col-sm-4">
          <h2>Login</h2>

          <Form method="post" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email-input" className="form-label">
                Email
              </label>
              <input
                id="email-input"
                name="email"
                type="email"
                className="form-control"
                placeholder="name@email.com"
              />
              {emailError && <p className="text-danger">{emailError}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="password-input" className="form-label">
                Password
              </label>
              <input
                id="password-input"
                name="password"
                type="password"
                className="form-control"
                placeholder="password"
              />
              {passwordError && <p className="text-danger">{passwordError}</p>}
            </div>
            <div className="mb-2">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            {authError && <p className="text-danger">{authError}</p>}
            {serverError && <p className="text-danger">{serverError}</p>}
          </Form>

          <hr />
          <Link to="/">Home</Link>
        </div>
      </div>
    </div>
  );
}
