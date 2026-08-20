import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { AxiosError } from "axios";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const apiRes = await api.patch(`/listing/${params.id}/view`);

    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    const status = error.response?.status ?? 500;
    const message =
      error.response?.data?.message ?? "Failed to increment views";

    return NextResponse.json({ error: message }, { status });
  }
}
