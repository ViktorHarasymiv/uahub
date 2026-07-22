import { create } from "zustand";
import {
  getMe,
  login,
  register,
  refreshSession,
  checkServerSession,
  logout,
} from "../lib/api/api";
import { User } from "../types/auth";

interface AuthState {
  user: User | null;
  isAuth: boolean;
  loading: boolean;
  error: string | null;

  register: (data: { email: string; password: string }) => Promise<boolean>;
  login: (data: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => Promise<boolean>;
  logout: () => Promise<void>;
  fetchMe: () => Promise<boolean>;
  fetchData: () => Promise<boolean>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuth: false,
  loading: true,
  error: null,

  clearError: () => set({ error: null }),

  register: async (data) => {
    try {
      set({ loading: true });

      await register(data); // axios service

      set({ loading: false });

      return true; // реєстрація успішна
    } catch (err) {
      set({ error: "Error", loading: false });
      return false; // реєстрація неуспішна
    }
  },

  login: async (data) => {
    try {
      set({ loading: true });

      const ok = await login(data); // axios POST /auth/login

      if (!ok) {
        set({ loading: false });
        return false;
      }

      // 🔥 одразу тягнемо юзера
      const meOk = await get().fetchData();

      set({ loading: false });

      return meOk; // повертаємо true якщо юзер підтягнувся
    } catch (err) {
      set({ error: "Error", loading: false });
      return false;
    }
  },

  logout: async () => {
    await logout();
    set({ isAuth: false, user: null });
  },

  fetchMe: async () => {
    set({ loading: true });

    try {
      const check = await checkServerSession();

      if (check?.valid) {
        const data = await getMe();
        if (!data) {
          set({ isAuth: false, user: null });
          return false;
        }

        set({ isAuth: true, user: data.user });
        return true;
      }

      const refreshed = await refreshSession();

      if (!refreshed?.accessToken) {
        await logout();
        set({ isAuth: false, user: null });
        return false;
      }

      const user = await getMe();

      if (!user) {
        set({ isAuth: false, user: null });
        return false;
      }

      set({ isAuth: true, user });
      return true;
    } catch {
      set({ isAuth: false, user: null });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  fetchData: async () => {
    set({ loading: true });

    try {
      const res = await getMe();

      if (!res || !res.user) {
        set({ user: null, isAuth: false });
        return false;
      }

      set({ user: res.user, isAuth: true });
      return true;
    } catch {
      set({ user: null, isAuth: false });
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));
