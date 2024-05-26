"use client";

import { Raleway } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tab, Tabs } from "@nextui-org/react";
import { CgNotes, CgProfile } from "react-icons/cg";
import { HiOutlineBriefcase } from "react-icons/hi";
import { LuAtom, LuHome, LuLayers } from "react-icons/lu";

const raleway = Raleway({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const Navbar = () => {
  const pathname = usePathname();

  return (
    <Tabs
      as="nav"
      color="primary"
      aria-label="Navbar"
      variant="underlined"
      selectedKey={`/${pathname.split("/")[1]}`}
      classNames={{
        base: "fixed bottom-6 left-1/2 -translate-x-1/2 bg-default-50 rounded-full px-2 py-0.5 backdrop-blur-sm backdrop-filter bg-opacity-50 shadow-medium z-50",
        tabContent: `font-semibold ${raleway.className}`,
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
    </Tabs>
  );
};

export default Navbar;
