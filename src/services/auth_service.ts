import Cookies from "js-cookie";
import * as auth from "../api/auth";
import { googleSignIn } from "../api/oauth";
import { profile_data } from "src/stores/profile";

export async function signInWithGoogle(id_token: string) {
  const response = await googleSignIn(id_token);

  Cookies.set("access-token", response.headers["access-token"]);
  Cookies.set("token-type", response.headers["token-type"]);
  Cookies.set("client", response.headers.client);
  Cookies.set("uid", response.headers.uid);
  Cookies.set("expiry", response.headers.expiry);

  return response.data;
}

export async function signOut() {
  const response = await signOut();

  profile_data.set(null);

  return response.data;
}

export async function validateToken(
  uid: string,
  client_id: string,
  access_token: string
) {
  const response = await auth.validateToken(uid, client_id, access_token);
  return response.data;
}
