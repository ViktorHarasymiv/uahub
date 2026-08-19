import { api } from "@/app/api/api";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { newEmail } = await req.json();

  const res = await api.post("/auth/change-email/request", {
    newEmail,
  });

  return NextResponse.json(res.data, { status: res.status });
}
