import { OAuth2Client } from "google-auth-library";
import {
  GOOGLE_AUTH_CLIENT_ID,
  GOOGLE_AUTH_CLIENT_SECRET,
} from "$env/static/private";
import { redirect } from "@sveltejs/kit";
import { getProfile } from "../services/profile_service";

export const actions = {
  OAuth2: async ({}) => {
    const redirect_URL = "https://127.0.0.1:5173/oauth";

    const o_auth2_client = new OAuth2Client(
      GOOGLE_AUTH_CLIENT_ID,
      GOOGLE_AUTH_CLIENT_SECRET,
      redirect_URL
    );

    // Generate the url that will be used for the consent dialog.
    const authorize_url = o_auth2_client.generateAuthUrl({
      access_type: "offline",
      //scope mail and name
      scope:
        "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
      prompt: "consent",
    });

    throw redirect(302, authorize_url);
  },
};

export async function load({ cookies }) {
  const access_token = cookies.get("access-token");
  const client = cookies.get("client");
  const uid = cookies.get("uid");
  const is_authenticated = !!uid && !!client && !!access_token;

  if (is_authenticated) {
    await getProfile(uid, client, access_token);
  }

  return {
    is_authenticated,
  };
}
