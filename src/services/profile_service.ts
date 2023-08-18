import { profile_data } from "../stores/profile";
import { validate_token } from "../api/profile";

export async function getProfile(
  uid: string,
  client_id: string,
  accessToken: string
) {
  const response = await validate_token(uid, client_id, accessToken);

  if (response.success) {
    profile_data.update((prev) => ({ ...prev, ...response.data }));
  }
}
