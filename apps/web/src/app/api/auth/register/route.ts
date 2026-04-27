import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_COOKIE, BACKEND_API_URL, REFRESH_COOKIE } from "@/lib/config";

export async function POST(request: Request) {
  const payload = await request.json();

  const response = await fetch(`${BACKEND_API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) {
    return NextResponse.json(data, { status: response.status });
  }

  const cookieStore = await cookies();
  cookieStore.set({
    name: AUTH_COOKIE,
    value: data.token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  if (data.refreshToken) {
    cookieStore.set({
      name: REFRESH_COOKIE,
      value: data.refreshToken,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  }

  return NextResponse.json({ user: data.user, farm: data.farm, organization: data.organization });
}
