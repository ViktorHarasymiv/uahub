"use client";

import { useEffect } from "react";
import { useCategoriesStore } from "./store/useCategoriesStore";

export function Providers({ children }: { children: React.ReactNode }) {
  const loadCategories = useCategoriesStore((s) => s.loadCategories);

  useEffect(() => {
    loadCategories();
  }, []);

  return <>{children}</>;
}
