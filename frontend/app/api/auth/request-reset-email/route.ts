import { NextResponse } from "next/server";
import { api } from "../../api";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 },
      );
    }

    const res = await api.post("/auth/request-reset-email", { email });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error("Unknown error");
    console.error("reset-email proxy error:", error);

    return NextResponse.json(
      { message: "Server error", error: err.message },
      { status: 500 },
    );
  }
}
