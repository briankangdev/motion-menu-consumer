import Review from "../Review.svelte";
import { render, fireEvent, screen, cleanup } from "@testing-library/svelte";
import { describe, it, expect, afterEach } from "vitest";
import { init } from "svelte-i18n";

const props = {
  name: "Test",
  body: "Test body",
  created_at: "2022-01-01T00:00:00.000Z", // 1 year ago
  short_body_char_limit: 150,
  //link: "/review" --> optional
  //clickable: true --> optional
};

// init the i18n module
init({ initialLocale: "en" });

// simulate the actual Date object
const mockDate = new Date("2023-01-18T19:00:00.000Z");
global.Date = class extends Date {
  constructor(...args) {
    if (args.length) {
      return super(...args);
    }
    return mockDate;
  }
};

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
      const text = "a".repeat(props.short_body_char_limit + 1);
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
      const text = "a".repeat(props.short_body_char_limit - 1);
      render(Review, { ...props, body: text });

      const body = screen.queryByTestId("body");
      expect(body.textContent).toBe(text);

      const more = screen.queryByTestId("more");
      expect(more).toBeNull();
    });

    it("render the full body if the 'more' button is clicked", async () => {
      const text = "a".repeat(props.short_body_char_limit + 10);

      render(Review, { ...props, body: text });
      const body = screen.queryByTestId("body");
      expect(body.textContent).not.toBe(text);

      let more = screen.queryByTestId("more");
      await fireEvent.click(more);

      expect(body.textContent).toBe(text);
    });

    it("hide the 'more' button once is clicked", async () => {
      const text = "a".repeat(props.short_body_char_limit + 10);

      render(Review, { ...props, body: text });
      let more = screen.queryByTestId("more");
      expect(more).toBeTruthy();

      await fireEvent.click(more);

      more = screen.queryByTestId("more");
      expect(more).toBeNull();
    });
  });

  describe("render the correct translation variant for the date", () => {
    it("1 year", () => {
      render(Review, props); // render with 1 year ago
      const date = screen.queryByTestId("date");
      expect(date.textContent).contains("year_ago");
    });

    it("2 years", () => {
      render(Review, { ...props, created_at: "2021-01-01T00:00:00.000Z" }); // render with 2 years ago
      const date = screen.queryByTestId("date");
      expect(date.textContent).contains("years_ago");
    });

    it("1 month", () => {
      render(Review, { ...props, created_at: "2022-12-01T00:00:00.000Z" }); // render with 1 month ago
      const date = screen.queryByTestId("date");
      expect(date.textContent).contains("month_ago");
    });

    it("2 months", () => {
      render(Review, { ...props, created_at: "2022-11-01T00:00:00.000Z" }); // render with 2 months ago
      const date = screen.queryByTestId("date");
      expect(date.textContent).contains("months_ago");
    });

    it("1 week", () => {
      render(Review, { ...props, created_at: "2023-01-11T00:00:00.000Z" }); // render with 1 week ago
      const date = screen.queryByTestId("date");
      expect(date.textContent).contains("week_ago");
    });

    it("2 weeks", () => {
      render(Review, { ...props, created_at: "2023-01-03T00:00:00.000Z" }); // render with 2 weeks ago
      const date = screen.queryByTestId("date");
      expect(date.textContent).contains("weeks_ago");
    });

    it("1 day", () => {
      render(Review, { ...props, created_at: "2023-01-17T00:00:00.000Z" }); // render with 1 day ago
      const date = screen.queryByTestId("date");
      expect(date.textContent).contains("day_ago");
    });

    it("2 days", () => {
      render(Review, { ...props, created_at: "2023-01-15T00:00:00.000Z" }); // render with 2 days ago
      const date = screen.queryByTestId("date");
      expect(date.textContent).contains("days_ago");
    });
  });

  describe("link to the review page", () => {
    it("not render the link if the 'clickable' prop is false", () => {
      render(Review, {
        ...props,
        clickable: false,
      });

      const link = screen.queryByTestId("link");
      expect(link).toBeNull();
    });

    it("render the link if the 'clickable' prop is true", () => {
      render(Review, {
        ...props,
        clickable: true,
      });

      const link = screen.queryByTestId("link");
      expect(link).toBeTruthy();
    });

    it("render the link with the correct href", () => {
      const link_href = "/test";

      render(Review, {
        ...props,
        clickable: true,
        link: link_href,
      });

      const link = screen.queryByTestId("link");
      expect(link.getAttribute("href")).toBe(link_href);
    });
  });
});
