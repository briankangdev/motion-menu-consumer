import client from "./client";

export interface IProfile {
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
  data: IProfile;
}

export const get_profile = async (company_id: string): Promise<IResponse> => {
  const response = await client.get(`/api/v1/companies/${company_id}`);
  return response.data;
};
