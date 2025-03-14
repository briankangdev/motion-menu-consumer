import client from "../client";
import type { CompanySlug, ICompany } from "../../stores/public/companies";

interface IResponse {
  data: ICompany;
}

export const getCompany = async (
  company_id: CompanySlug,
): Promise<IResponse> => {
  const response = await client.get(`/api/v1/companies/${company_id}`);
  return response.data;
};
