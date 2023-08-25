import { loadCompany } from "../../../services/company_service";
import {
  loadAllProducts,
  loadProductTags,
} from "../../../services/products_service";
import { getProductLikes } from "../../../services/like_service";
import type { CompanySlug } from "src/stores/company";

interface IRouteParams {
  params: {
    company_id: CompanySlug;
  };
}

export async function load({ params }: IRouteParams) {
  let company_id = params.company_id;

  await Promise.all([
    loadCompany(company_id),
    loadProductTags(company_id),
    loadAllProducts(company_id),
    getProductLikes(company_id),
  ]);

  return {
    company_id: params.company_id,
  };
}
