import { createHash } from "node:crypto";

// Calculate a SHA256 hash using the algorithm from the SHA-2 family
export function sha256(content) {
  return createHash("sha256").update(content).digest("hex");
}

// Calculate a SHA512 hash using the algorithm from the SHA-2 family
export function sha512(content) {
  return createHash("sha512").update(content).digest("hex");
}

// Calculate a SHA256 hash using the algorithm from the SHA-3 family
export function sha3_256(content) {
  return createHash("sha3-256").update(content).digest("hex");
}

// Calculate a SHA512 hash using the algorithm from the SHA-3 family
export function sha3_512(content) {
  return createHash("sha3-512").update(content).digest("hex");
}

// Convert hexadecimal string to base64 encoded string
export function encodeBase64(hexString) {
  // convert hexadecimal string to a Buffer
  const buffer = Buffer.from(hexString, "hex");

  // convert Buffer to base64 encoded string
  const base64String = buffer.toString("base64");

  return base64String;
}

// Convert base64 encoded string to hexadecimal string
export function decodeBase64(base64String) {
  // convert base64 encoded string to a Buffer
  const buffer = Buffer.from(base64String, "base64");

  // convert Buffer to a hexadecimal string
  const originalString = buffer.toString("hex");

  return originalString;
}
