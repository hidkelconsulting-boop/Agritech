import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_COOKIE, BACKEND_API_URL, REFRESH_COOKIE } from "@/lib/config";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_COOKIE)?.value;

  // Revoke refresh token on backend (best effort)
  if (refreshToken) {
    await fetch(`${BACKEND_API_URL}/auth/logout`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    }).catch(() => { /* ignore */ });
  }

  cookieStore.delete(AUTH_COOKIE);
  cookieStore.delete(REFRESH_COOKIE);
  return NextResponse.json({ success: true });
}
