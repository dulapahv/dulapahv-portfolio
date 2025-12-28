"use client";

import { motion } from "motion/react";
import { Archivo } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

const archivo = Archivo({ subsets: ["latin"], weight: "variable" });

export function TopBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        // Always show at the top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down - hide
        setIsVisible(false);
      } else {
        // Scrolling up - show
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <motion.div
      animate={{ y: isVisible ? 0 : -100 }}
      className={cn(
        "fixed top-0 right-0 left-0 z-40 backdrop-blur-sm",
        archivo.className
      )}
      initial={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link
          aria-label="Go to home"
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
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
    </motion.div>
  );
}
