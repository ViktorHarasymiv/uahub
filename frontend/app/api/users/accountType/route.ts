import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "../../api";

export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const { data } = await api.patch("users/account-type", body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("PATCH /users/account-type error:", error);
    return NextResponse.json(
      { error: "Failed to switch account type" },
      { status: 500 },
    );
  }
}
