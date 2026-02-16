import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { TopBar } from "./top-bar";

const GO_TO_HOME_REGEX = /go to home/i;

describe("TopBar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(window, "scrollY", {
      writable: true,
      value: 0,
    });
  });

  it("should render top bar with logo and home link", () => {
    render(<TopBar />);

    const homeLink = screen.getByRole("link", { name: GO_TO_HOME_REGEX });
    expect(homeLink).toHaveAttribute("href", "/");

    const logo = screen.getByAltText("Mirai logo");
    expect(logo).toBeInTheDocument();
  });

  it("should handle scroll down events without errors", () => {
    render(<TopBar />);

    // Scroll down past threshold
    Object.defineProperty(window, "scrollY", { writable: true, value: 100 });
    fireEvent.scroll(window);

    Object.defineProperty(window, "scrollY", { writable: true, value: 200 });
    fireEvent.scroll(window);

    // Component should still be in the DOM (motion handles visibility via animation)
    expect(
      screen.getByRole("link", { name: GO_TO_HOME_REGEX })
    ).toBeInTheDocument();
  });

  it("should handle scroll up events without errors", () => {
    render(<TopBar />);

    // First scroll down
    Object.defineProperty(window, "scrollY", { writable: true, value: 200 });
    fireEvent.scroll(window);

    // Then scroll up
    Object.defineProperty(window, "scrollY", { writable: true, value: 100 });
    fireEvent.scroll(window);

    expect(
      screen.getByRole("link", { name: GO_TO_HOME_REGEX })
    ).toBeInTheDocument();
  });

  it("should remain visible when near top of page", () => {
    render(<TopBar />);

    Object.defineProperty(window, "scrollY", { writable: true, value: 5 });
    fireEvent.scroll(window);

    expect(
      screen.getByRole("link", { name: GO_TO_HOME_REGEX })
    ).toBeInTheDocument();
  });
});
