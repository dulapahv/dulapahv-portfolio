"use client";

import { useEffect, useRef } from "react";
import { Raleway } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Divider, Tab, Tabs } from "@nextui-org/react";
import {
  Atom,
  BriefcaseBusiness,
  CircleUserRound,
  Home,
  Layers,
  Menu,
  NotebookPen,
} from "lucide-react";

import { CommandMenu, CommandMenuModalRef } from "@/ui/command-menu";

const raleway = Raleway({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export function Navbar() {
  const commandMenuRef = useRef<CommandMenuModalRef>(null);

  const pathname = usePathname();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        commandMenuRef.current?.openModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <CommandMenu ref={commandMenuRef} />
      <Tabs
        as="nav"
        color="primary"
        aria-label="Navbar"
        variant="underlined"
        selectedKey={`/${pathname.split("/")[1]}`}
        onSelectionChange={(key) => {
          if (key === "$.7") {
            commandMenuRef.current?.openModal();
          }
        }}
        classNames={{
          base: "fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/70 dark:bg-zinc-900/70 rounded-full px-2 py-0.5 backdrop-blur-md [-webkit-backdrop-filter:blur(12px)] backdrop-filter shadow-medium z-50",
          tabContent: `font-semibold ${raleway.className}`,
          tab: "px-2.5 first:pl-1 last:pr-1 sm:first:pl-2 sm:last:pr-2",
          tabList: "sm:gap-2 gap-1",
        }}
      >
        <Tab
          as={Link}
          key="/"
          href="/"
          title={
            <>
              <span className="hidden sm:block">Home</span>
              <Home size={20} className="block sm:hidden" />
            </>
          }
        />
        <Tab
          as={Link}
          key="/experience"
          href="/experience"
          title={
            <>
              <span className="hidden sm:block">Experience</span>
              <BriefcaseBusiness size={20} className="block sm:hidden" />
            </>
          }
        ></Tab>
        <Tab
          as={Link}
          key="/project"
          href="/project"
          title={
            <>
              <span className="hidden sm:block">Project</span>
              <Atom size={20} className="block sm:hidden" />
            </>
          }
        />
        <Tab
          as={Link}
          key="/blog"
          href="/blog"
          title={
            <>
              <span className="hidden sm:block">Blog</span>
              <NotebookPen size={20} className="block sm:hidden" />
            </>
          }
        />
        <Tab
          as={Link}
          key="/stack"
          href="/stack"
          title={
            <>
              <span className="hidden sm:block">Stack</span>
              <Layers size={20} className="block sm:hidden" />
            </>
          }
        />
        <Tab
          as={Link}
          key="/contact"
          href="/contact"
          title={
            <>
              <span className="hidden sm:block">Contact</span>
              <CircleUserRound size={20} className="block sm:hidden" />
            </>
          }
        />
        <Tab
          title={<Divider orientation="vertical" />}
          className="bg-default-200 px-0"
        />
        <Tab title={<Menu size={20} />} />
      </Tabs>
    </>
  );
}
