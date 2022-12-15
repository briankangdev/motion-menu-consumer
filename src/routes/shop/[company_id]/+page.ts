import { getProfile } from "../../../services/profile_service";
import { getProducts } from "../../../services/products_service";
import { getProductLikes } from "../../../services/like_service";

interface IRouteParams {
  params: {
    company_id: string;
  };
}

export async function load({ params }: IRouteParams) {
  let company_id = params.company_id;
  await getProfile(company_id);
  await getProducts(company_id);
  // await getProductLikes(company_id); problems with Mixpanel

  return {
    company_id: params.company_id,
  };
}
