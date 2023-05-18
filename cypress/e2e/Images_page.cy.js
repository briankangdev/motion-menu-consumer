describe("Images Page", () => {
  const TEST_COMPANY_ID = 50;

  beforeEach(() => {
    cy.intercept("GET", `/api/v1/companies/${TEST_COMPANY_ID}`).as(
      "get_company"
    );

    cy.visit(`/shop/${TEST_COMPANY_ID}/images`);
  });

  it("render page title", () => {
    cy.wait("@get_company").then(({ response }) => {
      cy.get("[data-testid=company-name]").should(
        "have.text",
        response.body.data.name
      );
    });
  });

  it("render company description", () => {
    cy.wait("@get_company").then(({ response }) => {
      cy.get("[data-testid=company-description]").should(
        "have.text",
        response.body.data.description
      );
    });
  });

  context("images", () => {
    it("render image carrousel", () => {
      cy.get("[data-testid=carrousel]").should("not.have.length", 0);
    });

    it("render 'more items' button", () => {
      cy.get("[data-testid=more-items]").should("exist");
    });
  });

  context("reviews", () => {
    it("render reviews", () => {
      cy.get("[data-testid=review-container]").should("not.have.length", 0);
    });

    it("show no reviews when there are 0 reviews", () => {
      cy.intercept("GET", `/api/v1/${TEST_COMPANY_ID}/reviews?*`, {
        data: [],
      }).as("get_no_reviews");

      cy.wait("@get_no_reviews").then(() => {
        cy.get("[data-testid=review-container]").should("have.length", 0);
        cy.get("[data-testid=no-reviews]").should("exist");
      });
    });

    it("render 'add review' button", () => {
      cy.get("[data-testid=add-review]").should("exist");
    });

    it("render 'all reviews' button", () => {
      cy.get("[data-testid=all-reviews]").should("exist");
    });
  });

  context("menu", () => {
    it("render menu masonry", () => {
      cy.get("[data-testid=menu]").should("exist");
    });
  });
});
