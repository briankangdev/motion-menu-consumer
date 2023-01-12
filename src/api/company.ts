import client from "./client";
import type { CompanySlug, ICompany } from "src/stores/company";

interface IResponse {
  data: ICompany;
}
export const get_company = async (
  company_id: CompanySlug
): Promise<IResponse> => {
  const response = await client.get(`/api/v1/companies/${company_id}`);
  return response.data;
};
