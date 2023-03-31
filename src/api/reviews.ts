import client from "./client";
import type { AxiosResponse } from "axios";
import type { ICompany } from "src/stores/company";
import type { IReview } from "src/stores/reviews";

export interface IResponseReviews {
  data: { [key: string]: IReview };
  ids: string[];
  meta: { [key: string]: any };
}

export const getReviews = async (
  company_slug: ICompany["slug"],
  page: number = 1,
  per_page: number = 5,
  featured: boolean = false
): Promise<IResponseReviews | undefined> => {
  try {
    const response: AxiosResponse<IResponseReviews> = await client.get(
      `/api/v1/${company_slug}/reviews`,
      {
        params: {
          per_page,
          page,
          featured,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createReview = async (
  comment: string,
  company_id: ICompany["id"]
): Promise<IReview | undefined> => {
  try {
    const response: AxiosResponse<IReview> = await client.post(
      `/api/v1/users/reviews`,
      {
        review: {
          body: comment,
          company_id: company_id,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
