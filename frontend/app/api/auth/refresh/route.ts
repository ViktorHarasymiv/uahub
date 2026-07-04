import { NextRequest, NextResponse } from "next/server";
import { api, ApiError } from "../../api";
import { cookies } from "next/headers";

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

    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 2,
    });

    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    cookieStore.set("sessionId", sessionId, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({
      accessToken,
      refreshToken,
      sessionId,
      userId,
    });
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
