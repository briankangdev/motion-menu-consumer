import { writable } from "svelte/store";
import type { ICompany } from "src/api/company";

export const company = writable<ICompany>(null);
