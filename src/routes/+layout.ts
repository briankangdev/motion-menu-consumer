import { browser } from "$app/environment";
import analytics from "$lib/analytics";
import "$lib/i18n";
import { locale, waitLocale } from "svelte-i18n";

export const load = async () => {
  if (browser) {
    locale.set(window.navigator.language);
  }

  await analytics.init({ cross_subdomain_cookie: false });
  await waitLocale();
};
