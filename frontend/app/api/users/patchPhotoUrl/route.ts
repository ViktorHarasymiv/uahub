import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  // ВАЖЛИВО: НЕ розбираємо FormData
  const body = request.body;

  const res = await fetch("http://localhost:1997/api/users/photo", {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body, // ← передаємо оригінальний multipart/form-data
  });

  const data = await res.json();
  return NextResponse.json(data);
}
