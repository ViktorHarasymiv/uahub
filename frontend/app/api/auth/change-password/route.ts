import { NextResponse } from "next/server";
import { api } from "../../api";

export async function POST(req: Request) {
  try {
    const { oldPassword, newPassword } = await req.json();

    if (!oldPassword || !newPassword) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const res = await api.post("/auth/change-password", {
      oldPassword,
      newPassword,
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error("Unknown error");

    return NextResponse.json(
      { message: "Server error", error: err.message },
      { status: 500 },
    );
  }
}
