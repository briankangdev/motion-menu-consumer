import { goto } from "$app/navigation";
import { render, fireEvent, screen, cleanup } from "@testing-library/svelte";
import { describe, it, expect, afterEach, vi } from "vitest";
import HistoryBack from "../HistoryBack.svelte";

describe("HistoryBack component", () => {
  afterEach(cleanup);

  it("should render the button", () => {
    render(HistoryBack);
    const button = screen.queryByTestId("history-back-button");

    expect(button).toBeTruthy();
  });

  it("should call window.history.back", async () => {
    window.history.back = vi.fn();

    render(HistoryBack);
    const button = screen.queryByTestId("history-back-button");

    await fireEvent.click(button);

    expect(window.history.back).toHaveBeenCalled();
  });

  it("if props.goTo is passed, should call goto(goTo) instead of window.history.back", async () => {
    const goTo = "/test";
    window.history.back = vi.fn();

    vi.mock("$app/navigation", () => {
      const goto = vi.fn();
      return { goto };
    });

    render(HistoryBack, { goTo });
    const button = screen.queryByTestId("history-back-button");

    await fireEvent.click(button);

    expect(window.history.back).not.toHaveBeenCalled();
    expect(goto).toHaveBeenCalledWith(goTo);
  });
});
