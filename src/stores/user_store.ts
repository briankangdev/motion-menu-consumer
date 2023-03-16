import { writable, type Writable } from "svelte/store";
import type { user as user_service } from "../services/user_service";

type Nullable<T> = T | undefined | null;

export const user: Writable<Nullable<typeof user_service>> = writable(null);
export const is_authenticated: Writable<Nullable<boolean>> = writable();
export const jwt_token: Writable<Nullable<string>> = writable();
export const sub: Writable<Nullable<string>> = writable();
export const exp: Writable<Nullable<number>> = writable();
export const iss: Writable<Nullable<string>> = writable();
export const email: Writable<Nullable<string>> = writable();
export const name: Writable<Nullable<string>> = writable();
export const popup_opened: Writable<boolean> = writable(false);
export const storage_token_name = "motion_menu_jwt_token";
export const storage_expiration_date_name = "motion_menu_expiration_date";
