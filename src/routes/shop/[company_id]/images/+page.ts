import { loadCompany } from "../../../../services/public/companies_service";
import {
  loadAllProducts,
  loadProductCategories,
} from "../../../../services/public/products_service";
import { getProductLikes } from "../../../../services/public/like_service";
import { loadReviewsByPage } from "../../../../services/public/reviews_service";

interface IRouteParams {
  params: {
    company_id: string;
  };
}

export async function load({ params }: IRouteParams) {
  let company_id = params.company_id;

  await Promise.all([
    loadCompany(company_id),
    loadAllProducts(company_id),
    loadProductCategories(company_id),
    getProductLikes(company_id),
    loadReviewsByPage(company_id),
  ]);

  return {
    company_id: params.company_id,
  };
}
