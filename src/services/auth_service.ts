import { createAuth0Client, Auth0Client } from "@auth0/auth0-spa-js";
import {
  PUBLIC_AUTH0_DOMAIN,
  PUBLIC_AUTH0_APP_CLIENT_ID,
} from "$env/static/public";
import userStore from "../stores/user_store";

async function createClient() {
  let auth0Client = await createAuth0Client({
    domain: PUBLIC_AUTH0_DOMAIN,
    clientId: PUBLIC_AUTH0_APP_CLIENT_ID,
    authorizationParams: {
      audience: "https://motion.menu",
      scope: "read:reviews",
    },
  });

  return auth0Client;
}

async function loginWithPopup(client: Auth0Client, options?: any) {
  userStore.popup_opened.set(true);

  try {
    await client.loginWithPopup(options);
    const user = await client.getUser();
    const token = await client.getTokenSilently();

    userStore.is_authenticated.set(true);
    userStore.jwt_token.set(token);
    userStore.sub.set(user?.sub);
    userStore.iss.set(user?.iss);
    userStore.exp.set(user?.exp);
    userStore.email.set(user?.email);
    userStore.name.set(user?.name);
  } catch (e) {
    console.error(e);
  } finally {
    userStore.popup_opened.set(false);
  }
}

function logout(client: Auth0Client) {
  return client.logout();
}

const auth = {
  createClient,
  loginWithPopup,
  logout,
};

export default auth;
