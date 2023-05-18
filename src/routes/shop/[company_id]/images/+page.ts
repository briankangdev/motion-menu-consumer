import { getCompany } from "../../../../services/profile_service";
import { loadAllProducts } from "../../../../services/products_service";
import { getProductLikes } from "../../../../services/like_service";
import { loadReviewsByPage } from "../../../../services/reviews_service";

interface IRouteParams {
  params: {
    company_id: string;
  };
}

export async function load({ params }: IRouteParams) {
  let company_id = params.company_id;

  await Promise.all([
    getCompany(company_id),
    loadAllProducts(company_id),
    getProductLikes(company_id),
    loadReviewsByPage(company_id),
  ]);

  return {
    company_id: params.company_id,
  };
}
