import { browser } from "$app/environment";
import { register, init, getLocaleFromQueryString } from "svelte-i18n";

const defaultLocale: string = "en";

register("en", () => import("./translation/en.json"));
register("es", () => import("./translation/es.json"));

init({
  fallbackLocale: "en",
  initialLocale:
    getLocaleFromQueryString("lang") ||
    (browser ? (window.navigator.language as string) : defaultLocale),
});
