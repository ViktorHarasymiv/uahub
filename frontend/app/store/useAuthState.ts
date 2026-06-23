import { create } from "zustand";
import { fetchMe, login, register } from "../lib/api";
import { User } from "../types/auth";
import { log } from "console";

interface AuthState {
  user: User | null;
  isAuth: boolean;
  loading: boolean;
  error: string | null;

  register: (data: { email: string; password: string }) => Promise<boolean>;
  login: (data: { email: string; password: string }) => Promise<boolean>;
  logout: () => Promise<void>;
  fetchMe: () => Promise<boolean>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuth: false,
  loading: false,
  error: null,

  clearError: () => set({ error: null }),

  register: async (data) => {
    try {
      set({ loading: true });

      await register(data); // axios service

      set({ loading: false });

      return true; // реєстрація успішна
    } catch (err: any) {
      set({ error: err.response?.data?.error || err.message, loading: false });
      return false; // реєстрація неуспішна
    }
  },

  login: async (data) => {
    try {
      set({ loading: true });

      const user = await login(data); // axios already returns res.data

      set({
        user,
        isAuth: true,
        loading: false,
      });

      return true;
    } catch (err: any) {
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
      });

      return false;
    }
  },

  logout: async () => {
    try {
      await fetch("http://localhost:5000/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      set({ user: null, isAuth: false });
    } catch (err) {
      console.log(err);
    }
  },

  fetchMe: async () => {
    try {
      set({ loading: true });

      const res = await fetchMe();

      console.log(res.user);

      set({
        user: res.user,
        isAuth: true,
        loading: false,
      });

      return true;
    } catch (err) {
      set({
        user: null,
        isAuth: false,
        loading: false,
      });

      return false;
    }
  },
}));
