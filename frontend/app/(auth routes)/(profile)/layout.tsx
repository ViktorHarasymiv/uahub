"use client";

import AsideNav from "@/app/components/Profile/AsideNav/AsideNav";
import { useWindowWidth } from "@/app/hook/useWindowWidth";
import { useRouter } from "next/navigation";

import { useEffect } from "react";
export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const width = useWindowWidth();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <div className="container rotate_page">
      {/* Бокова панель */}
      {width > 767 && <AsideNav />}
      <div className="layout">{children}</div>
    </div>
  );
}
