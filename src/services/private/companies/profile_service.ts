// ProfileService

// Store update
// API communication
// Tracking logic
// import mixpanel from "mixpanel-browser";
import { profile_data } from "../../../stores/private/companies/profile";
import { show } from "../../../api/private/companies/profile";

export type CompanyCategory =
  | "empty"
  | "pizza"
  | "coffee"
  | "hamburger"
  | "saigon";

  export async function loadProfile() {
    const data = await show();
    profile_data.update((prev) => ({ ...prev, ...data }));

    return data;
  }
   