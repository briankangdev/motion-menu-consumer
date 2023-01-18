describe("Images Page", () => {
  context("Products in images", () => {
    beforeEach(() => {
      cy.intercept("GET", "/api/v1/shop/products?page=1&per_page=15").as(
        "get_products"
      );
      cy.visit("/shop/shop");
    });

    it("render products", () => {
      cy.wait("@get_products").then(() => {
        cy.get("#list-masonry > .card").should("not.have.length", 0);
      });
    });
  });
});
