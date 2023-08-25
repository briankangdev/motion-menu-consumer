import { loadCompany } from "../../../../services/company_service";
import type { ICompany } from "src/stores/company";

interface IRouteParams {
  params: {
    company_id: string;
  };
}

export async function load({ params }: IRouteParams) {
  let company_slug: ICompany["slug"] = params.company_id;

  await loadCompany(company_slug);
}
