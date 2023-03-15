import { browser } from "$app/environment";
import {
  PUBLIC_AUTH0_DOMAIN,
  PUBLIC_AUTH0_APP_CLIENT_ID,
} from "$env/static/public";
import {
  type Auth0Client,
  createAuth0Client,
  type PopupLoginOptions,
} from "@auth0/auth0-spa-js";
import { writable, type Writable } from "svelte/store";

type Nullable<T> = T | undefined | null;

class User {
  private static instance: User;
  private client: Auth0Client;

  private storage_token_name = "motionMenu_jwtToken";
  private storage_expiration_date_name = "motionMenu_expiration_date";

  is_authenticated: Writable<Nullable<boolean>> = writable();
  jwt_token: Writable<Nullable<string>> = writable();
  sub: Writable<Nullable<string>> = writable();
  exp: Writable<Nullable<number>> = writable();
  iss: Writable<Nullable<string>> = writable();
  email: Writable<Nullable<string>> = writable();
  name: Writable<Nullable<string>> = writable();

  private constructor() {
    if (browser) {
      this.init();
    }
  }

  public static async getInstance(): Promise<User> {
    if (!User.instance) {
      User.instance = new User();
    }

    return User.instance;
  }

  private async createClient() {
    const domain = PUBLIC_AUTH0_DOMAIN;
    const clientId = PUBLIC_AUTH0_APP_CLIENT_ID;
    const authorizationParams = {
      audience: "https://motion.menu",
      scope: "profile read:reviews",
    };

    if (domain == undefined || clientId == undefined) {
      throw new Error("Auth0 values not loaded");
    }

    try {
      this.client = await createAuth0Client({
        domain,
        clientId,
        authorizationParams,
      });
    } catch (e) {
      console.error(e);
    }
  }

  async init() {
    if (!this.client) {
      await this.createClient();
    }

    const token = localStorage.getItem(this.storage_token_name);
    const expiration_date = localStorage.getItem(
      this.storage_expiration_date_name
    );

    if (token && expiration_date) {
      // if token and expiration date are in local storage then check if token is valid
      const expirationDate = new Date(expiration_date);
      if (expirationDate > new Date()) {
        // if token is valid then update store and storage
        this.jwt_token.set(token);
        this.exp.set((expirationDate.getTime() - new Date().getTime()) / 1000);
        this.is_authenticated.set(true);
      } else {
        // if token is not valid then clear store and storage
        await this.clearStore();
        await this.clearStorage();
      }
    } else {
      // if token and expiration date are not in local storage then clear store and storage
      await this.clearStore();
      await this.clearStorage();
    }
  }

  async loginWithPopup(options?: PopupLoginOptions, callback?: () => void) {
    if (!this.client)
      throw new Error("Auth0 client must be innited before use that method");

    try {
      await this.client.loginWithPopup(options);
      await this.updateStore();
      await this.updateStorage();
      if (callback) {
        callback();
      }
    } catch (e) {
      console.error(e);
    }
  }

  async logout() {
    if (!this.client)
      throw new Error("Auth0 client must be innited before use that method");

    try {
      await this.client.logout();
      await this.clearStore();
      await this.clearStorage();
    } catch (e) {
      console.error(e);
    }
  }

  private async updateStore() {
    const user = await this.client.getUser();
    const token = await this.client.getTokenSilently();
    const exp = await this.client.getIdTokenClaims().then((claims) => {
      return claims.exp;
    });

    if (!user || !token || !exp) {
      throw new Error("User, token or expiration date not found");
    }

    this.is_authenticated.set(true);
    this.jwt_token.set(token);
    this.sub.set(user?.sub);
    this.iss.set(user?.iss);
    this.exp.set(exp);
    this.email.set(user?.email);
    this.name.set(user?.name);
  }

  private async updateStorage() {
    let exp: number;
    let token: string;

    this.exp.subscribe((value) => {
      exp = value;
    });

    this.jwt_token.subscribe((value) => {
      token = value;
    });

    if (!exp) throw new Error("Expiration date not found");
    if (!token) throw new Error("JWT token not found");

    localStorage.setItem(this.storage_token_name, token);
    localStorage.setItem(
      this.storage_expiration_date_name,
      new Date(exp * 1000).toISOString()
    );
  }

  private async clearStore() {
    this.is_authenticated.set(false);
    this.jwt_token.set(undefined);
    this.sub.set(undefined);
    this.iss.set(undefined);
    this.exp.set(undefined);
    this.email.set(undefined);
    this.name.set(undefined);
  }

  private async clearStorage() {
    localStorage.removeItem(this.storage_token_name);
    localStorage.removeItem(this.storage_expiration_date_name);
  }
}

export const user = await User.getInstance();
