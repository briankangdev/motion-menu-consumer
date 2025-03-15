import { browser } from "$app/environment";
import {
  PUBLIC_AUTH0_DOMAIN,
  PUBLIC_AUTH0_APP_CLIENT_ID,
} from "$env/static/public";
import { createAuth0Client, Auth0Client } from "@auth0/auth0-spa-js";

let auth0_client: Auth0Client | undefined = undefined;

export async function getAuth0Client() {
  if (!browser) {
    return;
  }

  if (auth0_client) {
    return auth0_client;
  }

  const domain = PUBLIC_AUTH0_DOMAIN;
  const clientId = PUBLIC_AUTH0_APP_CLIENT_ID;

  // TODO: Update scopes for companies, employees and users
  const authorizationParams = {
    redirect_uri: `${window.location.origin}/companies/profiling`,
    audience: "https://motion.menu",
    scope: "profile read:reviews",
    cookieDomain: ".motion.menu",
  };

  if (domain == undefined || clientId == undefined) {
    throw new Error("Auth0 values not loaded");
  }

  auth0_client = await createAuth0Client({
    domain,
    clientId,
    authorizationParams,
    cacheLocation: "localstorage",
    useRefreshTokens: true, // Use refresh tokens
  });

  return auth0_client;
}
