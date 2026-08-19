import axios from "axios";
import type { AxiosError } from "axios";

import { RegisterRequest, LoginRequest, User } from "@/app/types/auth";

const NEXT_PUBLIC_DOMEN = process.env.NEXT_PUBLIC_DOMEN;

export const nextServer = axios.create({
  baseURL: `${NEXT_PUBLIC_DOMEN}`,
  withCredentials: true, // дозволяє axios працювати з cookie
});

// AUTH

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};

export const checkEmail = async (email: string) => {
  const res = await nextServer.get("/auth/check-email", {
    params: { email },
  });

  return res.data; // { exists: boolean }
};

export const login = async (data: LoginRequest) => {
  try {
    const res = await nextServer.post("/auth/login", data);

    return {
      success: true,
      data: res.data,
    };
  } catch (error: unknown) {
    const err = error as AxiosError<{ message?: string }>;

    return {
      success: false,
      message: err.response?.data?.message || "Помилка авторизації",
      status: err.response?.status || 500,
    };
  }
};

// DELETE

export const deleteAccount = async () => {
  const res = await nextServer.delete("/auth/delete");

  return {
    success: true,
    data: res.data,
  };
};

// PATCH

export const editProfile = async (data: User) => {
  const res = await nextServer.patch("/users", data);
  return res.data;
};

export const uploadPhoto = async (formData: FormData) => {
  const res = await nextServer.patch("/users/photo", formData);
  return res.data;
};

// LOGOUT

export const logout = async () => {
  await nextServer.post("/auth/logout", {}, { withCredentials: true });
};

export const getMe = async () => {
  const res = await nextServer.get("/auth/me");
  return res.data;
};

// RERFRESH SESSION

export const refreshSession = async () => {
  const res = await nextServer.post("/auth/refresh", {});

  return res.data;
};

// SESSION

export const checkServerSession = async () => {
  const res = await nextServer.get("/auth/session");

  return res.data;
};

// LISTING

export const getAllListings = async () => {
  const res = await nextServer.get("/listing/all");
  return res.data;
};

export const getListingById = async (id: string) => {
  const res = await nextServer.get(`/listing/${id}`);
  return res.data;
};

export const createListing = async (formData: FormData) => {
  const res = await nextServer.post("/listing/create", formData);

  return res;
};

export const getJobListings = async (params = {}) => {
  const query = new URLSearchParams(params).toString();

  const url = query ? `/listing/robota?${query}` : `/listing/robota`;

  const res = await nextServer.get(url);
  return res.data;
};

// CATEGORIES

// GET /categories/all

export const getAllCategories = async () => {
  const res = await nextServer.get("/categories/all");
  return res.data;
};

// GET /categories/:slug

export const getCategoryBySlug = async (slug: string) => {
  const res = await nextServer.get(`/categories/${slug}`);
  return res.data;
};

// GET /categories/:slug/children

export const getSubcategories = async (slug: string) => {
  const res = await nextServer.get(`/categories/${slug}/children`);
  return res.data;
};

// RESET PASSWORD

export async function sendResetEmail(email: string) {
  const res = await nextServer.post(`/auth/request-reset-email`, { email });
  return res;
}

export async function sendResetPassword(token: string, password: string) {
  const res = await nextServer.post(`/auth/reset-password`, {
    token,
    password,
  });
  return res;
}

export async function sendChangePassword(
  oldPassword: string,
  newPassword: string,
) {
  try {
    const res = await nextServer.post("/auth/change-password", {
      oldPassword,
      newPassword,
    });

    return { success: true, data: res.data };
  } catch (error: unknown) {
    const err = error as AxiosError<{ message?: string }>;

    return {
      success: false,
      message: err.response?.data?.message || "Błąd zmiany hasła",
      status: err.response?.status || 500,
    };
  }
}

// CHANGE E-MAIL

export const changeEmailRequest = async (newEmail: string) => {
  try {
    const res = await nextServer.post("/auth/change-email/request", {
      newEmail,
    });
    return { success: true, data: res.data };
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    return {
      success: false,
      message: err.response?.data?.message ?? "Błąd zmiany e-mail",
    };
  }
};

export const changeEmailConfirm = async (token: string) => {
  try {
    const res = await nextServer.get(
      `/auth/change-email/confirm?token=${token}`,
    );

    return { success: true, data: res.data };
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;

    return {
      success: false,
      message: err.response?.data?.message ?? "Błąd potwierdzenia e-mail",
    };
  }
};
