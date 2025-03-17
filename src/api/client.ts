import axios, { AxiosHeaders } from "axios";
import type { AxiosInstance } from "axios";
import { PUBLIC_MOTION_MENU_API_ENDPOINT } from "$env/static/public";
import { getAccessToken, isAuthenticated } from "../services/auth_service";
import { browser } from "$app/environment";

interface ICustomHeaders extends AxiosHeaders {
  Authorization?: string;
}

const client: AxiosInstance = axios.create({
  baseURL: PUBLIC_MOTION_MENU_API_ENDPOINT,
});

client.interceptors.request.use(async (config) => {
  const custom_headers = config.headers as ICustomHeaders;

  if (!browser) return config; // if server side, don't add token

  if (await isAuthenticated()) {
    const access_token = await getAccessToken();
    custom_headers.Authorization = `Bearer ${access_token}`;
  }

  return config;
});

export default client;
