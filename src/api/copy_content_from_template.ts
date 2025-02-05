import type { ICompany } from "../stores/company";
import client from "./client";

interface IResponseCopyProducts {
  job_id: string;
}

interface IResponseCopyProductsStatus {
  status: string;
}

export const copyProductsFromCompany = async (
  template: number
): Promise<IResponseCopyProducts> => {
  const response = await client.post(
    `/api/v1/companies/copy_content_from_template`,
    {
      template,
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
