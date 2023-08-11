import { writable } from "svelte/store";
import type { ICompany } from "./company";

export interface IProfile extends ICompany {
  time_zone: string;
  subscription_status: string;
  subscription_plan_id: string;
  subscription_id: string;
  locale: string;
  subscription_plan: string;
  review_enabled: boolean;
  is_new_account: boolean;
}

export interface IProfileIds {
  name: string;
  email: string;
}

export const profile_ids = writable<IProfileIds>(null);

export const profile = writable<IProfile>(null);
