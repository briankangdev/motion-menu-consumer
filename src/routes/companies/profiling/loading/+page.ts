import { loadProfile } from "../../../../services/private/companies/profile_service";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
  console.debug("Loading profile");
  const data = await loadProfile();

  return { slug: data.slug };
};
