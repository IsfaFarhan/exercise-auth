import { NextResponse } from "next/server";
import { verifyRefreshToken, signAccessToken } from "../../../lib/jwt";
import { connect } from "../../../lib/mongodb";
import Userdata from "../../../lib/models/Userdata";

export async function POST(req) {
  await connect();

  const refreshToken = req.cookies.get("refreshToken")?.value;
  if (!refreshToken)
    return NextResponse.json({ error: "No refresh token" }, { status: 401 });

  let payload;
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    return NextResponse.json(
      { error: "Invalid refresh token" },
      { status: 401 }
    );
  }

  const user = await Userdata.findById(payload.sub);
  if (!user)
    return NextResponse.json({ error: "user is not exist" }, { status: 401 });
  if (user.refreshToken !== refreshToken)
    return NextResponse.json({ error: "No token" }, { status: 401 });

  const newAccessToken = signAccessToken({ sub: payload });
  const res = NextResponse.json({ ok: true });
  res.cookies.set("accessToken", newAccessToken, { httpOnly: true, path: "/" });
  return res;
}
