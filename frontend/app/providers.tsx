"use client";

import { useEffect } from "react";
import { useCategoriesStore } from "./store/useCategoriesStore";
import { useListingsStore } from "./store/useListingStore";
import { useLocationStore } from "./store/useLocationStore";

export function Providers({ children }: { children: React.ReactNode }) {
  const loadCategories = useCategoriesStore((s) => s.loadCategories);
  const { getAllListings, getListingsByCategory } = useListingsStore();
  const { fetchLocation } = useLocationStore();

  useEffect(() => {
    loadCategories();
    getAllListings();
    getListingsByCategory();
    fetchLocation();
  }, []);

  return <>{children}</>;
}
