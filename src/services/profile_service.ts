import { get_company } from "../api/company";
import { company } from "../stores/company";

export async function getCompany(company_id: string) {
  const response = await get_company(company_id);
  company.update((prev) => ({ ...prev, ...response.data }));
}
