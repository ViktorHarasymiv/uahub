// app/api/auth/me/route.ts

import { NextRequest, NextResponse } from "next/server";
import { api, ApiError } from "../../api";
import { parse } from "cookie";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    // 1. Проксіруємо запит на бекенд
    const apiRes = await api.get("auth/me", {
      headers: {
        cookie: req.headers.get("cookie") || "",
      },
    });

    // 2. Беремо cookieStore
    const cookieStore = cookies();

    // 3. Приймаємо set-cookie з бекенду (оновлений accessToken)
    const setCookie = apiRes.headers["set-cookie"];

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);

        const options = {
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          path: parsed.Path,
          maxAge: Number(parsed["Max-Age"]),
        };

        if (parsed.accessToken) {
          cookieStore.set("accessToken", parsed.accessToken, options);
        }

        if (parsed.refreshToken) {
          cookieStore.set("refreshToken", parsed.refreshToken, options);
        }
      }
    }

    // 4. Повертаємо user
    return NextResponse.json(apiRes.data);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          (error as ApiError).response?.data?.error ??
          (error as ApiError).message,
      },
      { status: (error as ApiError).status ?? 500 },
    );
  }
}
