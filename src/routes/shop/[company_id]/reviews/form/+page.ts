import { getCompany } from "../../../../../services/profile_service";

interface IRouteParams {
  params: {
    company_id: string;
  };
}

export async function load({ params }: IRouteParams) {
  let company_id = params.company_id;

  await getCompany(company_id);
}
