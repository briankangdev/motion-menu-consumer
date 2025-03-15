import client from "../client";
import type { AxiosResponse } from "axios";
import type { ICompany } from "../../stores/public/companies";
import type { IReview } from "../../stores/public/reviews";

export interface IResponseReviews {
  data: { [key: string]: IReview };
  ids: string[];
  meta: { [key: string]: any };
}

export const getReviews = async (
  company_slug: ICompany["slug"],
  page: number = 1,
  per_page: number = 5,
  featured: boolean = false,
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
      },
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
