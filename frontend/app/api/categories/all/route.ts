import { NextResponse } from "next/server";
import { api } from "../../api";
import { AxiosError } from "axios";

export async function GET() {
  try {
    const res = await api.get("/categories/all");
    return NextResponse.json(res.data, { status: res.status });
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    const status = error.response?.status ?? 500;
    const message =
      error.response?.data?.message ?? "Failed to fetch categories";

    return NextResponse.json({ error: message }, { status });
  }
}
