import axios from "axios";

import { RegisterRequest, LoginRequest, User } from "@/app/types/auth";

export const nextServer = axios.create({
  baseURL: "http://localhost:1997/api",
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
  return res.data;
};

export const fetchMe = async () => {
  const res = await nextServer.get("/auth/me");
  console.log(res);

  return res.data;
};
