import { browser } from "$app/environment";
import analytics from "$lib/analytics";
import "$lib/i18n";
import { locale, waitLocale } from "svelte-i18n";
import { getProfile } from "../services/profile_service";

export const load = async ({ data: { cookies } }) => {
  const { uid, client_id, access_token, is_authenticated } = cookies;

  if (browser) {
    locale.set(window.navigator.language);
  }

  if (is_authenticated) {
    await getProfile(uid, client_id, access_token);
  }

  await analytics.init({ cross_subdomain_cookie: false });
  await analytics.setUserId();
  await waitLocale();
};
