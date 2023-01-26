import Button from "../Button.svelte";
import { render, fireEvent, screen, cleanup } from "@testing-library/svelte";
import { describe, it, expect, vi, afterEach } from "vitest";

const props = {
  onClick: vi.fn(),
  handleButtonTrack: vi.fn(),
  title: "Button",
  variant: null,
  test_id: "test_id",
};

const variants = ["primary", "black", "borderless", "blue"];

describe("Button component", () => {
  afterEach(cleanup);

  it("should be got by test id", () => {
    render(Button, props);
    const button = screen.getByTestId(props.test_id);

    expect(button).toBeTruthy();
  });

  it("should render button", () => {
    render(Button, props);
    const button = screen.getByTestId(props.test_id);

    expect(button).toBeTruthy();
  });

  describe("should render different variants", () => {
    variants.forEach((variant) => {
      it(`should render ${variant} variant class`, () => {
        render(Button, { ...props, variant });
        const button = screen.getByTestId(props.test_id);

        expect(button.className).toContain("button " + variant);
      });
    });

    it("when variant is not in the list, should render a default variant", () => {
      const wrongVariant = "test";
      const defaultVariant = variants[0];
      render(Button, { ...props, variant: wrongVariant });
      const button = screen.getByTestId(props.test_id);

      expect(button.className).not.toContain("button " + wrongVariant);
      expect(button.className).toContain("button " + defaultVariant);
    });
  });

  it("should render title", () => {
    render(Button, props);
    const button = screen.getByTestId(props.test_id);

    expect(button.textContent).toContain(props.title);
  });

  it("should call onClick function when button is clicked", () => {
    render(Button, props);
    const button = screen.getByTestId(props.test_id);

    fireEvent.click(button);

    expect(props.onClick).toHaveBeenCalled();
  });

  it("should call handleButtonTrack function when button is clicked", () => {
    render(Button, props);
    const button = screen.getByTestId(props.test_id);

    fireEvent.click(button);

    expect(props.handleButtonTrack).toHaveBeenCalled();
  });
});
