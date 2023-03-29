import { getReviews, type IResponseReviews } from "../api/reviews";
import type { ICompany } from "src/stores/company";
import { dic, type IReview } from "../stores/reviews";

export async function loadReviewsByPage(
  company_id: ICompany["id"],
  per_page: number = 10,
  page: number = 1,
  featured: boolean = false
) {
  const response: IResponseReviews = await getReviews(
    company_id,
    per_page,
    page,
    featured
  );

  // dic.update((prev) => ({
  //   ...prev,
  // }));

  return response;
}
