import { create } from "zustand";
import { getAllCategories, getSubcategories } from "../lib/api/api";
import { Category } from "../types/category";

export const useCategoriesStore = create<{
  categories: Category[];
  subcategories: Category[];
  selectedCategoryFields: Category["fields"];
  hasSubcategories: boolean;
  loadCategories: () => Promise<void>;
  loadSubcategories: (slug: string) => Promise<boolean>;
  setSelectedCategoryFields: (fields: Category["fields"]) => void;
}>((set) => ({
  categories: [],
  subcategories: [],
  selectedCategoryFields: [],
  hasSubcategories: false,

  loadCategories: async () => {
    const data = await getAllCategories();
    set({ categories: data });
  },

  loadSubcategories: async (slug: string) => {
    const data = await getSubcategories(slug);

    set({
      subcategories: data,
      hasSubcategories: data.length > 0,
    });

    return data.length > 0;
  },

  setSelectedCategoryFields: (fields) =>
    set({ selectedCategoryFields: fields }),
}));
