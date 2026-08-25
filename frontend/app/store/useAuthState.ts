import { create } from "zustand";
import { getMe, login, register, logout, deleteAccount } from "../lib/api/api";
import { User } from "../types/auth";
import toast from "react-hot-toast";

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
  deleteAccount: () => Promise<boolean>;
  logout: () => Promise<void>;
  fetchMe: () => void;
  fetchData: () => void;
  clearError: () => void;
}

const preview =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("userPreview") || "null")
    : null;

export const useAuthStore = create<AuthState>((set, get) => ({
  user: preview,
  isAuth: !!preview,
  loading: true,
  error: null,

  clearError: () => set({ error: null }),

  register: async (data) => {
    try {
      set({ loading: true });
      await register(data);
      set({ loading: false });
      return true;
    } catch {
      set({ error: "Error", loading: false });
      return false;
    }
  },

  login: async (data) => {
    try {
      set({ loading: true, error: null });

      const res = await login(data);

      if (!res.success) {
        toast.error(res.message ?? "Wystąpił błąd");
        set({ error: res.message, loading: false });
        return false;
      } else {
        toast.success(res.data.message);
        get().fetchMe();
      }

      return true;
    } catch {
      set({ error: "Помилка логіну", loading: false });
      return false;
    }
  },

  logout: async () => {
    await logout();
    localStorage.removeItem("userPreview");
    set({ isAuth: false, user: null });
  },

  deleteAccount: async () => {
    try {
      const res = await deleteAccount();
      if (res.data.status === 200) {
        get().logout();
        localStorage.removeItem("userPreview");
        return true;
      }
      return false;
    } catch {
      return false;
    }
  },

  fetchMe: async () => {
    set({ loading: true });

    try {
      const data = await getMe();

      if (!data || !data.user) {
        localStorage.removeItem("userPreview");
        set({ user: null, isAuth: false });
        return false;
      }

      localStorage.setItem(
        "userPreview",
        JSON.stringify({
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          photoUrl: data.user.photoUrl,
          _id: data.user._id,
        }),
      );

      set({ user: data.user, isAuth: true });
      return true;
    } catch {
      set({ user: null, isAuth: false });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  fetchData: async () => {
    return get().fetchMe();
  },
}));
