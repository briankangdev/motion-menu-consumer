import { loadReviewsByPage } from "../../../../services/public/reviews_service";
import { loadCompany } from "../../../../services/public/companies_service";
import type { ICompany } from "../../../../stores/public/companies";

interface IRouteParams {
  params: {
    company_id: string;
  };
}

export async function load({ params }: IRouteParams) {
  let company_slug: ICompany["slug"] = params.company_id;

  await loadCompany(company_slug);
  await loadReviewsByPage(company_slug);
}
