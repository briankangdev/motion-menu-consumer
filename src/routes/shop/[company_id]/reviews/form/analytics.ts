import { REVIEW_FORM_PAGE } from "../../../../../lib/analytics/types";
import analytics from "../../../../../lib/analytics";
import type { ICompany } from "src/stores/company";

export function trackVisitPage(company_id: ICompany["id"]) {
  analytics.track.visitPage(REVIEW_FORM_PAGE, {
    company_id,
  });
}

export function trackSubmitForm(
  company_id: ICompany["id"],
  additional_props: { authenticated: boolean }
) {
  analytics.track.submitForm(REVIEW_FORM_PAGE, "review-form", {
    company_id,
    ...additional_props,
  });
}
