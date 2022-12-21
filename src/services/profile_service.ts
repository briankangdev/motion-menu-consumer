import { get_company, type CompanySlug } from "../api/company";
import { company } from "../stores/company";

export async function getCompany(company_id: CompanySlug) {
  const response = await get_company(company_id);
  company.update((prev) => ({ ...prev, ...response.data }));
}
