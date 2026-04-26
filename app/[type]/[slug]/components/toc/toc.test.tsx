import { render, screen, waitFor } from "@testing-library/react";
import type { FragmentProps, HTMLProps } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useMediaQuery } from "@/hooks/use-media-query/use-media-query";
import type { TocItem } from "@/lib/content-utils/content-utils";
import { TableOfContents } from "./toc";

const TABLE_OF_CONTENTS_REGEX = /table of contents/i;
const HEADING_1_REGEX = /heading 1/i;
const HEADING_2_REGEX = /heading 2/i;
const HEADING_3_REGEX = /heading 3/i;
const LEVEL_2_REGEX = /level 2/i;
const LEVEL_3_REGEX = /level 3/i;
const QUOTES_AND_SYMBOLS_REGEX = /['"!@#$%^&*()]/g;

const defaultItems: TocItem[] = [
  { id: "heading-1", text: "Heading 1", level: 2 },
  { id: "heading-2", text: "Heading 2", level: 3 },
  { id: "heading-3", text: "Heading 3", level: 2 },
];

vi.mock("@/hooks/use-media-query/use-media-query", () => ({
  useMediaQuery: vi.fn(),
}));

vi.mock("motion/react", () => ({
  motion: {
    div: ({ children, ...props }: HTMLProps<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
    nav: ({ children, ...props }: HTMLProps<HTMLDivElement>) => (
      <nav {...props}>{children}</nav>
    ),
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    button: ({ children, ...props }: any) => (
      <button {...props}>{children}</button>
    ),
    li: ({ children, ...props }: HTMLProps<HTMLLIElement>) => (
      <li {...props}>{children}</li>
    ),
  },
  AnimatePresence: ({ children }: FragmentProps) => <>{children}</>,
}));

describe("TableOfContents", () => {
  let intersectionCallback: IntersectionObserverCallback;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  let observeIntersection: any;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  let disconnectIntersection: any;

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock IntersectionObserver
    intersectionCallback = vi.fn();
    observeIntersection = vi.fn();
    disconnectIntersection = vi.fn();

    global.IntersectionObserver = class {
      constructor(callback: IntersectionObserverCallback) {
        intersectionCallback = callback;
      }
      observe = observeIntersection;
      unobserve = vi.fn();
      disconnect = disconnectIntersection;
      root = null;
      rootMargin = "";
      thresholds = [0.5];
      takeRecords = () => [];
      /* eslint-disable  @typescript-eslint/no-explicit-any */
    } as any;

    // Mock media query - default to desktop view
    vi.mocked(useMediaQuery).mockImplementation((query: string) => {
      if (query === "(min-width: 1350px)") {
        return true;
      }
      return false;
    });

    // Setup document with headings (referenced by id from items)
    document.body.innerHTML = `
      <article>
        <h2 id="heading-1">Heading 1</h2>
        <h3 id="heading-2">Heading 2</h3>
        <h2 id="heading-3">Heading 3</h2>
      </article>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("Rendering - Desktop View", () => {
    it("should render table of contents navigation", () => {
      render(<TableOfContents tocItems={defaultItems} />);
      const nav = screen.getByRole("navigation", {
        name: TABLE_OF_CONTENTS_REGEX,
      });
      expect(nav).toBeInTheDocument();
    });

    it('should render "On this page" heading', async () => {
      const { container } = render(<TableOfContents tocItems={defaultItems} />);

      await waitFor(() => {
        const heading = container.querySelector("h2");
        expect(heading?.textContent).toBe("On this page");
      });
    });

    it("should render all headings from the items prop", async () => {
      render(<TableOfContents tocItems={defaultItems} />);

      await waitFor(() => {
        expect(
          screen.getByRole("link", { name: HEADING_1_REGEX })
        ).toBeInTheDocument();
        expect(
          screen.getByRole("link", { name: HEADING_2_REGEX })
        ).toBeInTheDocument();
        expect(
          screen.getByRole("link", { name: HEADING_3_REGEX })
        ).toBeInTheDocument();
      });
    });

    it("should have correct href for each heading", async () => {
      render(<TableOfContents tocItems={defaultItems} />);

      await waitFor(() => {
        expect(
          screen.getByRole("link", { name: HEADING_1_REGEX })
        ).toHaveAttribute("href", "#heading-1");
        expect(
          screen.getByRole("link", { name: HEADING_2_REGEX })
        ).toHaveAttribute("href", "#heading-2");
        expect(
          screen.getByRole("link", { name: HEADING_3_REGEX })
        ).toHaveAttribute("href", "#heading-3");
      });
    });

    it("should mark the first heading as active initially", async () => {
      render(<TableOfContents tocItems={defaultItems} />);

      await waitFor(() => {
        const firstLink = screen.getByRole("link", { name: HEADING_1_REGEX });
        expect(firstLink).toHaveAttribute("aria-current", "location");
      });
    });
  });

  describe("Rendering - Mobile View", () => {
    beforeEach(() => {
      vi.mocked(useMediaQuery).mockImplementation((query: string) => {
        if (query === "(min-width: 1350px)") {
          return false;
        }
        return false;
      });
    });

    it("should render toggle button", async () => {
      render(<TableOfContents tocItems={defaultItems} />);

      await waitFor(() => {
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button.textContent).toContain("On this page");
      });
    });

    it("should start collapsed", async () => {
      render(<TableOfContents tocItems={defaultItems} />);

      await waitFor(() => {
        const nav = screen.getByRole("navigation");
        expect(nav).toHaveAttribute("aria-label", "Table of contents");
      });
    });

    it("should expand when clicking toggle button", async () => {
      render(<TableOfContents tocItems={defaultItems} />);

      await waitFor(() => {
        const button = screen.getByRole("button");
        button.click();
      });

      await waitFor(() => {
        const links = screen.getAllByRole("link");
        expect(links.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Active heading tracking", () => {
    it("should have intersection observer callback defined", async () => {
      render(<TableOfContents tocItems={defaultItems} />);

      await waitFor(() => {
        expect(
          screen.getByRole("link", { name: HEADING_1_REGEX })
        ).toHaveAttribute("aria-current", "location");
      });

      // Intersection callback should be defined and ready to handle changes
      expect(intersectionCallback).toBeDefined();
    });
  });

  describe("IntersectionObserver", () => {
    it("should create IntersectionObserver", () => {
      render(<TableOfContents tocItems={defaultItems} />);
      expect(intersectionCallback).toBeDefined();
    });

    it("should observe headings", async () => {
      render(<TableOfContents tocItems={defaultItems} />);

      await waitFor(() => {
        expect(observeIntersection).toHaveBeenCalled();
      });
    });

    it("should disconnect observer on unmount", () => {
      const { unmount } = render(<TableOfContents tocItems={defaultItems} />);
      unmount();
      expect(disconnectIntersection).toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("should have aria-label for navigation", () => {
      render(<TableOfContents tocItems={defaultItems} />);

      const nav = screen.getByRole("navigation");
      expect(nav).toHaveAttribute("aria-label", "Table of contents");
    });

    it("should have aria-current on active link", async () => {
      render(<TableOfContents tocItems={defaultItems} />);

      await waitFor(() => {
        const activeLink = screen.getByRole("link", { name: HEADING_1_REGEX });
        expect(activeLink).toHaveAttribute("aria-current", "location");
      });
    });

    it("should have screen reader instructions for desktop view", async () => {
      const { container } = render(<TableOfContents tocItems={defaultItems} />);

      await waitFor(() => {
        const fieldset = container.querySelector("fieldset");
        expect(fieldset).toHaveAttribute("aria-label");
      });
    });
  });

  describe("Heading levels", () => {
    it("should render nested headings with proper indentation", async () => {
      const items: TocItem[] = [
        { id: "h2-1", text: "Level 2", level: 2 },
        { id: "h3-1", text: "Level 3", level: 3 },
      ];

      render(<TableOfContents tocItems={items} />);

      await waitFor(() => {
        expect(
          screen.getByRole("link", { name: LEVEL_2_REGEX })
        ).toBeInTheDocument();
        expect(
          screen.getByRole("link", { name: LEVEL_3_REGEX })
        ).toBeInTheDocument();
      });
    });

    it("should handle headings with special characters", async () => {
      const items: TocItem[] = [
        {
          id: "special-chars",
          text: 'Heading with "quotes" & symbols',
          level: 2,
        },
      ];

      render(<TableOfContents tocItems={items} />);

      await waitFor(() => {
        const link = screen.getByRole("link", {
          name: QUOTES_AND_SYMBOLS_REGEX,
        });
        expect(link).toBeInTheDocument();
      });
    });
  });

  describe("Empty state", () => {
    it("should return null when no items are provided", () => {
      render(<TableOfContents tocItems={[]} />);

      // Component returns null when items is empty
      const nav = screen.queryByRole("navigation");
      expect(nav).toBeNull();
    });
  });

  describe("Snapshot", () => {
    it("should match snapshot - desktop view", async () => {
      const { container } = render(<TableOfContents tocItems={defaultItems} />);

      await waitFor(() => {
        expect(screen.getAllByRole("link").length).toBeGreaterThan(0);
      });

      expect(container).toMatchSnapshot();
    });

    it("should match snapshot - mobile view", async () => {
      vi.mocked(useMediaQuery).mockImplementation((query: string) => {
        if (query === "(min-width: 1350px)") {
          return false;
        }
        return false;
      });

      const { container } = render(<TableOfContents tocItems={defaultItems} />);

      await waitFor(() => {
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
      });

      expect(container).toMatchSnapshot();
    });
  });
});
