import { NextResponse } from "next/server";
import { connect } from "../../../../app/lib/mongodb";
import Userdata from "../../../../app/lib/models/Userdata";
import bcrypt from "bcrypt";

export async function POST(req) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  await connect();
  const existing = await Userdata.findOne({ email });
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await Userdata.create({
    email,
    password: hash,
  });
  return NextResponse.json(
    { message: "Created", userId: user._id },
    { status: 201 }
  );
}
