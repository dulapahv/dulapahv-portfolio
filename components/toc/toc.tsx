"use client";

import {
  ArrowCircleUpIcon,
  CaretDownIcon,
} from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
/* Honestly, this is a bit of a mess. */
import { useCallback, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [lockActiveId, setLockActiveId] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const isDesktop = useMediaQuery("(min-width: 1350px)");
  const tocRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  // Handle scroll visibility for scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 300px
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateTOC = () => {
      const headings = Array.from(document.querySelectorAll("h2[id], h3[id]"));
      const newTocItems = headings.map((el) => ({
        id: el.id,
        text: el.textContent || "",
        level: Number.parseInt(el.tagName[1], 10),
      }));
      setTocItems(newTocItems);
      setIsLoading(false);

      // Reset links ref array
      linksRef.current = new Array(newTocItems.length).fill(null);

      // Only set initial active ID if we don't have one yet
      setActiveId((currentActiveId) => {
        if (currentActiveId === "" && newTocItems.length > 0) {
          const hash = window.location.hash.replace("#", "");
          if (hash && newTocItems.some((item) => item.id === hash)) {
            return hash;
          }
          return newTocItems[0].id;
        }
        return currentActiveId;
      });
    };

    updateTOC();

    const mdxContainer = document.querySelector("article");
    if (!mdxContainer) {
      return;
    }

    const observer = new MutationObserver((mutations) => {
      // Check if the mutation is just a button state change
      const isButtonChange = mutations.some((mutation) => {
        const target = mutation.target as HTMLElement;
        return (
          target.closest("button") ||
          (mutation.type === "attributes" &&
            mutation.attributeName === "disabled") ||
          (mutation.type === "childList" && target.querySelector("svg"))
        );
      });

      // Only update TOC for structural changes, not button state changes
      if (!isButtonChange) {
        updateTOC();
      }
    });

    observer.observe(mdxContainer, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["disabled"],
    });

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("id");
          if (entry.isIntersecting && !lockActiveId) {
            setActiveId(id ?? "");
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px", threshold: 1 }
    );

    const headings = Array.from(document.querySelectorAll("h2[id], h3[id]"));
    headings.forEach((heading) => {
      // Make headings focusable for proper tab navigation
      if (!heading.hasAttribute("tabindex")) {
        heading.setAttribute("tabindex", "-1");
      }
      sectionObserver.observe(heading);
    });

    return () => {
      observer.disconnect();
      sectionObserver.disconnect();
    };
  }, [lockActiveId]);

  const scrollToElement = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ block: "start" });
      window.history.replaceState(null, "", `#${id}`);
      setActiveId(id);
      setLockActiveId(true);
      setTimeout(() => setLockActiveId(false), 500);

      // Focus the target heading for screen readers after scroll completes
      element.focus({ preventScroll: true });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.replaceState(null, "", window.location.pathname);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToElement(id);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLAnchorElement>,
    id: string,
    index: number
  ) => {
    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        scrollToElement(id);
        break;
      case "ArrowDown": {
        e.preventDefault();
        e.stopPropagation();
        const nextIndex = Math.min(index + 1, tocItems.length - 1);
        linksRef.current[nextIndex]?.focus();
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        e.stopPropagation();
        const prevIndex = Math.max(index - 1, 0);
        linksRef.current[prevIndex]?.focus();
        break;
      }
      case "Home":
        e.preventDefault();
        e.stopPropagation();
        linksRef.current[0]?.focus();
        break;
      case "End": {
        e.preventDefault();
        e.stopPropagation();
        const lastIndex = tocItems.length - 1;
        linksRef.current[lastIndex]?.focus();
        break;
      }
    }
  };

  // Show loading state while scanning for headings
  if (isLoading) {
    return (
      <div className="flex w-full items-center rounded-md border border-border bg-background-elevated/50 px-4 py-3 text-foreground-muted text-sm backdrop-blur-sm xl:hidden">
        Loading table of contents...
      </div>
    );
  }

  // Don't render if there are no headings
  if (tocItems.length === 0) {
    return null;
  }

  // Desktop view - fixed sidebar
  if (isDesktop) {
    return (
      <nav
        aria-label="Table of contents"
        className="fixed top-18 left-[calc(100vw/2+424px)] z-40 hidden w-56 xl:block"
        ref={tocRef}
      >
        <h2 className="px-3 font-medium text-foreground text-sm">
          On this page
        </h2>
        <div
          aria-label="Page sections - use arrow keys to navigate"
          className="max-h-[calc(100vh-16rem)] overflow-y-auto py-2"
          role="group"
        >
          <ul className="space-y-1">
            {tocItems.map((item, index) => (
              <li className="mb-0" key={item.id}>
                <Link
                  aria-current={activeId === item.id ? "location" : undefined}
                  aria-describedby={
                    activeId === item.id
                      ? `current-section-${index}`
                      : undefined
                  }
                  className={cn(
                    "group relative block rounded-md px-3 py-1 text-sm transition-all",
                    item.level === 3 ? "pl-7" : "",
                    activeId === item.id
                      ? "text-mirai-red"
                      : "text-foreground-muted",
                    activeId !== item.id && "hover:text-foreground"
                  )}
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  onKeyDown={(e) => handleKeyDown(e, item.id, index)}
                  ref={(el) => {
                    linksRef.current[index] = el;
                  }}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute top-1/2 left-0 h-full w-0.5 -translate-y-1/2 transition-all",
                      activeId === item.id
                        ? "bg-mirai-red"
                        : "bg-white/80 dark:bg-neutral-300/80"
                    )}
                  />
                  <span className="relative line-clamp-2">{item.text}</span>
                  {activeId === item.id && (
                    <span className="sr-only" id={`current-section-${index}`}>
                      (current section)
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <AnimatePresence>
          {showScrollTop && (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 px-3"
              exit={{ opacity: 0, y: 10 }}
              initial={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <button
                aria-label="Scroll to top of page"
                className={cn(
                  "flex w-full cursor-pointer items-center gap-x-1.5 rounded-md text-foreground-muted text-sm",
                  "transition-colors hover:text-foreground"
                )}
                onClick={scrollToTop}
              >
                <span>Scroll to top</span>
                <ArrowCircleUpIcon className="size-4.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    );
  }

  // Mobile view - collapsible at top
  return (
    <nav
      aria-label="Table of contents"
      className="rounded-md border border-border bg-background-elevated/50 backdrop-blur-sm"
      ref={tocRef}
    >
      <button
        aria-controls="toc-content"
        aria-describedby="toc-description"
        aria-expanded={!isCollapsed}
        className={cn(
          "flex w-full cursor-pointer items-center justify-between rounded-md px-4 py-3 font-medium text-foreground text-sm transition-colors",
          "hover:bg-background-muted/50"
        )}
        onClick={() => setIsCollapsed(!isCollapsed)}
        type="button"
      >
        <span>On this page</span>
        <motion.div
          animate={{ rotate: isCollapsed ? 0 : 180 }}
          aria-hidden="true"
          transition={{ duration: 0.2 }}
        >
          <CaretDownIcon className="size-4" />
        </motion.div>
      </button>
      <span className="sr-only" id="toc-description">
        Toggle to {isCollapsed ? "show" : "hide"} table of contents with{" "}
        {tocItems.length} sections. Use arrow keys to navigate when expanded.
      </span>

      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            animate={{ height: "auto", opacity: 1 }}
            aria-label="Page sections - use arrow keys to navigate"
            className="overflow-hidden"
            exit={{ height: 0, opacity: 0 }}
            id="toc-content"
            initial={{ height: 0, opacity: 0 }}
            role="group"
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div className="p-2">
              <ul className="my-0! list-none pl-0">
                {tocItems.map((item, index) => (
                  <li className="my-0!" key={item.id}>
                    <Link
                      aria-current={
                        activeId === item.id ? "location" : undefined
                      }
                      aria-describedby={
                        activeId === item.id
                          ? `current-section-mobile-${index}`
                          : undefined
                      }
                      className={cn(
                        "block rounded-md px-3 py-1.5 text-foreground-muted text-sm transition-all",
                        "hover:text-foreground",
                        item.level === 3 ? "pl-7" : ""
                      )}
                      href={`#${item.id}`}
                      onClick={(e) => handleClick(e, item.id)}
                      onKeyDown={(e) => handleKeyDown(e, item.id, index)}
                      ref={(el) => {
                        linksRef.current[index] = el;
                      }}
                    >
                      <span className="line-clamp-2">{item.text}</span>
                      {activeId === item.id && (
                        <span
                          className="sr-only"
                          id={`current-section-mobile-${index}`}
                        >
                          (current section)
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
