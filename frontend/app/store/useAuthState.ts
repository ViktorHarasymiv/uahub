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
  loading: false,
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
    try {
      set({ loading: true });

      // 1. Перевіряємо accessToken
      const check = await checkServerSession(); // GET /auth/session або /auth/check

      if (check?.valid) {
        // accessToken валідний → просто getMe()
        const data = await getMe();
        if (!data) {
          set({ isAuth: false, user: null });
          return false;
        }

        set({ isAuth: true, user: data.user });
        return true;
      }

      // 2. Якщо accessToken протух → пробуємо refresh
      const refreshed = await refreshSession();

      if (!refreshed?.accessToken) {
        // refreshToken протух → logout
        await logout();
        set({ isAuth: false, user: null });
        return false;
      }

      // 3. Після refresh → getMe()
      const user = await getMe();

      if (!user) {
        set({ isAuth: false, user: null });
        return false;
      }

      set({ isAuth: true, user });
      return true;
    } catch (err) {
      set({ isAuth: false, user: null });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  fetchData: async () => {
    try {
      const res = await getMe(); // axios GET /auth/me
      set({ user: res.user, isAuth: true });
      return true;
    } catch (err) {
      set({ user: null });
      return false;
    }
  },
}));
