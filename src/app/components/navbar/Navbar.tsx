"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tab, Tabs } from "@nextui-org/react";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <Tabs
      as="nav"
      color="primary"
      aria-label="Navbar"
      variant="underlined"
      selectedKey={pathname}
      classNames={{
        base: "fixed bottom-6 left-1/2 -translate-x-1/2 bg-default-100 rounded-full px-2 py-0.5 backdrop-blur-sm backdrop-filter bg-opacity-50 shadow-medium",
        tabContent: "font-semibold",
      }}
    >
      <Tab as={Link} key="/" title="Home" href="/" />
      <Tab as={Link} key="/experience" title="Experience" href="/experience" />
      <Tab as={Link} key="/project" title="Project" href="/project" />
      <Tab as={Link} key="/blog" title="Blog" href="/blog" />
      <Tab as={Link} key="/stack" title="Stack" href="/stack" />
      <Tab as={Link} key="/contact" title="Contact" href="/contact" />
    </Tabs>
  );
};

export default Navbar;
