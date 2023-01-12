import { getCompany } from "../../../../../services/profile_service";
import { loadProduct } from "../../../../../services/products_service";
import { getProductLikes } from "../../../../../services/like_service";

interface IRouteParams {
  params: {
    company_id: string;
    product_id: string;
  };
}

export async function load({ params }: IRouteParams) {
  let company_id = params.company_id;
  let product_id = +params.product_id;

  await Promise.all([
    getCompany(company_id),
    loadProduct(product_id),
    getProductLikes(company_id),
  ]);

  return {
    company_id: params.company_id,
    product_id: params.product_id,
  };
}
