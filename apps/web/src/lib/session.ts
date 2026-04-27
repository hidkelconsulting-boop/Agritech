import { cookies } from "next/headers";
import { AUTH_COOKIE } from "./config";

export async function getTokenFromCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE)?.value ?? null;
}
