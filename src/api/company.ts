import client from "./client";

export interface ICompany {
  id: number;
  email: string;
  name: string;
  description: string;
  instagram: string;
  short_description: string;
  slug: string;
  tag_priority: string;
}

interface IResponse {
  data: ICompany;
}

export type CompanySlug = ICompany["name"];

export const get_company = async (
  company_id: CompanySlug
): Promise<IResponse> => {
  const response = await client.get(`/api/v1/companies/${company_id}`);
  return response.data;
};
