import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { AxiosError } from "axios";

export async function POST(req: NextRequest) {
  try {
    const incoming = await req.formData();

    // Axios не може напряму прийняти native FormData з Next.js,
    // тому створюємо новий FormData і переносимо всі поля.
    const formData = new FormData();

    for (const [key, value] of incoming.entries()) {
      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    }

    const apiRes = await api.post("/listing/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return NextResponse.json(apiRes.data, { status: apiRes.status });
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    const status = error.response?.status ?? 500;
    const message = error.response?.data?.message ?? "Listing creation failed";

    return NextResponse.json({ error: message }, { status });
  }
}
