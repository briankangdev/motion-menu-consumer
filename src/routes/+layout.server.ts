import { profile_data } from "../stores/profile.js";

export const load = async ({ cookies }) => {
  const uid = cookies.get("uid");
  const client_id = cookies.get("client");
  const access_token = cookies.get("access-token");
  const is_authenticated = !!uid && !!client_id && !!access_token;

  if (!is_authenticated) {
    //stores need to be set on both server and client
    profile_data.set(null);
  }

  //return cookies in +layout.server.ts to use in +layout.ts
  return {
    cookies: {
      uid,
      client_id,
      access_token,
      is_authenticated,
    },
  };
};
