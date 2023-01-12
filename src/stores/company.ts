import { writable } from "svelte/store";

export interface ICompany {
  id: number;
  email: string;
  name: string;
  description: string;
  instagram: string;
  short_description: string;
  slug: string;
  tag_priority: string;
}

export type CompanySlug = ICompany["name"];

export const company = writable<ICompany>(null);
