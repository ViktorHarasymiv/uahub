import { api } from "@/app/api/api";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("token");

  const res = await api.get(`/auth/change-email/confirm?token=${token}`);

  return NextResponse.json(res.data, { status: res.status });
}
