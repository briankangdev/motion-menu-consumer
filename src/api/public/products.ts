import client from "../client";
import type { IProduct } from "../../stores/products";
import type { CompanySlug } from "../../stores/public/companies";

interface IResponseProducts {
  data: { [key: string]: IProduct };
  meta: { [key: string]: any };
}

interface IResponseProduct {
  data: IProduct;
}

export const getProducts = async (
  company_id: CompanySlug,
  page: number,
  per_page: number = 15,
): Promise<IResponseProducts> => {
  const response = await client.get(
    `/api/v1/${company_id}/products?page=${page}&per_page=${per_page}`,
  );

  return response.data;
};

export const getProduct = async (
  product_id: IProduct["id"],
): Promise<IResponseProduct> => {
  const response = await client.get(`/api/v1/product/${product_id}`);

  return response.data;
};

export const getProductCategories = async (
  company_id: CompanySlug,
  sort_by_priority: boolean = false,
) => {
  return await client.get(`/api/v1/${company_id}/products/categories`, {
    params: {
      sort_by_priority,
    },
  });
};
