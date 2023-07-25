import "../support/commands";
import translation from "../../src/lib/translation/en.json";

describe("Profiling Page", () => {
  const TEST_COMPANY_ID = 201;

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

  context("redirection to loading page", () => {
    it("should redirect to loading page when shop name is valid", () => {
      cy.get("[data-testid=shop-name-input]").clear().type("shopName");

      cy.get("[data-testid=submit-button]").click();

      cy.url().should("include", "/loading");
    });

    it("should NOT redirect to loading page when shop name is invalid", () => {
      cy.get("[data-testid=shop-name-input]").clear().type("shop$Name");

      cy.get("[data-testid=submit-button]").click();

      cy.url().should("not.include", "/loading");
    });
  });

  context("redirection from loading page to shop page", () => {
    it("should redirect to shop page after 5 seconds", () => {
      cy.get("[data-testid=shop-name-input]").clear().type("shopName");

      cy.get("[data-testid=submit-button]").click();

      cy.url().should("include", "/loading");

      cy.wait(5000);

      cy.url().should("include", "/images");
      cy.url().should("not.include", "/loading");
    });
  });

  context("request to server", () => {
    let copyProductsCalled = false;
    let checkCopyProductsStatusCalled = false;

    beforeEach(() => {
      cy.intercept("PUT", "/api/v1/companies/profile").as("update_company");
      cy.intercept(
        "POST",
        "/api/v1/companies/copy_content_from_template",
        () => {
          copyProductsCalled = true;
        }
      ).as("copy_products");
      cy.intercept(
        "GET",
        "/api/v1/companies/copy_content_from_template/*",
        () => {
          checkCopyProductsStatusCalled = true;
        }
      ).as("check_copy_products_status");
    });

    it("should only UPDATE SHOP NAME request when shop name is valid and category is 'empty'", () => {
      cy.get("[data-testid=shop-name-input]").clear().type("shopName");
      cy.get('input[value="empty"]').should("be.checked");

      cy.get("[data-testid=submit-button]").click();

      cy.wait("@update_company").then(({ request }) => {
        expect(request.body.company.name).to.eq("shopName");
      });

      cy.then(() => {
        expect(copyProductsCalled).to.be.false;
        expect(checkCopyProductsStatusCalled).to.be.false;
      });
    });

    it("should send requests when shop name is valid and a category with products is selected", () => {
      cy.get("[data-testid=shop-name-input]").clear().type("shopName");
      cy.get('input[value="pizza"]').check();

      cy.get("[data-testid=submit-button]").click();

      cy.wait("@update_company").then(({ request }) => {
        expect(request.body.company.name).to.eq("shopName");
      });

      cy.wait("@copy_products").then(() => {
        expect(copyProductsCalled).to.be.true;
      });

      cy.wait("@check_copy_products_status").then(() => {
        expect(checkCopyProductsStatusCalled).to.be.true;
      });
    });

    // context("showing notifications on requests", () => {
    //   it("should show SUCCESS notification when requests are successful", () => {
    //     cy.get("[data-testid=shop-name-input]").clear().type("shopName");
    //     cy.get('input[value="pizza"]').check();

    //     cy.get("[data-testid=submit-button]").click();

    //     cy.wait("@update_company");
    //     cy.wait("@copy_products");
    //     cy.wait("@check_copy_products_status");

    //     cy.get("#profiling_success_notification").contains(
    //       translation.routes.shop.profiling.success_message
    //     );
    //   });
    // });
  });
});
