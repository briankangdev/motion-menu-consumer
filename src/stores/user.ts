import { writable } from "svelte/store";

interface IUser {
  likes: string[];
}

export const user = writable<IUser>(null);
