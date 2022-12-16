import { get_company, type ICompany } from "../api/company";
import { company } from "../stores/company";

export async function getCompany(company_id: ICompany["name"]) {
  const response = await get_company(company_id);
  company.update((prev) => ({ ...prev, ...response.data }));
}
