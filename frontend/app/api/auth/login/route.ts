// app/api/auth/login/route.ts

import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { AxiosError } from "axios";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiRes = await api.post("/auth/login", body);

    const { accessToken, refreshToken, sessionId } = apiRes.data.data;

    const response = NextResponse.json(apiRes.data, { status: apiRes.status });

    // Ставимо куки напряму
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 900,
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 3600,
    });

    response.cookies.set("sessionId", sessionId, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 3600,
    });

    return response;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    const status = error.response?.status ?? 500;
    const message = error.response?.data?.message ?? "Login failed";

    return NextResponse.json({ error: message }, { status });
  }
}
