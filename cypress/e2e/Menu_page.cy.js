describe("Menu Page", () => {
  context("Products list", () => {
    beforeEach(() => {
      cy.intercept("GET", "/api/v1/shop/products?page=3&per_page=15").as(
        "get_products",
      );
      cy.visit("/shop/shop");
      // if the shop/shop product list has changed, must check the last request that is made
    });

    it("like a product", () => {
      cy.wait("@get_products").then(($interception) => {
        const productLikedID = Object.keys(
          $interception.response.body.data,
        ).shift();
        const testProductLikes =
          $interception.response.body.data[productLikedID].likes_count;

        cy.get(".like-container > .icon").first().click();
        cy.get(".like-container > .likes-count")
          .first()
          .should("contain", testProductLikes + 1);
      });
    });
  });
});
