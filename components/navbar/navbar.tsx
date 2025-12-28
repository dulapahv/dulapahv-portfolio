"use client";

import {
  BookOpenTextIcon,
  HouseIcon,
  ShapesIcon,
  UserIcon,
} from "@phosphor-icons/react/dist/ssr";
import { motion } from "motion/react";
import type { Route } from "next";
import { Archivo } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";

import { cn } from "@/lib/utils";

const archivo = Archivo({ subsets: ["latin"], weight: "variable" });

const navbarItems = [
  {
    name: "Home",
    icon: <HouseIcon className="size-4.5 sm:size-5" />,
    link: "/",
  },
  {
    name: "Project",
    icon: <ShapesIcon className="size-4.5 sm:size-5" />,
    link: "/project",
  },
  {
    name: "Blog",
    icon: <BookOpenTextIcon className="size-4.5 sm:size-5" />,
    link: "/blog",
  },
  {
    name: "Contact",
    icon: <UserIcon className="size-4.5 sm:size-5" />,
    link: "/contact",
  },
];

export function Navbar() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  const isActive = (link: string) => {
    if (link === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(link);
  };

  // Handle arrow key navigation
  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!navRef.current) {
      return;
    }

    const links = navRef.current.querySelectorAll("a");
    const currentIndex = Array.from(links).indexOf(document.activeElement);

    let newIndex = currentIndex;

    switch (event.key) {
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        newIndex = currentIndex > 0 ? currentIndex - 1 : links.length - 1;
        break;
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        newIndex = currentIndex < links.length - 1 ? currentIndex + 1 : 0;
        break;
      case "Home":
        event.preventDefault();
        newIndex = 0;
        break;
      case "End":
        event.preventDefault();
        newIndex = links.length - 1;
        break;
      default:
        return;
    }

    links[newIndex]?.focus();
  };

  const containerVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 20,
      },
    },
  };

  return (
    <motion.nav
      animate="visible"
      aria-label="Main navigation"
      className={cn(
        archivo.className,
        "fixed right-1/2 bottom-4 z-50 flex translate-x-1/2 items-center gap-x-6 rounded-full border border-border bg-background-elevated/80 px-3 py-2 text-foreground-subtle shadow-lg backdrop-blur-xl *:translate-y-0.5 sm:px-4"
      )}
      initial="hidden"
      onKeyDown={handleKeyDown}
      ref={navRef}
      role="navigation"
      variants={containerVariants}
    >
      {navbarItems.map((item) => {
        const active = isActive(item.link);

        return (
          <motion.div
            className="relative"
            key={item.link}
            variants={itemVariants}
          >
            <Link
              aria-current={active ? "page" : undefined}
              aria-label={`${item.name}${active ? ", current page" : ""}`}
              className={cn(
                "relative flex gap-2 pb-1",
                active
                  ? "text-mirai-red"
                  : "transition-colors hover:text-foreground-muted"
              )}
              href={item.link as Route}
            >
              <span aria-hidden="true">{item.icon}</span>
              <span className="hidden font-medium text-sm sm:block">
                {item.name}
              </span>

              {active && (
                <motion.div
                  className="absolute right-0 bottom-0 left-0 h-0.5 rounded-full bg-mirai-red"
                  initial={false}
                  layoutId="activeNavItem"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}

              {active && <span className="sr-only">(current page)</span>}
            </Link>
          </motion.div>
        );
      })}

      <div aria-live="polite" className="sr-only">
        Use arrow keys to navigate between menu items
      </div>
    </motion.nav>
  );
}
