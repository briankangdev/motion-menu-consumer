// import { profile_data } from "../stores/profile";
// import * as auth_api from "../api/private/companies/auth";
import { getAuth0Client } from "../lib/auth0";
import type { Auth0Client } from "@auth0/auth0-spa-js";

export async function getAccessToken() {
  const auth0_client = await getAuth0Client();
  return await auth0_client.getTokenSilently();
}

export async function isAuthenticated() {
  const auth0_client = await getAuth0Client();
  return await auth0_client.isAuthenticated();
}

export async function login(callback?: () => void) {
  const auth0_client = await getAuth0Client();
  await auth0_client.logout();
  await auth0_client.loginWithRedirect();

  if (callback) {
    callback();
  }
}

export async function logout() {
  const auth0_client = await getAuth0Client();
  await auth0_client.logout();
  clearStore();
}

export async function handleAuthRedirectCallback() {
  if (
    window.location.search.includes("code=") &&
    window.location.search.includes("state=")
  ) {
    const auth0_client = await getAuth0Client();
    // state and code are used to handle the auth0 redirect callback
    await auth0_client.handleRedirectCallback();
    // const access_token = await auth0_client.getTokenSilently();
    // Validate token as company
    // await auth_api.validateToken(access_token);
    // Use replaceState to redirect the user away and remove the querystring parameters
    window.history.replaceState({}, document.title, "/");
  }
}

async function loadUserStoreFromAuth0(client: Auth0Client) {
  const user = await client.getUser();
  // email.set(user?.email);
  // name.set(user?.name);
  // name.set(user?.name);
}

export function clearStore() {
  // email.set(undefined);
  // name.set(undefined);
}
