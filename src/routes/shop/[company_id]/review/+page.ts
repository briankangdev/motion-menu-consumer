import { loadReviewsByPage } from "../../../../services/reviews_service";
import { getCompany } from "../../../../services/profile_service";

interface IRouteParams {
  params: {
    company_id: string;
  };
}

export async function load({ params }: IRouteParams) {
  let company_id = params.company_id;
  const reviews_per_page: number = 3;
  const page: number = 1;

  await getCompany(company_id);

  const reviews_response = await loadReviewsByPage(
    +company_id,
    reviews_per_page,
    page
  );
  const reviews_data = reviews_response.data;
  const reviews = Object.values(reviews_data);

  return {
    reviews,
    reviews_per_page,
  };
}
