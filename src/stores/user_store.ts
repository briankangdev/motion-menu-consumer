import { derived, writable, type Writable } from "svelte/store";

type Nullable<T> = T | undefined | null;

class UserStore {
  public is_authenticated: Writable<boolean> = writable(false);
  public jwt_token: Writable<Nullable<string>> = writable();
  public sub: Writable<Nullable<string>> = writable();
  public exp: Writable<Nullable<string>> = writable();
  public iss: Writable<Nullable<string>> = writable();

  public email: Writable<Nullable<string>> = writable();
  public name: Writable<Nullable<string>> = writable();

  public popup_opened: Writable<boolean> = writable(false);

  constructor() {}

  get user_id() {
    // sub is identical to the user id
    return derived(this.sub, ($sub) => $sub);
  }
}

export default new UserStore();
