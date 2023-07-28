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
    it("checks error message when shop name is empty", () => {
      cy.get("[data-testid=submit-button]").click();
      console.log(translation);

      cy.get("[data-testid=error-message]").contains(
        translation.routes.shop.profiling.input_error.length
      );
    });

    it("checks error message when shop name is too short", () => {
      const shortName = "ab";

      cy.get("[data-testid=shop-name-input]").clear().type(shortName).blur();

      cy.get("[data-testid=error-message]").contains(
        translation.routes.shop.profiling.input_error.length
      );
    });

    it("checks error message when shop name is too long", () => {
      const longName = Array(32).join("a"); // this will create a string with 31 characters

      cy.get("[data-testid=shop-name-input]").clear().type(longName).blur();

      cy.get("[data-testid=error-message]").contains(
        translation.routes.shop.profiling.input_error.length
      );
    });

    it("checks error message when shop name has special characters", () => {
      const specialCharName = "shop$Name";

      cy.get("[data-testid=shop-name-input]")
        .clear()
        .type(specialCharName)
        .blur();

      cy.get("[data-testid=error-message]").contains(
        translation.routes.shop.profiling.input_error.no_special
      );
    });

    it("checks NO error message when shop name is valid", () => {
      const validName = "shopName";

      cy.get("[data-testid=shop-name-input]").clear().type(validName).blur();

      cy.get("[data-testid=error-message]").should("not.exist");
    });
  });

  context("redirection to loading page", () => {
    it("redirects to loading page when shop name is valid", () => {
      cy.get("[data-testid=shop-name-input]").clear().type("shopName");

      cy.get("[data-testid=submit-button]").click();

      cy.url().should("include", "/loading");
    });

    it("doesn't redirect to loading page when shop name is invalid", () => {
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
    let copy_pruducts_called = false;
    let check_copy_products_status_called = false;

    beforeEach(() => {
      cy.intercept("PUT", "/api/v1/companies/profile").as("update_company");
      cy.intercept(
        "POST",
        "/api/v1/companies/copy_content_from_template",
        () => {
          copy_pruducts_called = true;
        }
      ).as("copy_products");
      cy.intercept(
        "GET",
        "/api/v1/companies/copy_content_from_template/*",
        () => {
          check_copy_products_status_called = true;
        }
      ).as("check_copy_products_status");
    });

    context("name is valid and category is 'empty'", () => {
      it("sends only UPDATE SHOP NAME request", () => {
        cy.get("[data-testid=shop-name-input]").clear().type("shopName");
        cy.get('input[value="empty"]').should("be.checked");

        cy.get("[data-testid=submit-button]").click();

        cy.wait("@update_company").then(({ request }) => {
          expect(request.body.company.name).to.eq("shopName");
        });

        cy.then(() => {
          expect(copy_pruducts_called).to.be.false;
          expect(check_copy_products_status_called).to.be.false;
        });
      });
    });

    context("name is valid and a category with products is selected", () => {
      it("sends requests", () => {
        cy.get("[data-testid=shop-name-input]").clear().type("shopName");
        cy.get('input[value="pizza"]').check();

        cy.get("[data-testid=submit-button]").click();

        cy.wait("@update_company").then(({ request }) => {
          expect(request.body.company.name).to.eq("shopName");
        });

        cy.wait("@copy_products").then(() => {
          expect(copy_pruducts_called).to.be.true;
        });

        cy.wait("@check_copy_products_status").then(() => {
          expect(check_copy_products_status_called).to.be.true;
        });
      });
    });
  });
});
