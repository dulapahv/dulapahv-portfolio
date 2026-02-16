import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import ErrorPage from "./error";

// Regex patterns for testing
const ERROR_MESSAGE_REGEX = /An error occurred while rendering this page/i;
const CONTACT_ME_REGEX = /contact me/i;
const TRY_AGAIN_REGEX = /try again/i;
const DETAILS_REGEX = /Details:/i;
const NAME_TEST_ERROR_REGEX = /Name: TestError/i;
const MESSAGE_TEST_ERROR_REGEX = /Message: This is a test error/i;
const CAUSE_TEST_REGEX = /Cause: Test cause/i;
const DIGEST_ABC123_REGEX = /Digest: abc123/i;
const NAME_NA_REGEX = /Name: N\/A/i;
const MESSAGE_NA_REGEX = /Message: N\/A/i;
const CAUSE_NA_REGEX = /Cause: N\/A/i;
const DIGEST_NA_REGEX = /Digest: N\/A/i;

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a className={className} href={href}>
      {children}
    </a>
  ),
}));

vi.mock("@/components/footer", () => ({
  Footer: () => <footer data-testid="footer">Footer</footer>,
}));

describe("Error Page", () => {
  const mockError = {
    name: "TestError",
    message: "This is a test error",
    digest: "abc123",
    cause: "Test cause",
  } as Error & { digest?: string };

  const mockReset = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock console.error to avoid cluttering test output
    vi.spyOn(console, "error").mockImplementation(() => {
      // Intentionally empty to suppress console.error in tests
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render error heading", () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);
    expect(
      screen.getByRole("heading", { name: "Oops! Something Went Wrong" })
    ).toBeInTheDocument();
  });

  it("should render error message with contact link", () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);
    expect(screen.getByText(ERROR_MESSAGE_REGEX)).toBeInTheDocument();

    const contactLink = screen.getByRole("link", { name: CONTACT_ME_REGEX });
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute(
      "href",
      expect.stringContaining("/contact")
    );
  });

  it("should render try again button", () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);
    const tryAgainButton = screen.getByRole("button", {
      name: TRY_AGAIN_REGEX,
    });
    expect(tryAgainButton).toBeInTheDocument();
  });

  it("should call reset function when try again button is clicked", async () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);

    const tryAgainButton = screen.getByRole("button", {
      name: TRY_AGAIN_REGEX,
    });
    await userEvent.click(tryAgainButton);

    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it("should display error details", () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);

    expect(screen.getByText(DETAILS_REGEX)).toBeInTheDocument();
    expect(screen.getByText(NAME_TEST_ERROR_REGEX)).toBeInTheDocument();
    expect(screen.getByText(MESSAGE_TEST_ERROR_REGEX)).toBeInTheDocument();
    expect(screen.getByText(CAUSE_TEST_REGEX)).toBeInTheDocument();
    expect(screen.getByText(DIGEST_ABC123_REGEX)).toBeInTheDocument();
  });

  it("should log error to console on mount", () => {
    const consoleErrorSpy = vi.spyOn(console, "error");
    render(<ErrorPage error={mockError} reset={mockReset} />);

    expect(consoleErrorSpy).toHaveBeenCalledWith(mockError);
  });

  it("should handle error without optional fields", () => {
    const minimalError = {
      name: "",
      message: "",
    } as Error & { digest?: string };

    render(<ErrorPage error={minimalError} reset={mockReset} />);

    expect(screen.getByText(NAME_NA_REGEX)).toBeInTheDocument();
    expect(screen.getByText(MESSAGE_NA_REGEX)).toBeInTheDocument();
    expect(screen.getByText(CAUSE_NA_REGEX)).toBeInTheDocument();
    expect(screen.getByText(DIGEST_NA_REGEX)).toBeInTheDocument();
  });

  it("should render Footer component", () => {
    render(<ErrorPage error={mockError} reset={mockReset} />);
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const { container } = render(
      <ErrorPage error={mockError} reset={mockReset} />
    );
    expect(container).toMatchSnapshot();
  });
});
