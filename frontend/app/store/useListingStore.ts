import { create } from "zustand";
import { getAllListings, nextServer } from "../lib/api/api";

export interface Listing {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  // додай свої поля
}

interface ListingsState {
  listings: Listing[];
  loading: boolean;
  error: string | null;

  getAllListings: () => Promise<void>;
  createListing: (formData: FormData) => Promise<void>;
}

export const useListingsStore = create<ListingsState>((set, get) => ({
  listings: [],
  loading: false,
  error: null,

  // GET ALL LISTINGS
  getAllListings: async () => {
    try {
      set({ loading: true, error: null });

      const res = await getAllListings();

      set({
        listings: res,
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Помилка завантаження оголошень",
        loading: false,
      });
    }
  },

  // CREATE LISTING
  createListing: async (formData: FormData) => {
    try {
      set({ loading: true, error: null });

      await nextServer.post("/listing/create", formData);

      // після створення — оновлюємо список
      await get().getAllListings();

      set({ loading: false });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Помилка створення оголошення",
        loading: false,
      });
    }
  },
}));
