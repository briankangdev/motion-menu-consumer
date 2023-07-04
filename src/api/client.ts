import axios, { AxiosHeaders } from "axios";
import type { AxiosInstance } from "axios";
import { env } from "$env/dynamic/public";
import { jwt_token } from "../stores/user_store";
import { get } from "svelte/store";

interface ICustomHeaders extends AxiosHeaders {
  Authorization?: string;
}

const client: AxiosInstance = axios.create({
  baseURL: env.PUBLIC_MOTION_MENU_API_ENDPOINT,
});

client.interceptors.request.use((config) => {
  const custom_headers = config.headers as ICustomHeaders;

  if (typeof window === "undefined") return config; // if server side, don't add token

  let token = get(jwt_token);
  console.log("token", token);

  if (token) {
    custom_headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default client;
