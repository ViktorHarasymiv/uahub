import { NextResponse } from "next/server";
import { api } from "../../api";
import { AxiosError } from "axios";

export async function GET(req: Request, { params }: any) {
  try {
    const res = await api.get(`/categories/${params.slug}`);
    return NextResponse.json(res.data, { status: res.status });
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    const status = error.response?.status ?? 500;
    const message = error.response?.data?.message ?? "Failed to fetch category";

    return NextResponse.json({ error: message }, { status });
  }
}
