import ProductCard from "../ProductCard.svelte";
import { render, fireEvent, screen, cleanup } from "@testing-library/svelte";
import { describe, it, expect, afterEach, vi } from "vitest";
import userEvent from "@testing-library/user-event";

const props = {
  company_id: "test_company",
  product: {
    id: "123",
    name: "Test Product",
    description: "Test Description",
    price: 10,
  },
  handleTrack: vi.fn(),
  enable_link: true,
};

describe("Product Card component", () => {
  afterEach(cleanup);

  it("should render the component", () => {
    render(ProductCard, props);
    const card = screen.queryByTestId("product-card");
    expect(card).toBeTruthy();
  });

  it("should render name", () => {
    render(ProductCard, props);
    const name = screen.queryByTestId("product-name");
    expect(name.textContent).toContain(props.product.name);
  });

  it("should render description", () => {
    render(ProductCard, props);
    const description = screen.queryByTestId("product-description");
    expect(description.textContent).toContain(props.product.description);
  });

  it("should render price", () => {
    render(ProductCard, props);
    const price = screen.queryByTestId("product-price");
    expect(price.textContent).toContain(props.product.price);
  });

  // it("should render link to product page and pass company_id and product_id", () => {
  //   render(ProductCard, props);
  //   const link = screen.queryByTestId("product-link"); 

  //   expect(link.href).toContain(props.company_id);
  //   expect(link.href).toContain(props.product.id);
  // });

  it("should call handleTrack function when card is clicked", async () => {
    const user = userEvent.setup();

    render(ProductCard, props);
    const card = screen.queryByTestId("product-link");

    await user.click(card);

    expect(props.handleTrack).toHaveBeenCalled();
  });
});
