import { get_profile } from "../api/company";
import { company } from "../stores/company";

export async function getProfile(company_id: string) {
  const response = await get_profile(company_id);
  company.update((prev) => ({ ...prev, ...response.data }));
}
