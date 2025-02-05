import Review from "../Review.svelte";
import { render, fireEvent, screen, cleanup } from "@testing-library/svelte";
import { describe, it, expect, afterEach } from "vitest";
import { init } from "svelte-i18n";

const props = {
  name: "Test",
  body: "Test body",
  created_at: "2022-01-01T00:00:00.000Z", // 1 year ago
  //link: "/review" --> optional
  //clickable: true --> optional
};

// init the i18n module
init({ initialLocale: "en" });

describe("review component", () => {
  afterEach(cleanup); // cleanup is required to remove the component from the DOM after each test

  it("render name, body and date", () => {
    render(Review, props);

    const name = screen.queryByTestId("name");
    expect(name.textContent).toBe(props.name);

    const body = screen.queryByTestId("body");
    expect(body).toBeTruthy();

    const date = screen.queryByTestId("date");
    expect(date).toBeTruthy(); // testing if the date is rendered, the value will be tested in the next test
  });

  describe("body of the review", () => {
    it("not render the entire body if it's too long, render the 'more' button", () => {
      const text = "a".repeat(151);
      render(Review, {
        ...props,
        body: text,
      });

      const body = screen.queryByTestId("body");
      expect(body.textContent).not.contains(text);

      const more = screen.queryByTestId("more");
      expect(more).toBeTruthy();
    });

    it("render the full body if it's short, don't render the 'more' button", () => {
      const text = "a".repeat(149);
      render(Review, { ...props, body: text });

      const body = screen.queryByTestId("body");
      expect(body.textContent).toContain(text);

      const more = screen.queryByTestId("more");
      expect(more).toBeNull();
    });

    it("render the full body if the 'more' button is clicked", async () => {
      const text = "a".repeat(160);

      render(Review, { ...props, body: text });
      const body = screen.queryByTestId("body");
      expect(body.textContent).not.toContain(text);

      let more = screen.queryByTestId("more");
      await fireEvent.click(more);

      expect(body.textContent).toContain(text);
    });

    it("hide the 'more' button once is clicked", async () => {
      const text = "a".repeat(160);

      render(Review, { ...props, body: text });
      let more = screen.queryByTestId("more");
      expect(more).toBeTruthy();

      await fireEvent.click(more);

      more = screen.queryByTestId("more");
      expect(more).toBeNull();
    });
  });
});
