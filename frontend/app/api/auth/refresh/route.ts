import { NextRequest, NextResponse } from "next/server";
import { api, ApiError } from "../../api";

export async function POST(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get("cookie");

    const apiRes = await api.post(
      "auth/refresh",
      {},
      {
        headers: {
          Cookie: cookieHeader,
        },
        withCredentials: true,
      },
    );

    const { accessToken, refreshToken, sessionId, userId } = apiRes.data.data;

    const response = NextResponse.json({
      accessToken,
      refreshToken,
      sessionId,
      userId,
    });

    // Встановлюємо куки правильно
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 60 * 60 * 2,
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    response.cookies.set("sessionId", sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        error:
          (error as ApiError).response?.data?.error ??
          (error as ApiError).message,
      },
      { status: (error as ApiError).status },
    );
  }
}
