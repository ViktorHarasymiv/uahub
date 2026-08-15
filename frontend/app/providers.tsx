"use client";

import { useEffect } from "react";
import { useCategoriesStore } from "./store/useCategoriesStore";
import { useListingsStore } from "./store/useListingStore";

export function Providers({ children }: { children: React.ReactNode }) {
  const loadCategories = useCategoriesStore((s) => s.loadCategories);
  const { getAllListings } = useListingsStore();

  useEffect(() => {
    loadCategories();
    getAllListings();
  }, []);

  return <>{children}</>;
}
