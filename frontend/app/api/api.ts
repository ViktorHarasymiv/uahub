// app/api/api.ts

import axios, { AxiosError } from "axios";

export type ApiError = AxiosError<{ error: string }>;

export const api = axios.create({
  baseURL: "http://localhost:1997",
  withCredentials: true, // також додаємо цей параметр
});
