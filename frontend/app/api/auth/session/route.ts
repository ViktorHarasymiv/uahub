import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "../../api"; // твій axios nextServer
import { parse } from "cookie";

export async function GET(req: NextRequest) {
  try {
    // 1. Читаємо куки  з Next.js
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString(); // перетворюємо в строку

    // 2. Робимо запит на бекенд і передаємо куки
    const backendRes = await api.get("auth/session", {
      headers: {
        Cookie: cookieHeader,
      },
      withCredentials: true,
    });

    // 3. Переносимо нові куки з бекенду в Next.js
    const setCookie = backendRes.headers["set-cookie"];

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

      const normalizeBool = (value?: string) => {
        if (!value) return false;
        return value.toLowerCase() === "true";
      };

      const normalizeSameSite = (
        value?: string,
      ): "lax" | "strict" | "none" | undefined => {
        if (!value) return undefined;

        const v = value.toLowerCase();
        if (v === "lax") return "lax";
        if (v === "strict") return "strict";
        if (v === "none") return "none";
        return undefined;
      };

      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);

        const options = {
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          path: parsed.Path || "/",
          maxAge: parsed["Max-Age"] ? Number(parsed["Max-Age"]) : undefined,
          httpOnly: normalizeBool(parsed.HttpOnly),
          secure: normalizeBool(parsed.Secure),
          sameSite: normalizeSameSite(parsed.SameSite),
        };

        if (parsed.refreshToken) {
          cookieStore.set("refreshToken", parsed.refreshToken, options);
        }

        if (parsed.accessToken) {
          cookieStore.set("accessToken", parsed.accessToken, options);
        }
      }
    }

    // 4. Повертаємо JSON з бекенду
    return NextResponse.json(backendRes.data);
  } catch (err: any) {
    console.error("Session check error:", err);

    return NextResponse.json(
      {
        error:
          err.response?.data?.error || err.message || "Session check failed",
      },
      { status: err.response?.status || 500 },
    );
  }
}
