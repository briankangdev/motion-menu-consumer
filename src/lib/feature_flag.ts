import flagsmith from "flagsmith";
import { env } from "$env/dynamic/public";
import type { IFlagsmith } from "flagsmith/types";

/**
 * Flagsmith client must be initialized before it can be used.
 *
 * To initialize the client, you must call `Flagsmith.initSession(user)` with a user identifier.
 */

class FeatureFlag {
  client: IFlagsmith<string, string>;

  constructor() {
    this.client = flagsmith;
  }

  async initSession(user: string) {
    if (!user) {
      console.warn(
        "Flagsmith: User is not provided. Flagsmith will not be able to track user specific flags."
      );
    }
    await this.client.init({
      environmentID: env.PUBLIC_FLAGSMITH_ENVIRONMENT_ID!,
      identity: user,
    });
  }

  async checkSession() {
    if (!this.client.initialised) {
      throw new Error(
        "Flagsmith: before using Flagsmith, you must call `Flagsmith.initSession(user)` with a user identifier."
      );
    }
  }

  async getState() {
    await this.checkSession();
    return await this.client.getState();
  }

  async getAllFlags() {
    await this.checkSession();
    return await this.client.getAllFlags();
  }

  async getValue(key: string) {
    await this.checkSession();
    return await this.client.getValue(key);
  }
}

export default new FeatureFlag();
