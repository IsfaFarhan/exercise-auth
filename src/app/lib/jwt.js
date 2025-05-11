//This file is meant to say, two things. First is to make sure the asign of access and refresh token.
// Second is to verify the both of the token. This is where the secret code in the ENV is being used.
// Other than that this file also will determined the expire time for both tokens.

import jwt from "jsonwebtoken";
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export function signAccessToken(payload) {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET /* { expiresIn: "30s" } */);
}

export function signRefreshToken(payload) {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET /* { expiresIn: "1m" } */);
}

export function verifyAccessToken(token) {
  return jwt.sign(token, ACCESS_TOKEN_SECRET);
}

export function verifyRefreshToken(token) {
  return jwt.sign(token, REFRESH_TOKEN_SECRET);
}
