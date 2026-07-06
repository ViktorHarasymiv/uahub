// app/api/api.ts

import axios, { AxiosError } from "axios";
import { useAuthStore } from "../store/useAuthState";

export type ApiError = AxiosError<{ error: string }>;

export const api = axios.create({
  baseURL: "http://localhost:1997",
  withCredentials: true, // також додаємо цей параметр
});

// -----------------------------
// GLOBAL RESPONSE INTERCEPTOR
// -----------------------------
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        // const res =
        await api.post("/auth/refresh", {}, { withCredentials: true });

        // const newAccessToken = refreshed.data.accessToken;
        // useAuthStore.getState().setAccessToken(newAccessToken);

        // original.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(original);
      } catch (err) {
        useAuthStore.getState().logout();
        window.location.href = "/sign-in";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);
