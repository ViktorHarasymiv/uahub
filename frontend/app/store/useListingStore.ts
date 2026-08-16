import { create } from "zustand";
import { getAllListings, getJobListings, nextServer } from "../lib/api/api";

export interface Listing {
  _id: string;
  photos: string[];
  fields: {
    title: string;
    description: string;
    price?: number;
    salary?: string;
    location?: string;
  };
  createdAt: string;
  // додай свої поля
}

interface ListingsState {
  listings: Listing[];
  listingsJob: Listing[];
  loading: boolean;
  error: string | null;

  getAllListings: () => Promise<void>;
  getListingsByCategory: () => Promise<void>;
  createListing: (formData: FormData) => Promise<void>;
}

export const useListingsStore = create<ListingsState>((set, get) => ({
  listings: [],
  listingsJob: [],
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

  getListingsByCategory: async (params = {}) => {
    try {
      set({ loading: true, error: null });

      const res = await getJobListings(params);

      console.log(res);

      set({
        listingsJob: res.items || res,
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Помилка завантаження категорії",
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
