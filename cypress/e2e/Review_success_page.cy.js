describe("Review success Page", () => {
  const TEST_COMPANY_ID = 50;

  beforeEach(() => {
    cy.visit(`/shop/${TEST_COMPANY_ID}/review/success`);
    cy.intercept("/api/v1/companies/tremblay-halvorson-and-larkin").as(
      "get_company",
    );
  });

  context("buttons navigation", () => {
    it("should navigate to menu page on click on 'Back to menu' button", () => {
      cy.wait("@get_company").then(() => {
        // wait for the company data to load the button props correctly
        cy.get("[data-testid=button]").click();

        cy.url().should(
          "eq",
          `${Cypress.config().baseUrl}/shop/${TEST_COMPANY_ID}`,
        );
      });
    });

    it("should navigate to review page on click on 'history back' button", () => {
      cy.wait("@get_company").then(() => {
        cy.get("[data-testid=history-back-button]").click();

        cy.url().should(
          "eq",
          `${Cypress.config().baseUrl}/shop/${TEST_COMPANY_ID}/review`,
        );
      });
    });
  });
});
