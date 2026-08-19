import { NextResponse } from "next/server";
import { api } from "../../api";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { message: "Missing token or password" },
        { status: 400 },
      );
    }

    const res = await api.post("/auth/reset-password", { token, password });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error("Unknown error");
    console.error("reset-password proxy error:", err);

    return NextResponse.json(
      { message: "Server error", error: err.message },
      { status: 500 },
    );
  }
}
