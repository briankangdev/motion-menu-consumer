import { writable } from "svelte/store";

interface ICompany {
  name?: string;
}

export const company = writable<ICompany>({});
