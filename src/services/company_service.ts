import { getCompany } from "../api/company";
import { company, type CompanySlug } from "../stores/company";

export async function loadCompany(company_id: CompanySlug) {
  const response = await getCompany(company_id);
  company.update((prev) => ({ ...prev, ...response.data }));
}

// TODO: Get header data and store in the cookie, then update stores if necessary
export async function signIn() {}
