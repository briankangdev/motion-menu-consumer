import { loadCompany } from "../../../../../services/public/companies_service";

interface IRouteParams {
  params: {
    company_id: string;
  };
}

export async function load({ params }: IRouteParams) {
  let company_id = params.company_id;

  await loadCompany(company_id);
}
