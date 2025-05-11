import { NextResponse } from "next/server";
import { connect } from "../../../../app/lib/mongodb";
import Userdata from "../../../lib/models/Userdata";
import bcrypt from "bcrypt";
import { signAccessToken, signRefreshToken } from "../../../lib/jwt";
/* import { Serialize } from "cookie"; */
import { serialize } from "cookie";

export async function POST(req) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: "Missing credential" }, { status: 400 });
  }
  await connect();
  const user = await Userdata.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ error: "No email registered" }, { status: 401 });
  }

  //issueing both access and refresh token
  const accessToken = signAccessToken({ sub: user._id });
  const refreshToken = signRefreshToken({ sub: user._id });

  user.refreshToken = refreshToken;
  await user.save();

  const cookieRefresh = serialize("refreshToken", refreshToken, {
    httpOnly: true,
    path: "/",
    maxAge: 60,
  });

  const cookieAccess = serialize("accessToken", accessToken, {
    httpOnly: true,
    path: "/",
    maxAge: 30,
  });

  return NextResponse.json(
    { accessToken, refreshToken },
    {
      status: 200,
      headers: { "set-Cookie": [cookieRefresh, cookieAccess] },
    }
  );
}
