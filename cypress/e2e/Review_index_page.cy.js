import {
  storage_token_name,
  storage_expiration_date_name,
} from "../../src/stores/user_store";
import "../support/commands";
import reviews_response_1 from "../fixtures/review_index_page/reviews_response_1.json";
import reviews_response_2 from "../fixtures/review_index_page/reviews_response_2.json";
import reviews_empty_response from "../fixtures/review_index_page/reviews_empty_response.json";
import company_response from "../fixtures/review_index_page/company_response.json";

describe("Review Index Page", () => {
  const language = window.navigator.language.split(/[-_]/)[0]; // language without region code
  const TEST_COMPANY_ID = 50;

  beforeEach(() => {
    cy.visit(`/shop/${TEST_COMPANY_ID}/reviews`);
    cy.on("uncaught:exception", () => false); // ignore auth0 errors
  });

  it("should display the correct title", () => {
    cy.intercept("GET", "/api/v1/companies/*", company_response).as(
      "getCompany",
    );
    cy.wait("@getCompany").then(() => {
      cy.get("[data-testid=review-index-title]").should(
        "contain",
        company_response.data.name,
      );
    });
  });

  context("reviews", () => {
    const no_reviews = "no_reviews";

    it("should display no reviews message text when there are no reviews", () => {
      cy.intercept(
        "GET",
        `/api/v1/${TEST_COMPANY_ID}/reviews*`,
        reviews_empty_response,
      ).as("getReviews");

      cy.wait("@getReviews").then(() => {
        cy.readFile(`src/lib/translation/${language}.json`).then(
          (translation) => {
            cy.get(".no-reviews")
              .should("be.visible")
              .and("contain", translation[no_reviews]);
          },
        );
      });
    });

    it("should load more reviews when scrolling to the bottom of the page", () => {
      cy.intercept(
        "GET",
        `/api/v1/*/reviews?per_page=5&page=1**`,
        reviews_response_1,
      ).as("getReviews1");

      cy.intercept(
        "GET",
        `/api/v1/*/reviews?per_page=5&page=2**`,
        reviews_response_2,
      ).as("getReviews2");

      cy.wait("@getReviews1").then(() => {
        cy.get("[data-testid=review-container]").should(
          "have.length",
          reviews_response_1.ids.length,
        );
      });

      cy.scrollTo("bottom");

      cy.wait("@getReviews2").then(() => {
        cy.get("[data-testid=review-container]").should(
          "have.length",
          reviews_response_1.ids.length + reviews_response_2.ids.length,
        );
      });
    });

    it("should display the total number of reviews", () => {
      cy.intercept("GET", `/api/v1/*/reviews?**`, reviews_response_1).as(
        "getReviews",
      );
      cy.wait("@getReviews").then(() => {
        cy.get("[data-testid=total-reviews]")
          .should("be.visible")
          .and("contain", reviews_response_1.meta.count);
      });
    });
  });

  context("review form", () => {
    const test_token = "test_token";
    const test_expiration_date = "2050-01-01T00:00:00.000Z";

    beforeEach(() => {
      // set token and expiration date in local storage to simulate logged in user
      localStorage.setItem(storage_token_name, test_token);
      localStorage.setItem(storage_expiration_date_name, test_expiration_date);
    });

    it("should send the right request with params", () => {
      const comment = "This is a great review!";
      const request_body = {
        review: {
          body: comment,
          company_id: TEST_COMPANY_ID,
        },
      };

      cy.intercept({
        method: "POST",
        url: "/api/v1/users/reviews",
      }).as("post_review");

      cy.get("[data-testid=submit-button]").should("be.visible");
      cy.get("textarea[name=comment]").should("be.visible").type(comment);

      cy.get("[data-testid=submit-button]").click();

      cy.wait("@post_review").then((interception) => {
        expect(interception.request.body).to.deep.equal(request_body);
      });
    });
  });
});
