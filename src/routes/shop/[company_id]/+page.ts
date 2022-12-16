import { getCompany } from "../../../services/profile_service";
import { getProducts } from "../../../services/products_service";
import { getProductLikes } from "../../../services/like_service";
import type { ICompany } from "src/api/company";

interface IRouteParams {
  params: {
    company_id: ICompany["name"];
  };
}

export async function load({ params }: IRouteParams) {
  let company_id = params.company_id;
  await getCompany(company_id);
  await getProducts(company_id);
  await getProductLikes(company_id);

  return {
    company_id: params.company_id,
  };
}
