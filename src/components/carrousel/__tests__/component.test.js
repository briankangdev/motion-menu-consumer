import Carrousel from "../Carrousel.svelte";
import { render, fireEvent, screen, cleanup } from "@testing-library/svelte";
import { describe, it, expect, afterEach, vi } from "vitest";

const props = {
  products: [
    {
      id: 997,
      name: "Pepsi",
      description: "",
      price: 0,
      images: [
        { id: 322, public_id: "proveat/prod/images/t6zti2ubb5lpyjr0q7nz" },
      ],
      images_count: 1,
      videos: [],
      videos_count: 0,
      tags: [{ id: 53, name: "bebidas" }],
      likes_count: 1,
      created_at: "2023-01-12T17:21:13.526Z",
    },
    {
      id: 998,
      name: "Coca Cola",
      description: "",
      price: 0,
      images: [
        { id: 323, public_id: "proveat/prod/images/2jxqjxqjxqjxqjxqjxqj" },
      ],
      images_count: 1,
      videos: [],
      videos_count: 0,
      tags: [{ id: 53, name: "bebidas" }],
      likes_count: 1,
      created_at: "2023-01-12T17:21:13.526Z",
    },
    //6 more products
    {
      id: 1003,
      name: "Coca Cola zero",
      description: "",
      price: 0,
      images: [
        { id: 328, public_id: "proveat/prod/images/2jxqjxqjxqjxqjxqjxqj" },
      ],
      images_count: 1,
      videos: [],
      videos_count: 0,
      tags: [{ id: 53, name: "bebidas" }],
      likes_count: 1,
      created_at: "2023-01-12T17:21:13.526Z",
    },
    {
      id: 1004,
      name: "Coca Cola light",
      description: "",
      price: 0,
      images: [
        { id: 329, public_id: "proveat/prod/images/2jxqjxqjxqjxqjxqjxqj" },
      ],
      images_count: 1,
      videos: [],
      videos_count: 0,
      tags: [{ id: 53, name: "bebidas" }],
      likes_count: 1,
      created_at: "2023-01-12T17:21:13.526Z",
    },
  ],
  company_id: "test",
  variant: "shadow",
};

describe("Carrousel component", () => {
  afterEach(cleanup);

  it("should render the component", () => {
    render(Carrousel, props);
    const carrousel = screen.queryByTestId("carrousel");

    expect(carrousel).toBeTruthy();
  });

  it("should render the product cards", () => {
    render(Carrousel, props);
    const productCards = screen.queryAllByTestId("product-media-card");

    expect(productCards.length).toBe(props.products.length);
  });

  it("should render the left arrow", () => {
    render(Carrousel, props);
    const leftArrow = screen.queryByTestId("carrousel-arrow-left");

    expect(leftArrow).toBeTruthy();
  });

  it("should render the right arrow", () => {
    render(Carrousel, props);
    const rightArrow = screen.queryByTestId("carrousel-arrow-right");

    expect(rightArrow).toBeTruthy();
  });

  it("scroll should work", async () => {
    render(Carrousel, props);
    const carrousel_wrapper = screen.queryByTestId("carrousel-wrapper");
    const scroll_move = 100;

    expect(carrousel_wrapper.scrollLeft).toBe(0);

    await fireEvent.scroll(carrousel_wrapper, {
      target: { scrollLeft: scroll_move },
    });

    expect(carrousel_wrapper.scrollLeft).toBe(scroll_move);
  });
});
