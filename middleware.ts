import { NextRequest, NextResponse } from "next/server";

import { fetcher } from "./app/api-fetcher";
import { getSession } from "./lib/session/cookie";

const { APP_URL: baseUrl = "http://localhost:3002", SESSION_KEY = "session" } =
  process.env;

export default async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  let nextResponse = NextResponse.next();

  const authPathnames = ["/login"];

  const session = await getSession(req.cookies);

  if (["/logout"].includes(nextUrl.pathname) && session) {
    return nextResponse;
  }

  let redirectUrl: string = baseUrl;

  // Jika session tidak ada dan pengguna mengakses halaman non-auth
  if (!session && !authPathnames.includes(nextUrl.pathname)) {
    redirectUrl += "/login";
  }

  // Jika session ada dan pengguna mencoba mengakses halaman auth
  if (session && authPathnames.includes(nextUrl.pathname)) {
    redirectUrl += "/";
  }

  // Mencegah redirect ke halaman yang sama
  if (redirectUrl !== nextUrl.href && redirectUrl !== baseUrl) {
    nextResponse = NextResponse.redirect(redirectUrl);
  }

  if (session) {
    const verifyResponse = await fetcher("/v1/auth/verify");

    if (verifyResponse.code === 401) {
      nextResponse = NextResponse.redirect(
        `${baseUrl}/logout?redirectTarget=${nextUrl.pathname}`,
      );
    }
  }

  return nextResponse;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|css|js|images|svgs|favicon.ico|firebase-messaging-sw.js|.*\\.png$|.*\\.jpg$|.*\\.webp$).*)",
  ],
};
