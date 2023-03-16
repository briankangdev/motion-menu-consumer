import client from "./client";
import type { ICompany } from "src/stores/company";

export const createReview = async (
  comment: string,
  company_id: ICompany["id"],
  token: string
) => {
  try {
    const response = await client.post(`/api/v1/users/reviews`, {
      review: {
        body: comment,
        company_id: company_id,
      },
    });

    return response;
  } catch (error) {
    console.error(error);
  }
};
