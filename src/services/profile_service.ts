import { profile_data } from "../stores/profile";
import { sign_out, validate_token } from "../api/profile";
import { goto } from "$app/navigation";

export async function getProfile(
  uid: string,
  client_id: string,
  access_token: string
) {
  const response = await validate_token(uid, client_id, access_token);

  if (response.success) {
    profile_data.update((prev) => ({ ...prev, ...response.data }));
  }
}

export async function signOut() {
  const { success } = await sign_out();

  if (success) {
    profile_data.set(null);
    goto("/", { invalidateAll: true });
  }
}
