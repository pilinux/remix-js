// for health check
import { json } from "@remix-run/node";

export let loader = async ({ request }) => {
  const isHealthy = true;

  if (isHealthy) {
    return json({ message: "OK" }, 200);
  }

  return json({ message: "Service Unavailable" }, 503);
};
