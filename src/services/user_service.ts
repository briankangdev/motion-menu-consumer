import {
  PUBLIC_AUTH0_DOMAIN,
  PUBLIC_AUTH0_APP_CLIENT_ID,
} from "$env/static/public";
import {
  type Auth0Client,
  createAuth0Client,
  type PopupLoginOptions,
} from "@auth0/auth0-spa-js";
import { popup_opened } from "../stores/user_store";

class User {
  private static instance: User;
  private client: Auth0Client;

  private storage_token_name = "motionMenu_jwtToken";
  private storage_expiration_date_name = "motionMenu_expiration_date";

  isAuthenticated: boolean = false;
  jwtToken: string | undefined = undefined;
  sub: string | undefined = undefined;
  iss: string | undefined = undefined;
  exp: number | undefined = undefined;
  email: string | undefined = undefined;
  name: string | undefined = undefined;

  private constructor() {}

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

    this.client = await createAuth0Client({
      domain,
      clientId,
      authorizationParams,
    });
  }

  async init() {
    if (!this.client) {
      await this.createClient();
    } else {
      throw new Error("Auth0 client already innited");
    }

    const token = localStorage.getItem(this.storage_token_name);
    const expiration_date = localStorage.getItem(
      this.storage_expiration_date_name
    );

    if (token && expiration_date) {
      const expirationDate = new Date(expiration_date);
      if (expirationDate > new Date()) {
        this.jwtToken = token;
        this.exp = (expirationDate.getTime() - new Date().getTime()) / 1000;
        this.isAuthenticated = true;
      } else {
        await this.clearStorage();
      }
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
      if (callback) {
        callback();
      }
    } catch (e) {
      console.error(e);
    } finally {
      popup_opened.set(false);
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

    this.isAuthenticated = true;
    this.jwtToken = token;
    this.sub = user?.sub;
    this.iss = user?.iss;
    this.exp = exp;
    this.email = user?.email;
    this.name = user?.name;
  }

  private async updateStorage() {
    if (!this.exp) throw new Error("Expiration date not found");
    if (!this.jwtToken) throw new Error("JWT token not found");

    localStorage.setItem(this.storage_token_name, this.jwtToken);
    localStorage.setItem(
      this.storage_expiration_date_name,
      new Date(this.exp * 1000).toISOString()
    );
  }

  private async clearStore() {
    this.isAuthenticated = false;
    this.jwtToken = undefined;
    this.sub = undefined;
    this.iss = undefined;
    this.exp = undefined;
    this.email = undefined;
    this.name = undefined;
  }

  private async clearStorage() {
    localStorage.removeItem(this.storage_token_name);
    localStorage.removeItem(this.storage_expiration_date_name);
  }

  async getIsAuthenticated() {
    if (!this.client)
      throw new Error("Auth0 client must be innited before use that method");

    return this.isAuthenticated;
  }
}

export const user = await User.getInstance();
