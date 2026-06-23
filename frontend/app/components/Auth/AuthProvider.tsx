"use client";

import { useAuthStore } from "@/app/store/useAuthState";
import { useEffect } from "react";

export function AuthProvider() {
  const fetchMe = useAuthStore((s) => s.fetchMe);
  const isAuth = useAuthStore((s) => s.isAuth);

  console.log(isAuth);

  useEffect(() => {
    if (!isAuth) {
      fetchMe();
    } else return;
  }, []);

  return null;
}
