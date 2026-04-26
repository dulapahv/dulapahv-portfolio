"use client";

import type { KeyboardEvent, MouseEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useWebHaptics } from "web-haptics/react";
import type { TocItem as ContentTocItem } from "@/lib/content-utils/content-utils";

export type TOCItem = ContentTocItem;

export function useToc(tocItems: TOCItem[]) {
  const [activeId, setActiveId] = useState(() => tocItems[0]?.id ?? "");
  const [lockActiveId, setLockActiveId] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const { trigger } = useWebHaptics();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (tocItems.length === 0) {
      return;
    }

    linksRef.current = new Array(tocItems.length).fill(null);

    const hash = window.location.hash.replace("#", "");
    if (hash && tocItems.some((item) => item.id === hash)) {
      setActiveId(hash);
    }

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.getAttribute("id");
          if (entry.isIntersecting && !lockActiveId) {
            setActiveId(id ?? "");
          }
        }
      },
      { rootMargin: "0px 0px -80% 0px", threshold: 1 }
    );

    for (const item of tocItems) {
      const heading = document.getElementById(item.id);
      if (!heading) {
        continue;
      }
      if (!heading.hasAttribute("tabindex")) {
        heading.setAttribute("tabindex", "-1");
      }
      sectionObserver.observe(heading);
    }

    return () => {
      sectionObserver.disconnect();
    };
  }, [lockActiveId, tocItems]);

  const scrollToElement = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ block: "start" });
      window.history.replaceState(null, "", `#${id}`);
      setActiveId(id);
      setLockActiveId(true);
      setTimeout(() => setLockActiveId(false), 500);
      element.focus({ preventScroll: true });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.replaceState(null, "", window.location.pathname);
  }, []);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      trigger([{ duration: 8 }], { intensity: 0.3 });
      scrollToElement(id);
    },
    [scrollToElement, trigger]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLAnchorElement>, id: string, index: number) => {
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
        default:
          break;
      }
    },
    [scrollToElement, tocItems.length]
  );

  const toggleCollapsed = useCallback(() => {
    trigger([{ duration: 8 }], { intensity: 0.3 });
    setIsCollapsed((prev) => !prev);
  }, [trigger]);

  return {
    activeId,
    showScrollTop,
    isCollapsed,
    toggleCollapsed,
    handleClick,
    handleKeyDown,
    scrollToTop,
    linksRef,
  };
}
