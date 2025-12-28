import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Navbar } from "./navbar";

const MAIN_NAVIGATION_REGEX = /main navigation/i;
const HOME_REGEX = /home/i;
const HOME_CURRENT_REGEX = /home.*current/i;
const PROJECT_REGEX = /project/i;
const PROJECT_CURRENT_REGEX = /project.*current/i;
const BLOG_REGEX = /blog/i;
const BLOG_CURRENT_REGEX = /blog.*current/i;
const CONTACT_REGEX = /contact/i;
const CONTACT_CURRENT_REGEX = /contact.*current/i;
const PROJECT_EXACT_REGEX = /^project$/i;
const PROJECT_CURRENT_PAGE_REGEX = /project.*current page/i;

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

describe("Navbar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render navigation element", () => {
      vi.mocked(usePathname).mockReturnValue("/");
      render(<Navbar />);

      const nav = screen.getByRole("navigation", {
        name: MAIN_NAVIGATION_REGEX,
      });
      expect(nav).toBeInTheDocument();
    });

    it("should render all navigation items", () => {
      vi.mocked(usePathname).mockReturnValue("/");
      render(<Navbar />);

      expect(
        screen.getByRole("link", { name: HOME_REGEX })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: PROJECT_REGEX })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: BLOG_REGEX })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: CONTACT_REGEX })
      ).toBeInTheDocument();
    });

    it("should have correct href attributes", () => {
      vi.mocked(usePathname).mockReturnValue("/");
      render(<Navbar />);

      expect(screen.getByRole("link", { name: HOME_REGEX })).toHaveAttribute(
        "href",
        "/"
      );
      expect(screen.getByRole("link", { name: PROJECT_REGEX })).toHaveAttribute(
        "href",
        "/project"
      );
      expect(screen.getByRole("link", { name: BLOG_REGEX })).toHaveAttribute(
        "href",
        "/blog"
      );
      expect(screen.getByRole("link", { name: CONTACT_REGEX })).toHaveAttribute(
        "href",
        "/contact"
      );
    });
  });

  describe("Active state", () => {
    it("should mark home as active when on home page", () => {
      vi.mocked(usePathname).mockReturnValue("/");
      render(<Navbar />);

      const homeLink = screen.getByRole("link", { name: HOME_CURRENT_REGEX });
      expect(homeLink).toHaveAttribute("aria-current", "page");
    });

    it("should mark project as active when on project page", () => {
      vi.mocked(usePathname).mockReturnValue("/project");
      render(<Navbar />);

      const projectLink = screen.getByRole("link", {
        name: PROJECT_CURRENT_REGEX,
      });
      expect(projectLink).toHaveAttribute("aria-current", "page");
    });

    it("should mark blog as active when on blog page", () => {
      vi.mocked(usePathname).mockReturnValue("/blog");
      render(<Navbar />);

      const blogLink = screen.getByRole("link", { name: BLOG_CURRENT_REGEX });
      expect(blogLink).toHaveAttribute("aria-current", "page");
    });

    it("should mark contact as active when on contact page", () => {
      vi.mocked(usePathname).mockReturnValue("/contact");
      render(<Navbar />);

      const contactLink = screen.getByRole("link", {
        name: CONTACT_CURRENT_REGEX,
      });
      expect(contactLink).toHaveAttribute("aria-current", "page");
    });

    it("should mark blog as active when on blog detail page", () => {
      vi.mocked(usePathname).mockReturnValue("/blog/some-post");
      render(<Navbar />);

      const blogLink = screen.getByRole("link", { name: BLOG_CURRENT_REGEX });
      expect(blogLink).toHaveAttribute("aria-current", "page");
    });
  });

  describe("Keyboard navigation", () => {
    it("should handle ArrowRight key navigation", () => {
      vi.mocked(usePathname).mockReturnValue("/");
      render(<Navbar />);

      const nav = screen.getByRole("navigation");
      const links = screen.getAllByRole("link");

      // Focus first link
      links[0].focus();
      expect(document.activeElement).toBe(links[0]);

      // Press ArrowRight
      nav.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true })
      );
      expect(document.activeElement).toBe(links[1]);
    });

    it("should handle ArrowLeft key navigation", () => {
      vi.mocked(usePathname).mockReturnValue("/");
      render(<Navbar />);

      const nav = screen.getByRole("navigation");
      const links = screen.getAllByRole("link");

      // Focus second link
      links[1].focus();
      expect(document.activeElement).toBe(links[1]);

      // Press ArrowLeft
      nav.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true })
      );
      expect(document.activeElement).toBe(links[0]);
    });

    it("should wrap around to last link when pressing ArrowLeft on first link", () => {
      vi.mocked(usePathname).mockReturnValue("/");
      render(<Navbar />);

      const nav = screen.getByRole("navigation");
      const links = screen.getAllByRole("link");

      // Focus first link
      links[0].focus();

      // Press ArrowLeft (should wrap to last)
      nav.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true })
      );
      expect(document.activeElement).toBe(links.at(-1));
    });

    it("should wrap around to first link when pressing ArrowRight on last link", () => {
      vi.mocked(usePathname).mockReturnValue("/");
      render(<Navbar />);

      const nav = screen.getByRole("navigation");
      const links = screen.getAllByRole("link");

      // Focus last link
      links.at(-1).focus();

      // Press ArrowRight (should wrap to first)
      nav.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true })
      );
      expect(document.activeElement).toBe(links[0]);
    });

    it("should handle Home key to focus first link", () => {
      vi.mocked(usePathname).mockReturnValue("/");
      render(<Navbar />);

      const nav = screen.getByRole("navigation");
      const links = screen.getAllByRole("link");

      // Focus last link
      links.at(-1).focus();

      // Press Home
      nav.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Home", bubbles: true })
      );
      expect(document.activeElement).toBe(links[0]);
    });

    it("should handle End key to focus last link", () => {
      vi.mocked(usePathname).mockReturnValue("/");
      render(<Navbar />);

      const nav = screen.getByRole("navigation");
      const links = screen.getAllByRole("link");

      // Focus first link
      links[0].focus();

      // Press End
      nav.dispatchEvent(
        new KeyboardEvent("keydown", { key: "End", bubbles: true })
      );
      expect(document.activeElement).toBe(links.at(-1));
    });

    it("should handle ArrowDown key navigation", () => {
      vi.mocked(usePathname).mockReturnValue("/");
      render(<Navbar />);

      const nav = screen.getByRole("navigation");
      const links = screen.getAllByRole("link");

      links[0].focus();
      nav.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true })
      );
      expect(document.activeElement).toBe(links[1]);
    });

    it("should handle ArrowUp key navigation", () => {
      vi.mocked(usePathname).mockReturnValue("/");
      render(<Navbar />);

      const nav = screen.getByRole("navigation");
      const links = screen.getAllByRole("link");

      links[1].focus();
      nav.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowUp", bubbles: true })
      );
      expect(document.activeElement).toBe(links[0]);
    });
  });

  describe("Accessibility", () => {
    it("should have aria-label for navigation", () => {
      vi.mocked(usePathname).mockReturnValue("/");
      render(<Navbar />);

      const nav = screen.getByRole("navigation");
      expect(nav).toHaveAttribute("aria-label", "Main navigation");
    });

    it("should have screen reader instructions", () => {
      vi.mocked(usePathname).mockReturnValue("/");
      const { container } = render(<Navbar />);

      const instructions = container.querySelector('[aria-live="polite"]');
      expect(instructions).toBeInTheDocument();
      expect(instructions?.textContent).toContain("arrow keys");
    });

    it("should include current page indicator for screen readers", () => {
      vi.mocked(usePathname).mockReturnValue("/");
      const { container } = render(<Navbar />);

      const srOnly = container.querySelector(".sr-only");
      expect(srOnly?.textContent).toContain("current page");
    });

    it("should have descriptive aria-labels for each link", () => {
      vi.mocked(usePathname).mockReturnValue("/project");
      render(<Navbar />);

      const projectLink = screen.getByRole("link", {
        name: PROJECT_CURRENT_PAGE_REGEX,
      });
      expect(projectLink).toHaveAttribute("aria-label");
    });
  });

  describe("Styling", () => {
    it("should apply active styling to current page link", () => {
      vi.mocked(usePathname).mockReturnValue("/project");
      render(<Navbar />);

      const projectLink = screen.getByRole("link", {
        name: PROJECT_CURRENT_REGEX,
      });
      expect(projectLink.className).toContain("text-mirai-red");
    });

    it("should apply hover styling classes", () => {
      vi.mocked(usePathname).mockReturnValue("/");
      render(<Navbar />);

      const projectLink = screen.getByRole("link", {
        name: PROJECT_EXACT_REGEX,
      });
      expect(projectLink.className).toContain("hover:text-foreground-muted");
    });
  });

  describe("Snapshot", () => {
    it("should match snapshot on home page", () => {
      vi.mocked(usePathname).mockReturnValue("/");
      const { container } = render(<Navbar />);
      expect(container).toMatchSnapshot();
    });

    it("should match snapshot on blog page", () => {
      vi.mocked(usePathname).mockReturnValue("/blog");
      const { container } = render(<Navbar />);
      expect(container).toMatchSnapshot();
    });
  });
});
