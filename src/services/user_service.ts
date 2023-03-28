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
import {
  is_authenticated,
  jwt_token,
  sub,
  exp,
  iss,
  email,
  name,
  popup_opened,
  storage_token_name,
  storage_expiration_date_name,
} from "../stores/user_store";
import { get } from "svelte/store";

export type UserType = User;

class User {
  private static instance: User;
  private client: Auth0Client;

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

    const token = localStorage.getItem(storage_token_name);
    const expiration_date = localStorage.getItem(storage_expiration_date_name);

    if (token && expiration_date) {
      // if token and expiration date are in local storage then check if token is valid
      const expirationDate = new Date(expiration_date);
      if (expirationDate > new Date()) {
        // if token is valid then update store and storage
        jwt_token.set(token);
        exp.set((expirationDate.getTime() - new Date().getTime()) / 1000);
        is_authenticated.set(true);
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

    popup_opened.set(true);

    try {
      await this.client.loginWithPopup(options);
      await this.updateStore();
      await this.updateStorage();
      popup_opened.set(false);

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
    const expiration = await this.client.getIdTokenClaims().then((claims) => {
      return claims.exp;
    });

    if (!user || !token || !expiration) {
      throw new Error("User, token or expiration date not found");
    }

    is_authenticated.set(true);
    jwt_token.set(token);
    sub.set(user?.sub);
    iss.set(user?.iss);
    exp.set(expiration);
    email.set(user?.email);
    name.set(user?.name);
  }

  private async updateStorage() {
    const token = get(jwt_token);
    const expiration = get(exp);

    if (!expiration) throw new Error("Expiration date not found");
    if (!token) throw new Error("JWT token not found");

    localStorage.setItem(storage_token_name, token);
    localStorage.setItem(
      storage_expiration_date_name,
      new Date(expiration * 1000).toISOString()
    );
  }

  private async clearStore() {
    is_authenticated.set(false);
    jwt_token.set(undefined);
    sub.set(undefined);
    iss.set(undefined);
    exp.set(undefined);
    email.set(undefined);
    name.set(undefined);
  }

  private async clearStorage() {
    localStorage.removeItem(storage_token_name);
    localStorage.removeItem(storage_expiration_date_name);
  }
}

export const user = User;
