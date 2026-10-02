import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CardErrorBoundary } from "./card-error-boundary";

const TRY_AGAIN_REGEX = /try again/i;
const COULD_NOT_LOAD_REGEX = /couldn't be loaded/i;

function Boom(): never {
  throw new Error("boom");
}

describe("CardErrorBoundary", () => {
  beforeEach(() => {
    // React logs the caught error; keep the test output clean.
    vi.spyOn(console, "error").mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render children when nothing throws", () => {
    render(
      <CardErrorBoundary title="Spotify">
        <p>Card content</p>
      </CardErrorBoundary>
    );

    expect(screen.getByText("Card content")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: TRY_AGAIN_REGEX })
    ).not.toBeInTheDocument();
  });

  it("should render the fallback with the card title when a child throws", () => {
    render(
      <CardErrorBoundary title="Spotify">
        <Boom />
      </CardErrorBoundary>
    );

    expect(
      screen.getByRole("heading", { name: "Spotify" })
    ).toBeInTheDocument();
    expect(screen.getByText(COULD_NOT_LOAD_REGEX)).toBeInTheDocument();
  });

  it("should offer a retry button in the fallback", () => {
    render(
      <CardErrorBoundary title="Spotify">
        <Boom />
      </CardErrorBoundary>
    );

    expect(
      screen.getByRole("button", { name: TRY_AGAIN_REGEX })
    ).toBeInTheDocument();
  });

  it("should apply the min-height class to the fallback card", () => {
    const { container } = render(
      <CardErrorBoundary minHeight="min-h-96" title="Spotify">
        <Boom />
      </CardErrorBoundary>
    );

    expect(container.firstElementChild).toHaveClass("min-h-96");
  });

  it("should match snapshot of the fallback", () => {
    const { container } = render(
      <CardErrorBoundary title="Spotify">
        <Boom />
      </CardErrorBoundary>
    );

    expect(container).toMatchSnapshot();
  });
});
