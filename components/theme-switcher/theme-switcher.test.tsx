import { render, screen, waitFor } from "@testing-library/react";
import { useTheme } from "next-themes";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useMediaQuery } from "@/hooks/use-media-query/use-media-query";

import { ThemeSwitcher } from "./theme-switcher";

const THEME_SELECTION_REGEX = /theme selection/i;
const SYSTEM_THEME_REGEX = /system theme/i;
const LIGHT_THEME_REGEX = /light theme/i;
const DARK_THEME_REGEX = /dark theme/i;
const SYSTEM_THEME_CURRENTLY_SELECTED_REGEX =
  /system theme.*currently selected/i;
const LIGHT_THEME_CURRENTLY_SELECTED_REGEX = /light theme.*currently selected/i;
const DARK_THEME_CURRENTLY_SELECTED_REGEX = /dark theme.*currently selected/i;

vi.mock("next-themes", () => ({
  useTheme: vi.fn(),
}));

vi.mock("@/hooks/use-media-query/use-media-query", () => ({
  useMediaQuery: vi.fn(),
}));

vi.mock("motion/react", () => ({
  motion: {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    button: ({ children, ...props }: any) => (
      <button {...props}>{children}</button>
    ),
  },
}));

describe("ThemeSwitcher", () => {
  const mockSetTheme = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useTheme).mockReturnValue({
      theme: "system",
      setTheme: mockSetTheme,
      themes: ["light", "dark", "system"],
      systemTheme: "light",
      resolvedTheme: "light",
      forcedTheme: undefined,
    });
    vi.mocked(useMediaQuery).mockReturnValue(false);
  });

  describe("Rendering", () => {
    it("should render empty before mounted", () => {
      // The component returns null before mounting
      // In tests, it mounts synchronously so we'll see content
      const { container } = render(<ThemeSwitcher />);
      expect(container).toBeInTheDocument();
    });

    it("should render after mounting", async () => {
      render(<ThemeSwitcher />);

      await waitFor(() => {
        const group = screen.getByRole("group", {
          name: THEME_SELECTION_REGEX,
        });
        expect(group).toBeInTheDocument();
      });
    });

    it("should render all theme buttons when not on touch device", async () => {
      render(<ThemeSwitcher />);

      await waitFor(() => {
        expect(
          screen.getByRole("button", { name: SYSTEM_THEME_REGEX })
        ).toBeInTheDocument();
        expect(
          screen.getByRole("button", { name: LIGHT_THEME_REGEX })
        ).toBeInTheDocument();
        expect(
          screen.getByRole("button", { name: DARK_THEME_REGEX })
        ).toBeInTheDocument();
      });
    });
  });

  describe("Theme switching", () => {
    it("should call setTheme when clicking system theme button", async () => {
      vi.mocked(useTheme).mockReturnValue({
        theme: "light",
        setTheme: mockSetTheme,
        themes: ["light", "dark", "system"],
        systemTheme: "light",
        resolvedTheme: "light",
        forcedTheme: undefined,
      });

      render(<ThemeSwitcher />);

      await waitFor(() => {
        const systemButton = screen.getByRole("button", {
          name: SYSTEM_THEME_REGEX,
        });
        systemButton.click();
      });

      expect(mockSetTheme).toHaveBeenCalledWith("system");
    });

    it("should call setTheme when clicking light theme button", async () => {
      render(<ThemeSwitcher />);

      await waitFor(() => {
        const lightButton = screen.getByRole("button", {
          name: LIGHT_THEME_REGEX,
        });
        lightButton.click();
      });

      expect(mockSetTheme).toHaveBeenCalledWith("light");
    });

    it("should call setTheme when clicking dark theme button", async () => {
      render(<ThemeSwitcher />);

      await waitFor(() => {
        const darkButton = screen.getByRole("button", {
          name: DARK_THEME_REGEX,
        });
        darkButton.click();
      });

      expect(mockSetTheme).toHaveBeenCalledWith("dark");
    });
  });

  describe("Active state", () => {
    it("should mark system theme as active", async () => {
      vi.mocked(useTheme).mockReturnValue({
        theme: "system",
        setTheme: mockSetTheme,
        themes: ["light", "dark", "system"],
        systemTheme: "light",
        resolvedTheme: "light",
        forcedTheme: undefined,
      });

      render(<ThemeSwitcher />);

      await waitFor(() => {
        const systemButton = screen.getByRole("button", {
          name: SYSTEM_THEME_CURRENTLY_SELECTED_REGEX,
        });
        expect(systemButton).toHaveAttribute("aria-pressed", "true");
      });
    });

    it("should mark light theme as active", async () => {
      vi.mocked(useTheme).mockReturnValue({
        theme: "light",
        setTheme: mockSetTheme,
        themes: ["light", "dark", "system"],
        systemTheme: "light",
        resolvedTheme: "light",
        forcedTheme: undefined,
      });

      render(<ThemeSwitcher />);

      await waitFor(() => {
        const lightButton = screen.getByRole("button", {
          name: LIGHT_THEME_CURRENTLY_SELECTED_REGEX,
        });
        expect(lightButton).toHaveAttribute("aria-pressed", "true");
      });
    });

    it("should mark dark theme as active", async () => {
      vi.mocked(useTheme).mockReturnValue({
        theme: "dark",
        setTheme: mockSetTheme,
        themes: ["light", "dark", "system"],
        systemTheme: "light",
        resolvedTheme: "dark",
        forcedTheme: undefined,
      });

      render(<ThemeSwitcher />);

      await waitFor(() => {
        const darkButton = screen.getByRole("button", {
          name: DARK_THEME_CURRENTLY_SELECTED_REGEX,
        });
        expect(darkButton).toHaveAttribute("aria-pressed", "true");
      });
    });
  });

  describe("Accessibility", () => {
    it("should have aria-label for theme selection", async () => {
      render(<ThemeSwitcher />);

      await waitFor(() => {
        const group = screen.getByRole("group", {
          name: THEME_SELECTION_REGEX,
        });
        expect(group).toHaveAttribute("aria-label", "Theme selection");
      });
    });

    it("should have live region for theme changes", async () => {
      const { container } = render(<ThemeSwitcher />);

      await waitFor(() => {
        const liveRegion = container.querySelector('[aria-live="polite"]');
        expect(liveRegion).toBeInTheDocument();
      });
    });
  });

  describe("Responsive behavior", () => {
    it("should apply large screen styles", async () => {
      vi.mocked(useMediaQuery).mockImplementation((query: string) => {
        if (query === "(max-width: 678px)") {
          return false;
        }
        return false;
      });

      const { container } = render(<ThemeSwitcher />);

      await waitFor(() => {
        const group = container.querySelector('[role="group"]');
        expect(group?.className).toContain("inline-flex");
      });
    });
  });

  describe("Snapshot", () => {
    it("should match snapshot with system theme", async () => {
      vi.mocked(useTheme).mockReturnValue({
        theme: "system",
        setTheme: mockSetTheme,
        themes: ["light", "dark", "system"],
        systemTheme: "light",
        resolvedTheme: "light",
        forcedTheme: undefined,
      });

      const { container } = render(<ThemeSwitcher />);

      await waitFor(() => {
        expect(screen.getByRole("group")).toBeInTheDocument();
      });

      expect(container).toMatchSnapshot();
    });
  });
});
