import { createAuth0Client, Auth0Client } from "@auth0/auth0-spa-js";
import {
  PUBLIC_AUTH0_DOMAIN,
  PUBLIC_AUTH0_APP_CLIENT_ID,
} from "$env/static/public";
import {
  email,
  exp,
  iss,
  is_authenticated,
  jwt_token,
  popup_opened,
  sub,
  name,
} from "../stores/user_store";

async function createClient() {
  let auth0Client: Auth0Client;

  auth0Client = await createAuth0Client({
    domain: PUBLIC_AUTH0_DOMAIN,
    clientId: PUBLIC_AUTH0_APP_CLIENT_ID,
    authorizationParams: {
      audience: "https://motion.menu",
      scope: "profile read:reviews",
    },
  });

  return auth0Client;
}

async function loginWithPopup(client: Auth0Client, options?: any) {
  popup_opened.set(true);

  try {
    await client.loginWithPopup(options);
    await updateStore(client);
  } catch (e) {
    console.error(e);
  } finally {
    popup_opened.set(false);
  }
}

function logout(client: Auth0Client) {
  return client.logout();
}

async function getSession(client: Auth0Client) {
  if (await client.isAuthenticated()) {
    await updateStore(client);
  }
}

async function updateStore(client: Auth0Client) {
  const user = await client.getUser();
  const token = await client.getTokenSilently();

  is_authenticated.set(true);
  jwt_token.set(token);
  sub.set(user?.sub);
  iss.set(user?.iss);
  exp.set(user?.exp);
  email.set(user?.email);
  name.set(user?.name);
}

const auth = {
  createClient,
  loginWithPopup,
  logout,
  getSession,
};

export default auth;
