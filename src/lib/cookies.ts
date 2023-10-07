import Cookies from "js-cookie";
import { PUBLIC_COOKIES_DOMAIN } from "$env/dynamic/public";

export default Cookies.withAttributes({ domain: PUBLIC_COOKIES_DOMAIN });
