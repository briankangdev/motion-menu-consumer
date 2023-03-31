import { writable, derived } from "svelte/store";
import type { Writable } from "svelte/store";
import type { ICompany } from "./company";
import type { IResponseReviews } from "src/api/reviews";

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

export const reviews_data: Writable<IResponseReviews["data"]> = writable({});
export const reviews_meta: Writable<IResponseReviews["meta"]> = writable({});
export const reviews = derived(reviews_data, ($reviews_data) => {
  return Object.values($reviews_data).sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
});
