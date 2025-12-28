import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Spinner } from "./spinner";

describe("Spinner", () => {
  it("should render spinner with loading status", () => {
    render(<Spinner />);

    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute("aria-label", "Loading");
  });

  it("should render 12 spinner bars", () => {
    const { container } = render(<Spinner />);

    const spinnerBars = container.querySelectorAll('[aria-hidden="true"]');
    expect(spinnerBars).toHaveLength(12);
  });

  it("should render with default size", () => {
    const { container } = render(<Spinner />);
    const spinner = container.querySelector('[role="status"]');

    expect(spinner).not.toHaveAttribute("style");
  });

  it("should render with custom numeric size", () => {
    const { container } = render(<Spinner size={40} />);
    const spinner = container.querySelector('[role="status"]');

    expect(spinner).toHaveAttribute("style", "width: 40px; height: 40px;");
  });

  it("should apply custom className", () => {
    const { container } = render(<Spinner className="custom-class" />);
    const spinner = container.querySelector('[role="status"]');

    expect(spinner).toHaveClass("custom-class");
  });

  it("should have screen reader text", () => {
    render(<Spinner />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should apply correct rotation to each bar", () => {
    const { container } = render(<Spinner />);
    const spinnerBars = container.querySelectorAll('[aria-hidden="true"]');

    // Check first bar rotation
    expect(spinnerBars[0]).toHaveStyle({ transform: "rotate(0deg)" });
    // Check second bar rotation
    expect(spinnerBars[1]).toHaveStyle({ transform: "rotate(30deg)" });
    // Check last bar rotation
    expect(spinnerBars[11]).toHaveStyle({ transform: "rotate(330deg)" });
  });

  it("should match snapshot", () => {
    const { container } = render(<Spinner />);
    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with custom size", () => {
    const { container } = render(<Spinner size={50} />);
    expect(container).toMatchSnapshot();
  });
});
