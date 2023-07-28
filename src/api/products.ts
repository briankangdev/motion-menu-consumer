import client from "./client";
import type { IProduct } from "src/stores/products";
import type { CompanySlug, ICompany } from "src/stores/company";

interface IResponseProducts {
  data: { [key: string]: IProduct };
  meta: { [key: string]: any };
}

interface IResponseProduct {
  data: IProduct;
}

interface IResponseCopyProducts {
  job_id: string;
}

interface IResponseCopyProductsStatus {
  status: string;
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

export const copyProductsFromCompany = async (
  template_company_id: ICompany["id"]
): Promise<IResponseCopyProducts> => {
  const response = await client.post(
    `/api/v1/companies/copy_content_from_template`,
    {
      template_company_id,
    }
  );

  return response.data;
};

export const checkCopyProductsStatus = async (
  job_id: string
): Promise<IResponseCopyProductsStatus> => {
  const response = await client.get(
    `/api/v1/companies/copy_content_from_template/${job_id}`
  );

  return response.data;
};
