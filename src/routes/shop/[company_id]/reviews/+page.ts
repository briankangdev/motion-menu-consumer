import { loadReviewsByPage } from "../../../../services/reviews_service";
import { getCompany } from "../../../../services/profile_service";
import type { ICompany } from "src/stores/company";

interface IRouteParams {
  params: {
    company_id: string;
  };
}

export async function load({ params }: IRouteParams) {
  let company_slug: ICompany["slug"] = params.company_id;

  await getCompany(company_slug);
  await loadReviewsByPage(company_slug);
}
