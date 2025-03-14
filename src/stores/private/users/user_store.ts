import { writable, type Writable } from "svelte/store";

type Nullable<T> = T | undefined | null;

export const email: Writable<Nullable<string>> = writable();

export const name: Writable<Nullable<string>> = writable();

