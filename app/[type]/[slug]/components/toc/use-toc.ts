"use client";

import type { KeyboardEvent, MouseEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useWebHaptics } from "web-haptics/react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export type { TOCItem };

export function useToc() {
  const [isLoading, setIsLoading] = useState(true);
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState("");
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
    const updateTOC = () => {
      const headings = Array.from(document.querySelectorAll("h2[id], h3[id]"));
      const newTocItems = headings.map((el) => ({
        id: el.id,
        text: el.textContent || "",
        level: Number.parseInt(el.tagName[1], 10),
      }));
      setTocItems(newTocItems);
      setIsLoading(false);

      linksRef.current = new Array(newTocItems.length).fill(null);

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
      // Only update TOC for structural changes, not button state changes
      const isButtonChange = mutations.some((mutation) => {
        const target = mutation.target as HTMLElement;
        return (
          target.closest("button") ||
          (mutation.type === "attributes" &&
            mutation.attributeName === "disabled") ||
          (mutation.type === "childList" && target.querySelector("svg"))
        );
      });

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
        for (const entry of entries) {
          const id = entry.target.getAttribute("id");
          if (entry.isIntersecting && !lockActiveId) {
            setActiveId(id ?? "");
          }
        }
      },
      { rootMargin: "0px 0px -80% 0px", threshold: 1 }
    );

    const headings = Array.from(document.querySelectorAll("h2[id], h3[id]"));
    for (const heading of headings) {
      if (!heading.hasAttribute("tabindex")) {
        heading.setAttribute("tabindex", "-1");
      }
      sectionObserver.observe(heading);
    }

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
    isLoading,
    tocItems,
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
