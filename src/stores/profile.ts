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

export interface IProfileData {
  id: number;
  email: string;
  name: string;
  guest_order_enabled: boolean;
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
  latitude: number;
  longitude: number;
  pos_enabled: boolean;
  provider: string;
  uid: string;
  number_of_seats: number;
  phone: string;
  facebook: string;
  contact_email: string;
  responsible_phone: string;
  responsible_name: string;
  responsible_age: number;
  responsible_email: string;
  rating_count: number;
  allow_password_change: boolean;
  instagram: string;
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
