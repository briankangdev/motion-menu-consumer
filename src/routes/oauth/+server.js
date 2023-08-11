import { redirect } from "@sveltejs/kit";
import { OAuth2Client } from "google-auth-library";
import {
  GOOGLE_AUTH_CLIENT_ID,
  GOOGLE_AUTH_CLIENT_SECRET,
} from "$env/static/private";
import { google_sign_in } from "../../api/profile";

export const GET = async ({ url, cookies }) => {
  const redirect_URL = "https://127.0.0.1:5173/oauth";
  const code = await url.searchParams.get("code");

  try {
    const o_auth2_client = new OAuth2Client(
      GOOGLE_AUTH_CLIENT_ID,
      GOOGLE_AUTH_CLIENT_SECRET,
      redirect_URL
    );
    const token_data = await o_auth2_client.getToken(code);
    // Make sure to set the credentials on the OAuth2 client.
    o_auth2_client.setCredentials(token_data.tokens);

    const user = o_auth2_client.credentials;

    const response_data = await google_sign_in(user.id_token);

    cookies.set("access-token", response_data.headers["access-token"]);
    cookies.set("token-type", response_data.headers["token-type"]);
    cookies.set("client", response_data.headers["client"]);
    cookies.set("expiry", response_data.headers["expiry"]);
    cookies.set("uid", response_data.headers["uid"]);

    console.log(
      "response_data.profile.is_new_account",
      response_data.profile.is_new_account + "" + response_data.profile.id
    );

    if (response_data.profile.is_new_account)
      throw redirect(303, `/shop/${response_data.profile.id}/profiling`);
  } catch (err) {
    console.log("Error logging in with OAuth2 user", err);
  }

  throw redirect(303, "/");
};
