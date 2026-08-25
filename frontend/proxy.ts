import { NextRequest, NextResponse } from "next/server";

export default async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken");
  const refreshToken = request.cookies.get("refreshToken");

  const isPrivate = request.nextUrl.pathname.startsWith("/konto");

  if (isPrivate && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/konto/:path*"],
  runtime: "nodejs",
};
