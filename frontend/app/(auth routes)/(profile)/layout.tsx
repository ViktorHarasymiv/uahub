"use client";

import AsideNav from "@/app/components/Profile/AsideNav/AsideNav";
import { useWindowWidth } from "@/app/hook/useWindowWidth";

import PrivateRoute from "@/app/components/PrivateRoute/PrivateRoute";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const width = useWindowWidth();

  return (
    <PrivateRoute>
      <div className="container rotate_page">
        {/* Бокова панель */}
        {width > 767 && <AsideNav />}
        <div className="layout">{children}</div>
      </div>
    </PrivateRoute>
  );
}
