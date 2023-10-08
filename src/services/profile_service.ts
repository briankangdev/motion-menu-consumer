import { profile_data } from "../stores/profile";
import * as profile_api from "../api/profile";
import { goto } from "$app/navigation";
import cookies from "../lib/cookies";

// Helper function to set cookies
const setCookies = (headers: any) => {
  cookies.set("access-token", headers["access-token"]);
  cookies.set("token-type", headers["token-type"]);
  cookies.set("client", headers.client);
  cookies.set("uid", headers.uid);
  cookies.set("expiry", headers.expiry);
};

// Helper function to remove cookies
const removeCookies = () => {
  cookies.remove("access-token");
  cookies.remove("token-type");
  cookies.remove("client");
  cookies.remove("uid");
  cookies.remove("expiry");
};

export async function signUp(
  name: string,
  email: string,
  password: string,
  password_confirmation: string,
) {
  const { data, headers } = await profile_api.signUp(
    name,
    email,
    password,
    password_confirmation,
  );

  return data;
}

export async function signIn(email: string, password: string) {
  const { data, headers } = await profile_api.signIn(email, password);
  setCookies(headers);

  return data;
}

export async function googleSignIn(id_token: string) {
  const { data } = await profile_api.googleSignIn(id_token);
  return data;
}

export async function getProfile(
  uid: string,
  client_id: string,
  access_token: string,
) {
  try {
    const response = await profile_api.validateToken(
      uid,
      client_id,
      access_token,
    );
    profile_data.update((prev) => ({ ...prev, ...response.data }));
  } catch (error) {
    console.error(error);
    removeCookies();
  }
}

export async function signOut() {
  const {
    data: { success },
  } = await profile_api.signOut();

  if (success) {
    profile_data.set(null);
    removeCookies();
    goto("/", { invalidateAll: true });
  }
}
