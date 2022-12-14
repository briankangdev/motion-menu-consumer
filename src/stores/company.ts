import { writable } from "svelte/store";
import type { IProfile } from "src/api/profile";

export const company = writable<IProfile>(null);
