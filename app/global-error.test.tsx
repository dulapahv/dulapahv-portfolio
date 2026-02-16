import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import GlobalError from "./global-error";

// Regex patterns for testing
const CRITICAL_ERROR_REGEX =
  /A critical error occurred and the application could not recover/i;
const CONTACT_ME_REGEX = /contact me/i;
const TRY_AGAIN_REGEX = /try again/i;
const DETAILS_REGEX = /Details:/i;
const NAME_CRITICAL_ERROR_REGEX = /Name: CriticalError/i;
const MESSAGE_CRITICAL_ERROR_REGEX = /Message: This is a critical test error/i;
const CAUSE_CRITICAL_REGEX = /Cause: Critical test cause/i;
const DIGEST_DEF456_REGEX = /Digest: def456/i;
const NAME_NA_REGEX = /Name: N\/A/i;
const MESSAGE_NA_REGEX = /Message: N\/A/i;
const CAUSE_NA_REGEX = /Cause: N\/A/i;
const DIGEST_NA_REGEX = /Digest: N\/A/i;
const CRITICAL_ERROR_HEADING_REGEX = /critical error/i;

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

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    width,
    height,
    ...props
  }: {
    src: string;
    alt: string;
    width?: number | string;
    height?: number | string;
    [key: string]: string | boolean | number | undefined;
  }) => (
    // biome-ignore lint/performance/noImgElement: Test mock requires img element
    <img
      alt={alt}
      height={height || 100}
      src={src}
      width={width || 100}
      {...props}
    />
  ),
}));

vi.mock("next-themes", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  useTheme: () => ({
    theme: "system",
    setTheme: vi.fn(),
    themes: ["light", "dark", "system"],
    systemTheme: "light",
    resolvedTheme: "light",
    forcedTheme: undefined,
  }),
}));

vi.mock("geist/font/mono", () => ({
  GeistMono: {
    variable: "geist-mono-variable",
    className: "geist-mono",
  },
}));

vi.mock("next/font/google", () => ({
  Raleway: () => ({
    className: "raleway-font",
    style: { fontFamily: "Raleway" },
  }),
  Archivo: () => ({
    className: "mocked-archivo",
  }),
}));

describe("Global Error Page", () => {
  const mockError = {
    name: "CriticalError",
    message: "This is a critical test error",
    digest: "def456",
    cause: "Critical test cause",
    stack: "Error stack trace here",
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

  it("should render critical error heading", () => {
    render(<GlobalError error={mockError} reset={mockReset} />);
    expect(
      screen.getByRole("heading", { name: "Critical Error" })
    ).toBeInTheDocument();
  });

  it("should render error message with contact link", () => {
    render(<GlobalError error={mockError} reset={mockReset} />);
    expect(screen.getByText(CRITICAL_ERROR_REGEX)).toBeInTheDocument();

    const contactLink = screen.getByRole("link", { name: CONTACT_ME_REGEX });
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute(
      "href",
      expect.stringContaining("/contact")
    );
  });

  it("should render try again button", () => {
    render(<GlobalError error={mockError} reset={mockReset} />);
    const tryAgainButton = screen.getByRole("button", {
      name: TRY_AGAIN_REGEX,
    });
    expect(tryAgainButton).toBeInTheDocument();
  });

  it("should call reset function when try again button is clicked", async () => {
    render(<GlobalError error={mockError} reset={mockReset} />);

    const tryAgainButton = screen.getByRole("button", {
      name: TRY_AGAIN_REGEX,
    });
    await userEvent.click(tryAgainButton);

    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it("should display error details", () => {
    render(<GlobalError error={mockError} reset={mockReset} />);

    expect(screen.getByText(DETAILS_REGEX)).toBeInTheDocument();
    expect(screen.getByText(NAME_CRITICAL_ERROR_REGEX)).toBeInTheDocument();
    expect(screen.getByText(MESSAGE_CRITICAL_ERROR_REGEX)).toBeInTheDocument();
    expect(screen.getByText(CAUSE_CRITICAL_REGEX)).toBeInTheDocument();
    expect(screen.getByText(DIGEST_DEF456_REGEX)).toBeInTheDocument();
  });

  it("should log error to console on mount", () => {
    const consoleErrorSpy = vi.spyOn(console, "error");
    render(<GlobalError error={mockError} reset={mockReset} />);

    expect(consoleErrorSpy).toHaveBeenCalledWith(mockError);
  });

  it("should handle error without optional fields", () => {
    const minimalError = {
      name: "",
      message: "",
    } as Error & { digest?: string };

    render(<GlobalError error={minimalError} reset={mockReset} />);

    expect(screen.getByText(NAME_NA_REGEX)).toBeInTheDocument();
    expect(screen.getByText(MESSAGE_NA_REGEX)).toBeInTheDocument();
    expect(screen.getByText(CAUSE_NA_REGEX)).toBeInTheDocument();
    expect(screen.getByText(DIGEST_NA_REGEX)).toBeInTheDocument();
  });

  it("should render decorative background images", () => {
    const { container } = render(
      <GlobalError error={mockError} reset={mockReset} />
    );
    const images = container.querySelectorAll('[role="presentation"]');
    expect(images.length).toBeGreaterThanOrEqual(2);
  });

  it("should render with proper html-like structure", () => {
    const { container } = render(
      <GlobalError error={mockError} reset={mockReset} />
    );

    // Instead of looking for <html>/<body>, verify top-level layout
    const mainContent = container.querySelector("#main-content");
    expect(mainContent).toBeInTheDocument();

    const heading = screen.getByRole("heading", {
      name: CRITICAL_ERROR_HEADING_REGEX,
    });
    expect(heading).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const { container } = render(
      <GlobalError error={mockError} reset={mockReset} />
    );
    expect(container).toMatchSnapshot();
  });
});
