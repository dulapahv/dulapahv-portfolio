import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Pre } from "./pre";

const COPY_CODE_REGEX = /copy code/i;

describe("Pre", () => {
  const mockWriteText = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockWriteText.mockResolvedValue(undefined);

    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: mockWriteText },
      writable: true,
      configurable: true,
    });
  });

  describe("Component rendering", () => {
    it("should render pre element with children", () => {
      const { container } = render(
        <Pre>
          <code>const test = true;</code>
        </Pre>
      );

      const codeElement = container.querySelector("code");
      expect(codeElement?.textContent).toBe("const test = true;");
    });

    it("should render copy button", () => {
      render(
        <Pre>
          <code>const test = true;</code>
        </Pre>
      );

      const copyButton = screen.getByRole("button", { name: COPY_CODE_REGEX });
      expect(copyButton).toBeInTheDocument();
    });
  });

  describe("Copy functionality", () => {
    it("should copy code to clipboard when button is clicked", async () => {
      render(
        <Pre>
          <code>const test = true;</code>
        </Pre>
      );

      const copyButton = screen.getByRole("button", { name: COPY_CODE_REGEX });
      await userEvent.click(copyButton);

      await waitFor(() => {
        expect(mockWriteText).toHaveBeenCalledWith("const test = true;");
      });
    });

    it("should copy all text content from pre element", async () => {
      render(
        <Pre>
          <code>
            {`function hello() {
  console.log("Hello World");
}`}
          </code>
        </Pre>
      );

      const copyButton = screen.getByRole("button", { name: COPY_CODE_REGEX });
      await userEvent.click(copyButton);

      await waitFor(() => {
        expect(mockWriteText).toHaveBeenCalledWith(
          expect.stringContaining("function hello()")
        );
        expect(mockWriteText).toHaveBeenCalledWith(
          expect.stringContaining('console.log("Hello World")')
        );
      });
    });

    it("should disable button while copied state is active", async () => {
      render(
        <Pre>
          <code>const test = true;</code>
        </Pre>
      );

      const copyButton = screen.getByRole("button", { name: COPY_CODE_REGEX });
      await userEvent.click(copyButton);

      await waitFor(() => {
        expect(copyButton).toBeDisabled();
      });
    });

    it("should not copy if pre element has no text content", async () => {
      render(<Pre>{null}</Pre>);

      const copyButton = screen.getByRole("button", { name: COPY_CODE_REGEX });
      await userEvent.click(copyButton);

      expect(mockWriteText).not.toHaveBeenCalled();
    });
  });

  describe("Button attributes", () => {
    it("should have correct aria-label and title", () => {
      render(
        <Pre>
          <code>test</code>
        </Pre>
      );

      const copyButton = screen.getByRole("button", { name: COPY_CODE_REGEX });
      expect(copyButton).toHaveAttribute("aria-label", "Copy code");
      expect(copyButton).toHaveAttribute("title", "Copy code");
    });

    it("should not be disabled initially", () => {
      render(
        <Pre>
          <code>test</code>
        </Pre>
      );

      const copyButton = screen.getByRole("button", { name: COPY_CODE_REGEX });
      expect(copyButton).not.toBeDisabled();
    });
  });

  describe("Multiple code blocks", () => {
    it("should handle multiple pre blocks independently", async () => {
      render(
        <>
          <Pre>
            <code>first code block</code>
          </Pre>
          <Pre>
            <code>second code block</code>
          </Pre>
        </>
      );

      const buttons = screen.getAllByRole("button", { name: COPY_CODE_REGEX });
      expect(buttons).toHaveLength(2);

      // Click first button
      await userEvent.click(buttons[0]);

      await waitFor(() => {
        expect(mockWriteText).toHaveBeenCalledWith("first code block");
      });
    });
  });

  describe("Edge cases", () => {
    it("should handle nested elements in code", async () => {
      render(
        <Pre>
          <code>
            <span>const</span> <span>test</span> = <span>true;</span>
          </code>
        </Pre>
      );

      const copyButton = screen.getByRole("button", { name: COPY_CODE_REGEX });
      await userEvent.click(copyButton);

      await waitFor(() => {
        expect(mockWriteText).toHaveBeenCalledWith(
          expect.stringContaining("const test = true")
        );
      });
    });
  });
});
