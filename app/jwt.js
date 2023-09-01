// Get the expiration timestamp of a token in unix epoch milliseconds
export function jwtExpiry(token) {
  try {
    const tokenPayloadBase64 = token.split(".")[1]; // JWT payload is the second part
    const tokenPayload = JSON.parse(
      Buffer.from(tokenPayloadBase64, "base64").toString()
    );

    if (tokenPayload.exp) {
      const expTimestamp = tokenPayload.exp;
      const expTimestampMillisecond = expTimestamp * 1000;
      return expTimestampMillisecond;
    }

    // token does not have an expiration claim, expire immediately
    return -1;
  } catch (e) {
    // token parsing failed, expire immediately
    return -1;
  }
}
