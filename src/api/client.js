import axios from "axios";
import { env } from "$env/dynamic/public";

const client = axios.create({
  baseURL: env.PUBLIC_MOTION_MENU_API_ENDPOINT,
});

export default client;
