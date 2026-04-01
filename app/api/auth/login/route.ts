import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const password = body.password;

  const sitePassword = process.env.SITE_PASSWORD || "hourclub2026";

  if (password !== sitePassword) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set("hc_auth", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return response;
}
