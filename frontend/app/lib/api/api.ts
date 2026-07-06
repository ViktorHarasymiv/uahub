import axios from "axios";
import { RegisterRequest, LoginRequest, User } from "@/app/types/auth";

const DOMEN = process.env.DOMEN;

export const nextServer = axios.create({
  baseURL: `${DOMEN}/api`,
  withCredentials: true, // дозволяє axios працювати з cookie
});

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
  const res = await nextServer.post("/auth/login", data);

  return { success: true, data: res.data };
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
  const res = await nextServer.post(
    "/auth/refresh",
    {},
    {
      withCredentials: true,
    },
  );

  return res.data;
};

// SESSION

export const checkServerSession = async () => {
  const res = await nextServer.get("/auth/session");

  return res.data;
};
