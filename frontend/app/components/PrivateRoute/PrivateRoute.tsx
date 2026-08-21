"use client";

import { useAuthStore } from "@/app/store/useAuthState";
import Loader from "@/app/ui/Loader/Loader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isAuth = useAuthStore((s) => s.isAuth);
  const loading = useAuthStore((s) => s.loading);

  useEffect(() => {
    if (!loading && !isAuth) {
      router.push("/");
    }
  }, [loading, isAuth, router]);

  if (loading) {
    return <Loader mode="fullscreen" />;
  }

  if (!isAuth) {
    return <Loader mode="fullscreen" />; // поки router.push робить редірект
  }

  return children;
}
