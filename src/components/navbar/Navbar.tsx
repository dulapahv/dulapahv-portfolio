"use client";

import { useEffect, useRef } from "react";
import { Raleway } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Divider, Tab, Tabs } from "@nextui-org/react";
import { CgNotes, CgProfile } from "react-icons/cg";
import { HiOutlineBriefcase } from "react-icons/hi";
import { LuAtom, LuHome, LuLayers, LuMenu } from "react-icons/lu";

import { CommandMenu, CommandMenuModalRef } from "@/components";

const raleway = Raleway({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const Navbar = () => {
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
          base: "fixed bottom-6 left-1/2 -translate-x-1/2 bg-default-50 rounded-full px-2 py-0.5 backdrop-blur-sm [-webkit-backdrop-filter:blur(4px)] backdrop-filter bg-opacity-50 shadow-medium z-50",
          tabContent: `font-semibold ${raleway.className}`,
          tab: "px-2.5 first:pl-0 last:pr-0 px-2 sm:first:pl-2 sm:last:pr-2",
          tabList: "sm:gap-2 gap-1.5",
        }}
      >
        <Tab
          as={Link}
          key="/"
          href="/"
          title={
            <>
              <span className="hidden sm:block">Home</span>
              <LuHome className="block text-xl sm:hidden" />
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
              <HiOutlineBriefcase className="block text-xl sm:hidden" />
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
              <LuAtom className="block text-xl sm:hidden" />
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
              <CgNotes className="block text-xl sm:hidden" />
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
              <LuLayers className="block text-xl sm:hidden" />
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
              <CgProfile className="block text-xl sm:hidden" />
            </>
          }
        />
        <Tab
          title={<Divider orientation="vertical" />}
          className="bg-default-200 px-0"
        />
        <Tab title={<LuMenu className="text-xl" />} />
      </Tabs>
    </>
  );
};

export default Navbar;
