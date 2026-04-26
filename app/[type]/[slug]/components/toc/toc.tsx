"use client";

import {
  ArrowCircleUpIcon,
  CaretDownIcon,
} from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence } from "motion/react";
// biome-ignore lint/performance/noNamespaceImport: motion/react-m is meant to be namespace-imported so LazyMotion can tree-shake unused animation features
import * as m from "motion/react-m";
import { Link } from "@/components/link";
import { useMediaQuery } from "@/hooks/use-media-query/use-media-query";
import type { TocItem } from "@/lib/content-utils/content-utils";
import { cn } from "@/lib/utils";
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
      <nav
        aria-label="Table of contents"
        className="fixed top-18 left-[calc(100vw/2+424px)] z-40 hidden w-56 xl:block"
      >
        <h2 className="px-3 font-medium text-foreground text-sm">
          On this page
        </h2>

        <fieldset
          aria-label="Page sections - use arrow keys to navigate"
          className="max-h-[calc(100vh-16rem)] overflow-y-auto border-none py-2"
        >
          <ul className="space-y-1">
            {/* biome-ignore lint/complexity/noExcessiveCognitiveComplexity: TOC item rendering requires conditional styling */}
            {tocItems.map((item, index) => {
              const isActive = activeId === item.id;
              return (
                <li className="mb-0" key={item.id}>
                  <Link
                    aria-current={isActive ? "location" : undefined}
                    aria-describedby={
                      isActive ? `current-section-${index}` : undefined
                    }
                    className={cn(
                      "group relative block rounded-md px-3 py-1 text-sm",
                      item.level === 3 ? "pl-7" : "",
                      isActive
                        ? "text-mirai-red transition-colors"
                        : "text-foreground-muted",
                      !isActive && "hover:text-foreground"
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
                        "absolute top-1/2 left-0 h-full w-0.5 -translate-y-1/2 transition-colors",
                        isActive
                          ? "bg-mirai-red"
                          : "bg-white/80 dark:bg-neutral-300/80"
                      )}
                    />
                    <span className="relative line-clamp-2">{item.text}</span>
                    {isActive ? (
                      <span className="sr-only" id={`current-section-${index}`}>
                        (current section)
                      </span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </fieldset>

        <AnimatePresence>
          {showScrollTop ? (
            <m.div
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
                  "hover:text-foreground"
                )}
                onClick={scrollToTop}
                type="button"
              >
                <span>Scroll to top</span>
                <ArrowCircleUpIcon className="size-4.5" />
              </button>
            </m.div>
          ) : null}
        </AnimatePresence>
      </nav>
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
