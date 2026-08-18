import { NextResponse } from "next/server";
import { api } from "../../api";
import { AxiosError } from "axios";

export async function DELETE() {
  try {
    const apiRes = await api.delete("/auth/delete");

    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    const status = error.response?.status ?? 500;
    const message =
      error.response?.data?.message ?? "Не вдалось видалити акаунт!";

    return NextResponse.json({ error: message }, { status });
  }
}
