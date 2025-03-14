import { getReviews, type IResponseReviews } from "../../api/public/reviews";
import type { ICompany } from "../../stores/public/companies";
import { reviews_data, reviews_meta } from "../../stores/public/reviews";

export async function loadReviewsByPage(
  company_slug: ICompany["slug"],
  page: number = 1
) {
  const response: IResponseReviews = await getReviews(company_slug, page);

  reviews_data.update((prev) => ({
    ...prev,
    ...response.data,
  }));

  reviews_meta.update((prev) => ({
    ...prev,
    ...response.meta,
  }));
}
