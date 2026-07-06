import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "../../api"; // твій axios nextServer
import { parse } from "cookie";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const backendRes = await api.get("auth/session", {
      headers: { Cookie: cookieHeader },
      withCredentials: true,
    });

    const response = NextResponse.json(backendRes.data);

    const setCookie = backendRes.headers["set-cookie"];
    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);

        if (parsed.accessToken) {
          response.cookies.set("accessToken", parsed.accessToken, {
            path: parsed.Path || "/",
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: Number(parsed["Max-Age"]),
          });
        }

        if (parsed.refreshToken) {
          response.cookies.set("refreshToken", parsed.refreshToken, {
            path: parsed.Path || "/",
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: Number(parsed["Max-Age"]),
          });
        }
      }
    }

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { error: err.response?.data?.error || err.message },
      { status: err.response?.status || 500 },
    );
  }
}
