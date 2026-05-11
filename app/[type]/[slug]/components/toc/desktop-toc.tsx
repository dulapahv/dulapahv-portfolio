import { ArrowCircleUpIcon } from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence } from "motion/react";
// biome-ignore lint/performance/noNamespaceImport: motion/react-m is meant to be namespace-imported so LazyMotion can tree-shake unused animation features
import * as m from "motion/react-m";
import type { KeyboardEvent, MouseEvent, RefObject } from "react";
import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "@/components/link";
import type { TocItem } from "@/lib/content-utils/content-utils";
import { cn } from "@/lib/utils";

interface Indicator {
  y: number;
  height: number;
  visible: boolean;
}

interface DesktopTocProps {
  tocItems: TocItem[];
  activeId: string;
  showScrollTop: boolean;
  linksRef: RefObject<(HTMLAnchorElement | null)[]>;
  onLinkClick: (e: MouseEvent<HTMLAnchorElement>, id: string) => void;
  onLinkKeyDown: (
    e: KeyboardEvent<HTMLAnchorElement>,
    id: string,
    index: number
  ) => void;
  onScrollToTop: () => void;
}

export function DesktopToc({
  tocItems,
  activeId,
  showScrollTop,
  linksRef,
  onLinkClick,
  onLinkKeyDown,
  onScrollToTop,
}: DesktopTocProps) {
  const listRef = useRef<HTMLUListElement | null>(null);
  const scrollContainerRef = useRef<HTMLFieldSetElement | null>(null);
  const [indicator, setIndicator] = useState<Indicator>({
    y: 0,
    height: 0,
    visible: false,
  });

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) {
      return;
    }

    const updateIndicator = () => {
      const index = tocItems.findIndex((item) => item.id === activeId);
      if (index === -1) {
        setIndicator((prev) => ({ ...prev, visible: false }));
        return;
      }
      const link = linksRef.current[index];
      if (!link) {
        return;
      }
      const linkRect = link.getBoundingClientRect();
      const listRect = list.getBoundingClientRect();
      setIndicator({
        y: linkRect.top - listRect.top,
        height: linkRect.height,
        visible: true,
      });

      const container = scrollContainerRef.current;
      if (!container) {
        return;
      }
      const containerRect = container.getBoundingClientRect();
      const linkTopInContainer =
        linkRect.top - containerRect.top + container.scrollTop;
      const linkBottomInContainer = linkTopInContainer + linkRect.height;
      if (linkTopInContainer < container.scrollTop) {
        container.scrollTop = linkTopInContainer;
      } else if (
        linkBottomInContainer >
        container.scrollTop + container.clientHeight
      ) {
        container.scrollTop = linkBottomInContainer - container.clientHeight;
      }
    };

    updateIndicator();
    const resizeObserver = new ResizeObserver(updateIndicator);
    resizeObserver.observe(list);
    return () => resizeObserver.disconnect();
  }, [activeId, tocItems, linksRef]);

  return (
    <nav
      aria-label="Table of contents"
      className="fixed top-18 left-[calc(100vw/2+424px)] z-40 hidden w-56 xl:block"
    >
      <h2 className="px-3 font-medium text-foreground text-sm">On this page</h2>

      <fieldset
        aria-label="Page sections - use arrow keys to navigate"
        className="max-h-[calc(100vh-16rem)] overflow-y-auto border-none py-2"
        ref={scrollContainerRef}
      >
        <ul className="relative space-y-1" ref={listRef}>
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
                      : "text-foreground-muted hover:text-foreground"
                  )}
                  href={`#${item.id}`}
                  onClick={(e) => onLinkClick(e, item.id)}
                  onKeyDown={(e) => onLinkKeyDown(e, item.id, index)}
                  ref={(el) => {
                    linksRef.current[index] = el;
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute top-1/2 left-0 h-full w-0.5 -translate-y-1/2 bg-white/80 dark:bg-neutral-300/80"
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
          {indicator.visible ? (
            <m.span
              animate={{ y: indicator.y, height: indicator.height }}
              aria-hidden="true"
              className="pointer-events-none absolute top-0 left-0 w-0.5 bg-mirai-red"
              initial={false}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
            />
          ) : null}
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
              onClick={onScrollToTop}
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
