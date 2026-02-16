import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ContactActions } from "./contact-actions";

// Regex patterns for testing
const COPY_EMAIL_REGEX = /copy email/i;
const GITHUB_REGEX = /github/i;
const LINKEDIN_REGEX = /linkedin/i;

describe("ContactActions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
    });
  });

  it("should copy email to clipboard when copy button is clicked", async () => {
    render(<ContactActions />);

    const copyButton = screen.getByRole("button", { name: COPY_EMAIL_REGEX });
    await userEvent.click(copyButton);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        expect.stringContaining("@")
      );
    });

    expect(screen.getByText("Copied!")).toBeInTheDocument();
  });

  it("should show copied state after clicking", async () => {
    render(<ContactActions />);

    const copyButton = screen.getByRole("button", { name: COPY_EMAIL_REGEX });
    await userEvent.click(copyButton);

    await waitFor(() => {
      expect(screen.getByText("Copied!")).toBeInTheDocument();
    });
  });

  it("should render GitHub link with correct href", () => {
    render(<ContactActions />);

    const githubLink = screen.getByRole("link", { name: GITHUB_REGEX });
    expect(githubLink).toHaveAttribute(
      "href",
      expect.stringContaining("github.com")
    );
    expect(githubLink).toHaveAttribute("target", "_blank");
  });

  it("should render LinkedIn link with correct href", () => {
    render(<ContactActions />);

    const linkedinLink = screen.getByRole("link", { name: LINKEDIN_REGEX });
    expect(linkedinLink).toHaveAttribute(
      "href",
      expect.stringContaining("linkedin.com")
    );
    expect(linkedinLink).toHaveAttribute("target", "_blank");
  });
});
