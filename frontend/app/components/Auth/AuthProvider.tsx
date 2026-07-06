"use client";

import { useAuthStore } from "@/app/store/useAuthState";
import { useEffect } from "react";

export function AuthProvider() {
  const fetchMe = useAuthStore((s) => s.fetchMe);

  useEffect(() => {
    fetchMe();
  }, []);

  return null;
}
