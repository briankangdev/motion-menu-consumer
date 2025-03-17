import { loadCompany } from "../../../services/public/companies_service";
import {
  loadAllProducts,
  loadProductCategories,
} from "../../../services/public/products_service";
import { getProductLikes } from "../../../services/private/users/like_service";
import type { CompanySlug } from "../../../stores/public/companies";

interface IRouteParams {
  params: {
    company_id: CompanySlug;
  };
}

export async function load({ params }: IRouteParams) {
  let company_id = params.company_id;

  await Promise.all([
    loadCompany(company_id),
    loadProductCategories(company_id),
    loadAllProducts(company_id),
    getProductLikes(company_id),
  ]);

  return {
    company_id: params.company_id,
  };
}
