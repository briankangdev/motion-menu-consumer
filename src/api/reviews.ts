import client from "./client";
import type { CompanySlug } from "src/stores/company";

export const createReview = async (
  company_id: CompanySlug,
  token: string,
  comment: string
) => {
  const response = await client.post(
    `/api/v1/users/reviews`,
    {
      review: {
        comment: comment,
        company_id: company_id,
      },
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );

  return response.data;
};
