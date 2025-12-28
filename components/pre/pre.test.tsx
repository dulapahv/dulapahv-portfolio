import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Pre } from "./pre";

const COPY_CODE_REGEX = /copy code/i;

describe("Pre", () => {
  // Mock clipboard API
  const mockWriteText = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockWriteText.mockResolvedValue(undefined);

    Object.assign(navigator, {
      clipboard: {
        writeText: mockWriteText,
      },
    });
  });

  describe("Component rendering", () => {
    it("should render pre element", () => {
      const { container } = render(
        <Pre>
          <code>const test = true;</code>
        </Pre>
      );

      const preElement = container.querySelector("pre");
      expect(preElement).toBeInTheDocument();
    });

    it("should render children inside pre element", () => {
      const { container } = render(
        <Pre>
          <code>const test = true;</code>
        </Pre>
      );

      const codeElement = container.querySelector("code");
      expect(codeElement).toBeInTheDocument();
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

    it("should render CopyIcon by default", () => {
      render(
        <Pre>
          <code>const test = true;</code>
        </Pre>
      );

      const copyButton = screen.getByRole("button", { name: COPY_CODE_REGEX });
      const svg = copyButton.querySelector("svg");

      expect(svg).toBeInTheDocument();
    });

    it("should pass props to pre element", () => {
      const { container } = render(
        <Pre className="custom-class" data-testid="custom-pre">
          <code>test</code>
        </Pre>
      );

      const preElement = container.querySelector("pre");
      expect(preElement).toHaveClass("custom-class");
      expect(preElement).toHaveAttribute("data-testid", "custom-pre");
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
      fireEvent.click(copyButton);

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
      fireEvent.click(copyButton);

      await waitFor(() => {
        expect(mockWriteText).toHaveBeenCalledWith(
          expect.stringContaining("function hello()")
        );
        expect(mockWriteText).toHaveBeenCalledWith(
          expect.stringContaining('console.log("Hello World")')
        );
      });
    });

    it("should show CheckIcon after successful copy", async () => {
      render(
        <Pre>
          <code>const test = true;</code>
        </Pre>
      );

      const copyButton = screen.getByRole("button", { name: COPY_CODE_REGEX });
      fireEvent.click(copyButton);

      // Button should now show check icon
      await waitFor(() => {
        const svg = copyButton.querySelector("svg");
        expect(svg).toBeInTheDocument();
      });
    });

    it("should disable button while copied state is active", async () => {
      render(
        <Pre>
          <code>const test = true;</code>
        </Pre>
      );

      const copyButton = screen.getByRole("button", { name: COPY_CODE_REGEX });
      fireEvent.click(copyButton);

      await waitFor(() => {
        expect(copyButton).toBeDisabled();
      });
    });

    it("should not copy if pre element has no text content", () => {
      render(<Pre>{null}</Pre>);

      const copyButton = screen.getByRole("button", { name: COPY_CODE_REGEX });
      fireEvent.click(copyButton);

      expect(mockWriteText).not.toHaveBeenCalled();
    });
  });

  describe("Button attributes", () => {
    it("should have correct aria-label", () => {
      render(
        <Pre>
          <code>test</code>
        </Pre>
      );

      const copyButton = screen.getByRole("button", { name: COPY_CODE_REGEX });
      expect(copyButton).toHaveAttribute("aria-label", "Copy code");
    });

    it("should have title attribute", () => {
      render(
        <Pre>
          <code>test</code>
        </Pre>
      );

      const copyButton = screen.getByRole("button", { name: COPY_CODE_REGEX });
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

  describe("Styling", () => {
    it("should have correct CSS classes on button", () => {
      render(
        <Pre>
          <code>test</code>
        </Pre>
      );

      const copyButton = screen.getByRole("button", { name: COPY_CODE_REGEX });

      expect(copyButton.className).toContain("text-foreground-muted");
      expect(copyButton.className).toContain("absolute");
      expect(copyButton.className).toContain("rounded-md");
    });

    it("should have hover styles", () => {
      render(
        <Pre>
          <code>test</code>
        </Pre>
      );

      const copyButton = screen.getByRole("button", { name: COPY_CODE_REGEX });
      expect(copyButton.className).toContain("hover:text-foreground/80");
    });

    it("should have active scale animation", () => {
      render(
        <Pre>
          <code>test</code>
        </Pre>
      );

      const copyButton = screen.getByRole("button", { name: COPY_CODE_REGEX });
      expect(copyButton.className).toContain("active:scale-90");
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
      fireEvent.click(buttons[0]);

      await waitFor(() => {
        expect(mockWriteText).toHaveBeenCalledWith("first code block");
      });
    });
  });

  describe("Edge cases", () => {
    it("should handle empty code block", () => {
      render(
        <Pre>
          <code />
        </Pre>
      );

      const copyButton = screen.getByRole("button", { name: COPY_CODE_REGEX });
      expect(copyButton).toBeInTheDocument();
    });

    it("should handle nested elements in code", async () => {
      render(
        <Pre>
          <code>
            <span>const</span> <span>test</span> = <span>true;</span>
          </code>
        </Pre>
      );

      const copyButton = screen.getByRole("button", { name: COPY_CODE_REGEX });
      fireEvent.click(copyButton);

      await waitFor(() => {
        expect(mockWriteText).toHaveBeenCalledWith(
          expect.stringContaining("const test = true")
        );
      });
    });
  });

  describe("Snapshot", () => {
    it("should match snapshot in initial state", () => {
      const { container } = render(
        <Pre>
          <code>const test = true;</code>
        </Pre>
      );

      expect(container).toMatchSnapshot();
    });

    it("should match snapshot with custom props", () => {
      const { container } = render(
        <Pre className="custom-class" data-language="typescript">
          <code>const test: boolean = true;</code>
        </Pre>
      );

      expect(container).toMatchSnapshot();
    });
  });
});
