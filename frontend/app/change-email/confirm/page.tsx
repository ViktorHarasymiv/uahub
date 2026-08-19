"use client";

import { changeEmailConfirm } from "@/app/lib/api/api";
import { useEffect, useState } from "react";

export default function ConfirmEmailPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    const run = async () => {
      if (!token) {
        setStatus("error");
        return;
      }

      const res = await changeEmailConfirm(token);

      if (!res.success) {
        setStatus("error");
        return;
      }

      setStatus("success");
    };

    run();
  }, []);

  if (status === "loading") return <p>Ładowanie...</p>;
  if (status === "error") return <p>Błąd potwierdzenia</p>;
  if (status === "success") return <p>Email został zmieniony pomyślnie</p>;

  return <p>Спробуйте ще раз</p>;
}
