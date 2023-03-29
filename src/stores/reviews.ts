import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { ICompany } from "./company";

export interface IReview {
  id: number;
  body: string;
  status: string;
  company_id: ICompany["id"];
  created_at: string;
  updated_at: string;
  featured: boolean;
  user: {
    id: string;
    name: string;
    email: string | null;
  };
}

interface IReviewDictionary {
  [key: string]: IReview;
}

export const dic: Writable<IReviewDictionary> = writable({});
