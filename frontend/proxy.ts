import { NextRequest, NextResponse } from "next/server";
import { checkServerSession } from "./app/lib/api/clientApi/serverApi";

const privateRoutes = ["/profile", "/add-listing"];

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const { pathname } = request.nextUrl;
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // Якщо маршрут приватний
  if (isPrivateRoute) {
    // Немає accessToken → пробуємо refresh
    if (!accessToken) {
      if (refreshToken) {
        const data = await checkServerSession();
        const setCookie = data.headers["set-cookie"];

        if (setCookie) {
          const response = NextResponse.next();

          // Масив Set-Cookie
          const cookiesArray = Array.isArray(setCookie)
            ? setCookie
            : [setCookie];

          for (const cookieStr of cookiesArray) {
            const [cookieName, cookieValue] = cookieStr
              .split(";")[0]
              .split("=");

            // Встановлюємо куки правильно
            response.cookies.set(cookieName, cookieValue, {
              path: "/",
              httpOnly: true,
              secure: true,
              sameSite: "none",
            });
          }

          return response;
        }
      }

      // Немає accessToken і refreshToken → редірект
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  // Доступ дозволено
  return NextResponse.next();
}

export const config = {};
