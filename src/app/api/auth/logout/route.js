import { connect } from "../../../lib/mongodb";
import Userdata from "../../../lib/models/Userdata";
import { NextResponse } from "next/server";

export async function POST(req) {
  const token = req.cookies.get("accessToken");
  if (!token)
    return NextResponse.json({ error: "no access token" }, { status: 401 });

  const refToken = req.cookies.get("refreshToken");
  if (!refToken)
    return NextResponse.json({ error: "no refresh token" }, { status: 401 });

  await connect();
  let payload;
  try {
    payload = refToken;
  } catch {
    NextResponse.json({ error: "no token" });
  }

  const userRef = await Userdata.findById(payload.sub);
  if (userRef) {
    userRef.refreshToken = "";
    await userRef.save();
  }

  const res = NextResponse.json({ loggedOut: true }, { status: 200 });
  res.headers.append(
    "Set-Cookie",
    "accessToken=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax"
  );
  res.headers.append(
    "Set-Cookie",
    "refreshToken=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax"
  );
  return res;
}
