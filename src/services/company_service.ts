import { get_company } from "../api/company";
import { company, type CompanySlug } from "../stores/company";

export async function getCompany(company_id: CompanySlug) {
  const response = await get_company(company_id);
  company.update((prev) => ({ ...prev, ...response.data }));
}
