import { NextResponse } from "next/server";
import { verifyAccessToken } from "../../../lib/jwt";

export async function GET(req) {
  const token = req.cookies.get("accessToken")?.value;
  if (!token)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  try {
    const payload = verifyAccessToken(token);
    return NextResponse.json({ user: payload });
  } catch {
    return NextResponse.json(
      { error: "Token invalid or expired" },
      { status: 401 }
    );
  }
}
