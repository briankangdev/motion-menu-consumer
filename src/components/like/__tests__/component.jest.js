import Like from "../Like.svelte";
import { render, fireEvent } from "@testing-library/svelte";

describe("Like component", () => {
  it("Element with likes", () => {
    const likes_count = 10;

    const { queryByTestId } = render(Like, {
      likes_count,
    });

    const likes = queryByTestId("likes-count");
    expect(likes.textContent).toBe(likes_count.toString());
  });

  it("Element without likes", () => {
    const likes_count = 0;

    const { queryByTestId } = render(Like, {
      likes_count,
    });

    const likes = queryByTestId("likes-count");
    expect(likes).toBeNull();
  });

  it("Render liked icon when it´s clicked", async () => {
    const { queryByTestId } = render(Like, {
      createLikeCallback: jest.fn(),
    });

    const likeIcon = queryByTestId("like-icon");
    await fireEvent.click(likeIcon);

    const likeIconLiked = queryByTestId("like-icon-liked");
    expect(likeIconLiked).toBeTruthy();
  });

  it("Calling like function", async () => {
    const createLikeCallback = jest.fn();

    const { queryByTestId } = render(Like, {
      createLikeCallback,
    });

    const likeIcon = queryByTestId("like-icon");
    await fireEvent.click(likeIcon);

    expect(createLikeCallback).toBeCalled();
  });

  it("Calling unlike function", async () => {
    const removeLikeCallback = jest.fn();

    const { queryByTestId } = render(Like, {
      removeLikeCallback,
      isLiked: true,
    });

    const likeIconLiked = queryByTestId("like-icon-liked");
    await fireEvent.click(likeIconLiked);

    expect(removeLikeCallback).toBeCalled();
  });
});
