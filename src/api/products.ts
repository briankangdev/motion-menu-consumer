import client from "./client";
import type { IProduct } from "../stores/products";
import type { CompanySlug } from "../stores/company";

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
  per_page: number = 15
): Promise<IResponseProducts> => {
  const response = await client.get(
    `/api/v1/${company_id}/products?page=${page}&per_page=${per_page}`
  );

  return response.data;
};

export const getProduct = async (
  product_id: IProduct["id"]
): Promise<IResponseProduct> => {
  const response = await client.get(`/api/v1/product/${product_id}`);

  return response.data;
};

export const getProductCategories = async (company_id: CompanySlug) => {
  return await client.get(`/api/v1/${company_id}/product_categories`);
};
