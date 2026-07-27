import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { parse } from "cookie";

export async function GET(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";

    const backendRes = await api.get("auth/session", {
      headers: {
        Cookie: cookieHeader,
      },
      withCredentials: true,
    });

    const response = NextResponse.json(backendRes.data);

    const setCookie = backendRes.headers["set-cookie"];

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);

        const [cookieName, cookieValue] = cookieStr.split(";")[0].split("=");

        response.cookies.set(cookieName, cookieValue, {
          path: parsed.Path || "/",
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: parsed["Max-Age"] ? Number(parsed["Max-Age"]) : undefined,
        });
      }
    }

    return response;
  } catch (err: any) {
    return NextResponse.json(
      {
        error: err.response?.data?.error || err.message,
      },
      { status: err.response?.status || 500 },
    );
  }
}
