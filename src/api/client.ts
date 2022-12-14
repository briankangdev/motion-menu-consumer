import axios from "axios";
import type { AxiosInstance } from "axios";
import { env } from "$env/dynamic/public";

const client: AxiosInstance = axios.create({
  baseURL: env.PUBLIC_MOTION_MENU_API_ENDPOINT,
});

export default client;
