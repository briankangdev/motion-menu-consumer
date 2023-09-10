import { profile_data } from "../stores/profile";
import { validateToken } from "../services/auth_service";

export async function getProfile(
  uid: string,
  client_id: string,
  access_token: string
) {
  const data = await validateToken(uid, client_id, access_token);

  profile_data.update((prev) => ({ ...prev, ...data }));
}
