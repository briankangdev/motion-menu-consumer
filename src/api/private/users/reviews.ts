import client from "../../client";
import type { AxiosResponse } from "axios";
import type { ICompany } from "../../../stores/public/companies";
import type { IReview } from "../../../stores/public/reviews";

export const createReview = async (
  comment: string,
  company_id: ICompany["id"],
): Promise<IReview | undefined> => {
  try {
    const response: AxiosResponse<IReview> = await client.post(
      `/api/v1/users/reviews`,
      {
        review: {
          body: comment,
          company_id: company_id,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
