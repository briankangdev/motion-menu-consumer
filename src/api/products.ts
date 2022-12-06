import client from "./client";

interface IProduct {
  name: string;
}

export const get_products = async (company_id: string) => {
  const response = await client.get(
    `/api/v1/${company_id}/products?page=1&per_page=15`
  );

  return response.data;
};

export const get_products_by_page = async (
  company_id: string,
  page: number
) => {
  const response = await client.get(
    `/api/v1/${company_id}/products?page=${page}&per_page=15`
  );

  return response.data;
};
