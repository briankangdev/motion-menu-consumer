import ProductMediaCard from "../ProductMediaCard.svelte";
import { render, fireEvent, screen, cleanup } from "@testing-library/svelte";
import { describe, it, expect, afterEach, vi } from "vitest";

const props = {
  company_id: "test_company",
  product: {
    id: "123",
    name: "Test Product",
    price: 10,
    videos: [
      {
        id: "test_video_1",
        public_id: "test_video_1",
      },
      {
        id: "test_video_2",
        public_id: "test_video_2",
      },
    ],
    images: [
      {
        id: "test_image_1",
        public_id: "test_image_1",
      },
      {
        id: "test_image_2",
        public_id: "test_image_2",
      },
    ],
    videos_count: 2,
    images_count: 2,
  },
  variant: "primary",
  handleTrack: vi.fn(),
};

const variants = ["primary", "hover-shadow", "shadow"];

describe("Product Media Card component", () => {
  afterEach(cleanup);

  it("should render the component", () => {
    render(ProductMediaCard, props);
    const card = screen.queryByTestId("product-media-card");

    expect(card).toBeTruthy();
  });

  describe("should render different variants", () => {
    variants.forEach((variant) => {
      it(`should render ${variant} variant class`, () => {
        render(ProductMediaCard, { ...props, variant });
        const card = screen.queryByTestId("product-media-card");

        expect(card.className).toContain("product-media-card " + variant);
      });
    });

    it("when variant is not in the list, should render a default variant", () => {
      const wrongVariant = "test";
      const defaultVariant = variants[0];
      render(ProductMediaCard, { ...props, variant: wrongVariant });
      const card = screen.queryByTestId("product-media-card");

      expect(card.className).not.toContain(
        "product-media-card " + wrongVariant
      );
      expect(card.className).toContain("product-media-card " + defaultVariant);
    });

    it("when variant is 'primary', overlay should always have class 'hidden'", async () => {
      render(ProductMediaCard, { ...props, variant: "primary" });
      const overlay = screen.queryByTestId("product-overlay");
      expect(overlay.className).toContain("hidden");

      const card = screen.queryByTestId("product-media-card");
      await fireEvent.mouseOver(card);
      expect(overlay.className).toContain("hidden");
    });

    it("when variant is 'hover-shadow', overlay should have class 'hover' when mouse is over card", async () => {
      render(ProductMediaCard, { ...props, variant: "hover-shadow" });
      const overlay = screen.queryByTestId("product-overlay");
      expect(overlay.className).toContain("hidden");
      expect(overlay.className).not.toContain("hover");

      const card = screen.queryByTestId("product-media-card");
      await fireEvent.mouseOver(card);

      expect(overlay.className).not.toContain("hidden");
      expect(overlay.className).toContain("hover");
    });

    it("when variant is 'shadow', overlay should never have class 'hidden'", async () => {
      render(ProductMediaCard, { ...props, variant: "shadow" });
      const overlay = screen.queryByTestId("product-overlay");
      expect(overlay.className).not.toContain("hidden");

      const card = screen.queryByTestId("product-media-card");
      await fireEvent.mouseOver(card);

      expect(overlay.className).not.toContain("hidden");
    });
  });

  it("should render name", () => {
    render(ProductMediaCard, props);
    const name = screen.queryByTestId("product-name");

    expect(name.textContent).toContain(props.product.name);
  });

  it("should render price", () => {
    render(ProductMediaCard, props);
    const price = screen.queryByTestId("product-price");

    expect(price.textContent).toContain(props.product.price);
  });

  it("should render link to product page and pass company_id and product_id", () => {
    render(ProductMediaCard, props);
    const link = screen.queryByTestId("product-link");

    expect(link.href).toContain(props.company_id);
    expect(link.href).toContain(props.product.id);
  });

  it("should call handleTrack function when card is clicked", () => {
    render(ProductMediaCard, props);
    const card = screen.queryByTestId("product-media-card");

    fireEvent.click(card);

    expect(props.handleTrack).toHaveBeenCalled();
  });

  describe("media behaviour", () => {
    it("when exist videos and images, should render videos", () => {
      render(ProductMediaCard, props);
      const video = screen.queryByTestId("product-video");
      expect(video).toBeTruthy();

      const image = screen.queryByTestId("product-image");
      expect(image).toBeFalsy();
    });

    it("when exist images and not videos, should render images", () => {
      render(ProductMediaCard, {
        ...props,
        product: { ...props.product, videos_count: 0 },
      });

      const video = screen.queryByTestId("product-video");
      expect(video).toBeFalsy();

      const image = screen.queryByTestId("product-image");
      expect(image).toBeTruthy();
    });

    it("when not exist videos or images, shouldn't render media", () => {
      render(ProductMediaCard, {
        ...props,
        product: {
          ...props.product,
          videos_count: 0,
          images_count: 0,
        },
      });

      const video = screen.queryByTestId("product-video");
      expect(video).toBeFalsy();

      const image = screen.queryByTestId("product-image");
      expect(image).toBeFalsy();
    });
  });
});
