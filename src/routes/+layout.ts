import { browser } from "$app/environment";
import analytics from "$lib/analytics";
import { handleAuthRedirectCallback } from "../services/auth_service";
import "$lib/i18n";
import { locale, waitLocale } from "svelte-i18n";

export const load = async () => {  
  if (browser) {
    locale.set(window.navigator.language);
    // Handle Auth0 authentication callback
    await handleAuthRedirectCallback();
  }

  await analytics.init({ cross_subdomain_cookie: false });
  await analytics.setUserId();
  await waitLocale();
};
