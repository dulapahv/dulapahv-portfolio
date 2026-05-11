"use client";

import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence } from "motion/react";
// biome-ignore lint/performance/noNamespaceImport: motion/react-m is meant to be namespace-imported so LazyMotion can tree-shake unused animation features
import * as m from "motion/react-m";
import { Link } from "@/components/link";
import { useMediaQuery } from "@/hooks/use-media-query/use-media-query";
import type { TocItem } from "@/lib/content-utils/content-utils";
import { cn } from "@/lib/utils";
import { DesktopToc } from "./desktop-toc";
import { useToc } from "./use-toc";

interface TableOfContentsProps {
  tocItems: TocItem[];
}

export function TableOfContents({ tocItems }: TableOfContentsProps) {
  const {
    activeId,
    showScrollTop,
    isCollapsed,
    toggleCollapsed,
    handleClick,
    handleKeyDown,
    scrollToTop,
    linksRef,
  } = useToc(tocItems);
  const isDesktop = useMediaQuery("(min-width: 1350px)");

  if (tocItems.length === 0) {
    return null;
  }

  if (isDesktop) {
    return (
      <DesktopToc
        activeId={activeId}
        linksRef={linksRef}
        onLinkClick={handleClick}
        onLinkKeyDown={handleKeyDown}
        onScrollToTop={scrollToTop}
        showScrollTop={showScrollTop}
        tocItems={tocItems}
      />
    );
  }

  return (
    <nav
      aria-label="Table of contents"
      className="rounded-md border border-border bg-background-elevated/50 backdrop-blur-sm"
    >
      <button
        aria-controls="toc-content"
        aria-describedby="toc-description"
        aria-expanded={!isCollapsed}
        className={cn(
          "flex w-full cursor-pointer items-center justify-between rounded-md px-4 py-3 font-medium text-foreground text-sm",
          "hover:bg-background-muted/50"
        )}
        onClick={toggleCollapsed}
        type="button"
      >
        <span>On this page</span>
        <m.div
          animate={{ rotate: isCollapsed ? 0 : 180 }}
          aria-hidden="true"
          transition={{ duration: 0.2 }}
        >
          <CaretDownIcon className="size-4" />
        </m.div>
      </button>
      <span className="sr-only" id="toc-description">
        Toggle to {isCollapsed ? "show" : "hide"} table of contents with{" "}
        {tocItems.length} sections. Use arrow keys to navigate when expanded.
      </span>

      <AnimatePresence initial={false}>
        {isCollapsed ? null : (
          <m.div
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
                        "block rounded-md px-3 py-1.5 text-foreground-muted text-sm",
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
                      {activeId === item.id ? (
                        <span
                          className="sr-only"
                          id={`current-section-mobile-${index}`}
                        >
                          (current section)
                        </span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
