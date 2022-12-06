import client from "./client";

export const get_profile = async (company_id: string) => {
  const response = await client.get(`/api/v1/companies/${company_id}`);
  return response.data;
};
