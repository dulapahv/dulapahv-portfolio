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

  it("should render top bar with logo and name", () => {
    render(<TopBar />);

    const homeLink = screen.getByRole("link", { name: GO_TO_HOME_REGEX });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");

    const logo = screen.getByAltText("Mirai logo");
    expect(logo).toBeInTheDocument();
  });

  it("should render theme switcher", () => {
    const { container } = render(<TopBar />);

    const themeSwitcher = container.querySelector(".relative");
    expect(themeSwitcher).toBeInTheDocument();
  });

  it("should be visible initially", () => {
    const { container } = render(<TopBar />);

    const topBar = container.querySelector(".fixed");
    expect(topBar).toBeInTheDocument();
  });

  it("should hide when scrolling down", () => {
    render(<TopBar />);

    Object.defineProperty(window, "scrollY", { writable: true, value: 100 });
    fireEvent.scroll(window);

    Object.defineProperty(window, "scrollY", { writable: true, value: 200 });
    fireEvent.scroll(window);
  });

  it("should show when scrolling up", () => {
    render(<TopBar />);

    Object.defineProperty(window, "scrollY", { writable: true, value: 200 });
    fireEvent.scroll(window);

    Object.defineProperty(window, "scrollY", { writable: true, value: 100 });
    fireEvent.scroll(window);
  });

  it("should always show when near top", () => {
    render(<TopBar />);

    Object.defineProperty(window, "scrollY", { writable: true, value: 5 });
    fireEvent.scroll(window);
  });
});
