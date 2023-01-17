import Like from "../Like.svelte";
import { render, fireEvent, screen, cleanup } from "@testing-library/svelte";
import { describe, it, expect, vi, afterEach } from "vitest";

const props = {
  createLikeCallback: vi.fn(),
  removeLikeCallback: vi.fn(),
  isLiked: null,
  likes_count: null,
};

describe("Like component", () => {
  afterEach(cleanup); // cleanup is required to remove the component from the DOM after each test

  it("Component without likes", () => {
    const likes_count = 0;

    render(Like, {
      ...props,
      likes_count,
    });

    const likes = screen.queryByTestId("likes-count");
    expect(likes).toBeNull();
  });

  it("Component with likes", () => {
    const likes_count = 10;

    render(Like, {
      ...props,
      likes_count,
    });

    const likes = screen.queryByTestId("likes-count");
    expect(likes.textContent).toBe(likes_count.toString());
  });

  it("Component without user like", () => {
    render(Like, {
      ...props,
      isLiked: false,
    });

    const likeIcon = screen.queryByTestId("like-icon");
    expect(likeIcon).toBeTruthy();

    const likeIconLiked = screen.queryByTestId("like-icon-liked");
    expect(likeIconLiked).toBeNull();
  });

  it("Component with user like", () => {
    render(Like, {
      ...props,
      isLiked: true,
    });

    const likeIcon = screen.queryByTestId("like-icon");
    expect(likeIcon).toBeNull();

    const likeIconLiked = screen.queryByTestId("like-icon-liked");
    expect(likeIconLiked).toBeTruthy();
  });

  it("Calling like function", async () => {
    render(Like, {
      ...props,
      isLiked: false,
    });

    const likeIcon = screen.queryByTestId("like-icon");
    await fireEvent.click(likeIcon);

    expect(props.createLikeCallback).toBeCalled();
  });

  it("Calling unlike function", async () => {
    render(Like, {
      ...props,
      isLiked: true,
    });

    const likeIconLiked = screen.queryByTestId("like-icon-liked");
    await fireEvent.click(likeIconLiked);

    expect(props.removeLikeCallback).toBeCalled();
  });
});
