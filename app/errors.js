// https://remix.run/docs/en/main/route/error-boundary-v2
// useRouteError: 4xx/5xx (catch all errors)
// isRouteErrorResponse: 4xx (client errors for fine-tuning the UI)
//
// example (throw error):
// throw new Response("authentication failed", { status: 401, statusText: "Unauthorized" });
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

function useErrorHandler() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    /*
    Example:

    error: ErrorResponse {
      status: 400,
      statusText: 'Bad Request',
      internal: false,
      data: 'custom message'
    }
    */
    return {
      status: error.status,
      statusText: error.statusText,
      data: error.data,
    };
  }

  if (error instanceof Error) {
    /*
    Example:
    ReferenceError: ...

    Important:
    - message
    - stack
    */
    return {
      status: error.status,
      statusText: error.statusText,
      data: error.data,
      message: error.message,
      stack: error.stack,
    };
  }

  return {
    statusText: "Unknown Error",
  };
}

export default useErrorHandler;
