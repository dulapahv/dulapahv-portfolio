"use client";

// biome-ignore lint/performance/noNamespaceImport: motion/react-m is meant to be namespace-imported so LazyMotion can tree-shake unused animation features
import * as m from "motion/react-m";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Link } from "@/components/link";
import { ThemeSwitcher } from "@/components/theme-switcher/theme-switcher";
import { NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function TopBar() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    const initialScrollY = window.scrollY;
    lastScrollYRef.current = initialScrollY;
    if (initialScrollY >= 10) {
      setIsVisible(false);
    }

    const handleScroll = () => {
      if (tickingRef.current) {
        return;
      }
      tickingRef.current = true;

      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const nextVisible =
          currentScrollY < 10 || currentScrollY <= lastScrollYRef.current;

        setIsVisible((prev) => (prev === nextVisible ? prev : nextVisible));
        lastScrollYRef.current = currentScrollY;
        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <m.div
      animate={{ y: isVisible ? 0 : -100 }}
      className={cn(
        "fixed top-0 right-0 left-0 z-40 font-archivo backdrop-blur-sm"
      )}
      initial={false}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link
          aria-label="Go to home"
          className="flex items-center gap-3 hover:opacity-80"
          href="/"
        >
          <Image
            alt="Mirai logo"
            className="size-8"
            height={32}
            src="/mirai.svg"
            width={32}
          />
          <span className="font-medium text-foreground">{NAME}</span>
        </Link>

        <div className="relative">
          <ThemeSwitcher />
        </div>
      </div>
    </m.div>
  );
}
