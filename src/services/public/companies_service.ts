import { getCompany } from "../../api/public/companies";
import { company, type CompanySlug } from "../../stores/public/companies";

export async function loadCompany(company_id: CompanySlug) {
  const response = await getCompany(company_id);
  company.update((prev) => ({ ...prev, ...response.data }));
}
