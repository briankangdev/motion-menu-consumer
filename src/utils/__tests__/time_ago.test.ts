import { describe, it, expect } from "vitest";
import { time_ago } from "../time_ago";

// simulate the actual Date object
const today: string = "2023-01-18T19:00:00.000Z";

(global as any).Date = class extends Date {
  constructor(...args: string[]) {
    if (args.length) {
      super(args[0]);
    } else {
      super(today);
    }
  }
};

describe("time ago function", () => {
  describe("render the correct message and values for the date", () => {
    it("1 year", () => {
      const date = "2022-01-01T00:00:00.000Z";
      const { message, values } = time_ago(date);

      expect(message).contains("year_ago");
      expect(values).toEqual({ years: 1 });
    });

    it("2 years", () => {
      const date = "2021-01-01T00:00:00.000Z";
      const { message, values } = time_ago(date);

      expect(message).contains("years_ago");
      expect(values).toEqual({ years: 2 });
    });

    it("1 month", () => {
      const date = "2022-12-01T00:00:00.000Z";
      const { message, values } = time_ago(date);

      expect(message).contains("month_ago");
      expect(values).toEqual({ months: 1 });
    });

    it("2 months", () => {
      const date = "2022-11-01T00:00:00.000Z";
      const { message, values } = time_ago(date);

      expect(message).contains("months_ago");
      expect(values).toEqual({ months: 2 });
    });

    it("1 week", () => {
      const date = "2023-01-11T00:00:00.000Z";
      const { message, values } = time_ago(date);

      expect(message).contains("week_ago");
      expect(values).toEqual({ weeks: 1 });
    });

    it("2 weeks", () => {
      const date = "2023-01-04T00:00:00.000Z";
      const { message, values } = time_ago(date);

      expect(message).contains("weeks_ago");
      expect(values).toEqual({ weeks: 2 });
    });

    it("1 day", () => {
      const date = "2023-01-17T00:00:00.000Z";
      const { message, values } = time_ago(date);

      expect(message).contains("day_ago");
      expect(values).toEqual({ days: 1 });
    });

    it("2 days", () => {
      const date = "2023-01-16T00:00:00.000Z";
      const { message, values } = time_ago(date);

      expect(message).contains("days_ago");
      expect(values).toEqual({ days: 2 });
    });
  });
});
