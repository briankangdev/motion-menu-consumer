import type { IProduct } from "../../public/products";
import { writable } from "svelte/store";

export interface IUser {
  likes: IProduct["id"][];
  distinct_id: string;
}

export const user = writable<IUser>(null);
