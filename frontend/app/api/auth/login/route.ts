// app/api/auth/login/route.ts

import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { AxiosError } from "axios";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiRes = await api.post("/auth/login", body);

    // НЕ ставимо куки тут!
    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    const status = error.response?.status ?? 500;
    const message = error.response?.data?.message ?? "Login failed";

    return NextResponse.json({ error: message }, { status });
  }
}
