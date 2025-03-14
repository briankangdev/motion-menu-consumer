import { writable } from "svelte/store";
import type { ICompany } from "../../public/companies";

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

export interface IProfileData {
  id: number;
  email: string;
  name: string;
  address: string;
  street_number: string;
  street_name: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  view_count: number;
  schedule: string;
  time_zone: string;
  description: string;
  provider: string;
  uid: string;
  phone: string;
  short_description: string;
  reference: string;
  established: string;
  images_count: number;
  slug: string;
  tag_priority: number;
  subscription_status: string;
  subscription_plan_id: string;
  subscription_id: string;
  locale: string;
  features: number;
}

export const profile_data = writable<IProfileData>(null);

export const profile = writable<IProfile>(null);
