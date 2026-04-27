import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_COOKIE, BACKEND_API_URL, REFRESH_COOKIE } from "@/lib/config";

async function doFetch(
  targetUrl: string,
  method: string,
  bearerToken: string,
  contentType: string | null,
  body: ArrayBuffer | undefined,
) {
  const headers = new Headers();
  headers.set("Authorization", `Bearer ${bearerToken}`);
  if (contentType) headers.set("content-type", contentType);
  return fetch(targetUrl, { method, headers, body });
}

async function proxyRequest(request: Request, pathParts: string[]) {
  const cookieStore = await cookies();
  let token = cookieStore.get(AUTH_COOKIE)?.value;
  const refreshToken = cookieStore.get(REFRESH_COOKIE)?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const incomingUrl = new URL(request.url);
  const targetUrl = `${BACKEND_API_URL}/${pathParts.join("/")}${incomingUrl.search}`;
  const method = request.method;
  const canHaveBody = !["GET", "HEAD"].includes(method);
  const contentType = request.headers.get("content-type");
  const body = canHaveBody ? await request.arrayBuffer() : undefined;

  let backendResponse = await doFetch(targetUrl, method, token, contentType, body);

  // If 401 and we have a refresh token, attempt rotation once
  if (backendResponse.status === 401 && refreshToken) {
    const refreshResponse = await fetch(`${BACKEND_API_URL}/auth/refresh`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (refreshResponse.ok) {
      const refreshData = (await refreshResponse.json()) as { token: string; refreshToken: string };
      token = refreshData.token;

      // Persist new tokens
      const maxAge = 60 * 60 * 24 * 7;
      const secure = process.env.NODE_ENV === "production";
      cookieStore.set({ name: AUTH_COOKIE, value: token, httpOnly: true, sameSite: "lax", secure, path: "/", maxAge });
      cookieStore.set({ name: REFRESH_COOKIE, value: refreshData.refreshToken, httpOnly: true, sameSite: "lax", secure, path: "/", maxAge });

      // Retry original request
      backendResponse = await doFetch(targetUrl, method, token, contentType, body);
    }
  }

  const respContentType = backendResponse.headers.get("content-type") ?? "application/json";
  const responseBody = await backendResponse.arrayBuffer();

  return new NextResponse(responseBody, {
    status: backendResponse.status,
    headers: { "content-type": respContentType },
  });
}

export async function GET(request: Request, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  return proxyRequest(request, path);
}

export async function POST(request: Request, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  return proxyRequest(request, path);
}

export async function PATCH(request: Request, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  return proxyRequest(request, path);
}

export async function PUT(request: Request, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  return proxyRequest(request, path);
}

export async function DELETE(request: Request, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  return proxyRequest(request, path);
}
