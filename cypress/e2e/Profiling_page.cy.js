import "../support/commands";
import translation from "../../src/lib/translation/en.json";

describe("Profiling Page", () => {
  const TEST_COMPANY_ID = 50;

  beforeEach(() => {
    cy.visit(`/shop/${TEST_COMPANY_ID}/profiling`);
    cy.on("uncaught:exception", () => false); // ignore auth0 errors
    cy.waitForPageLoad();
    cy.wait(1000); // wait for page to load
  });

  context("shop name validation", () => {
    it("check error message when shop name is empty", () => {
      cy.get("[data-testid=submit-button]").click();
      console.log(translation);

      cy.get("[data-testid=error-message]").contains(
        translation.routes.shop.profiling.input_error.length
      );
    });

    it("check error message when shop name is too short", () => {
      const shortName = "ab";

      cy.get("[data-testid=shop-name-input]").clear().type(shortName).blur();

      cy.get("[data-testid=error-message]").contains(
        translation.routes.shop.profiling.input_error.length
      );
    });

    it("check error message when shop name is too long", () => {
      const longName = Array(32).join("a"); // this will create a string with 31 characters

      cy.get("[data-testid=shop-name-input]").clear().type(longName).blur();

      cy.get("[data-testid=error-message]").contains(
        translation.routes.shop.profiling.input_error.length
      );
    });

    //   it("checks the business name input visible error messages", () => {
    //     const specialCharName = "business$Name";

    //     // Check special character name
    //     cy.get("[data-testid=input-field]")
    //       .clear()
    //       .type(specialCharName)
    //       .get("[data-testid=button]")
    //       .click()
    //       .get(".toaster")
    //       .should("contain", "routes.shop.profiling.shop_name_error.no_special");
    //   });

    it("check error message when shop name has special characters", () => {
      const specialCharName = "shop$Name";

      cy.get("[data-testid=shop-name-input]")
        .clear()
        .type(specialCharName)
        .blur();

      cy.get("[data-testid=error-message]").contains(
        translation.routes.shop.profiling.input_error.no_special
      );
    });

    it("check NO error message when shop name is valid", () => {
      const validName = "shopName";

      cy.get("[data-testid=shop-name-input]").clear().type(validName).blur();

      cy.get("[data-testid=error-message]").should("not.exist");
    });
  });
});
