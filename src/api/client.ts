import axios, { AxiosHeaders } from "axios";
import type { AxiosInstance } from "axios";
import { env } from "$env/dynamic/public";
import { storage_token_name } from "../stores/user_store";

interface ICustomHeaders extends AxiosHeaders {
  Authorization?: string;
}

const client: AxiosInstance = axios.create({
  baseURL: env.PUBLIC_MOTION_MENU_API_ENDPOINT,
});

client.interceptors.request.use((config) => {
  const custom_headers = config.headers as ICustomHeaders;

  if (typeof window === "undefined") return config; // if server side, don't add token
  const token = localStorage.getItem(storage_token_name);
  if (token) {
    custom_headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;
