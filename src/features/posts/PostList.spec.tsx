/**
 * @vitest-environment jsdom
 */
import { renderWithProviders } from "../../utils/test-utils";
import PostList from "./PostList";
import { it, expect, beforeEach, vi, afterEach, describe } from "vitest";
import { cleanup, fireEvent, screen } from "@testing-library/react";

// describe("Rendering Post List Component", async () => {
it("should render a loading indicator", async () => {
  renderWithProviders(<PostList />, {
    preloadedState: {
      posts: {
        status: "loading",
        error: null,
        posts: null,
      },
    },
  });
  const loadingIndicator = screen.getByText("Loading...");
  expect(loadingIndicator.innerHTML).toBe("Loading...");
});

describe("should render a list of posts", async () => {
  renderWithProviders(<PostList />, {
    preloadedState: {
      posts: {
        status: "succeeded",
        error: null,
        posts: [
          {
            id: "1",
            title: "Post 1",
            body: "Body 1",
            created_at: "2020-01-01",
            hidden: false,
          },
          {
            id: "2",
            title: "Post 2",
            body: "Body 2",
            created_at: "2020-02-02",
            hidden: false,
          },
          {
            id: "3",
            title: "Post 3 -- Hidden",
            body: "Body 3 -- Hidden",
            created_at: "2020-03-03",
            hidden: true,
          },
        ],
      },
    },
  });
  it("should render a list of posts", async () => {
    const post1 = screen.getByText("Post 1");
    expect(post1.innerHTML).toBe("Post 1");
    const post2 = screen.getByText("Post 2");
    expect(post2.innerHTML).toBe("Post 2");
  });
  it("should not render hidden posts", async () => {
    expect(screen.queryByText("Post 3 -- Hidden")).toBeNull();
  });
});

it("should render an error message", async () => {
  renderWithProviders(<PostList />, {
    preloadedState: {
      posts: {
        status: "failed",
        error: "Testing error message",
        posts: null,
      },
    },
  });
  screen.debug();

  const errorMessage = screen.getByTestId("errorMessage");
  expect(errorMessage.innerHTML).toContain("Something went wrong");
});

// });
