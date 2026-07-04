import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { refreshSession } from "./app/lib/api";

const privateRoutes = ["/profile"];
const authRoutes = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // ---------------------------
  // 1. Немає accessToken
  // ---------------------------
  if (!accessToken) {
    // Є refreshToken → пробуємо refresh
    if (refreshToken) {
      const refreshed = await refreshSession();

      if (refreshed?.accessToken) {
        // Якщо користувач намагається зайти на /sign-in або /sign-up
        if (isAuthRoute) {
          return NextResponse.redirect(new URL("/", request.url));
        }

        // Приватний маршрут → пропускаємо
        if (isPrivateRoute) {
          return NextResponse.next();
        }
      }
    }

    // Немає refreshToken → юзер не авторизований
    if (isAuthRoute) {
      return NextResponse.next();
    }

    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  // ---------------------------
  // 2. Є accessToken
  // ---------------------------
  if (isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isPrivateRoute) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/profile/:path*", "/sign-in", "/sign-up"],
};
