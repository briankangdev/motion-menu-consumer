import { REVIEW_INDEX_PAGE } from "../../../../lib/analytics/types";
import analytics from "../../../../lib/analytics";
import type { ICompany } from "src/stores/company";

export function trackVisitPage(company_id: ICompany["id"]) {
  analytics.track.visitPage(REVIEW_INDEX_PAGE, { company_id });
}

export function trackSubmitForm(
  company_id: ICompany["id"],
  additional_props: { authenticated: boolean }
) {
  analytics.track.submitForm(REVIEW_INDEX_PAGE, "review-form", {
    company_id,
    ...additional_props,
  });
}

export function trackButtonClick(
  company_id: ICompany["id"],
  button_name: string
) {
  analytics.track.buttonClick(REVIEW_INDEX_PAGE, button_name, {
    company_id,
  });
}
