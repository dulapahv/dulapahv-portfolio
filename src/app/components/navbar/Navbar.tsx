"use client";

import { Raleway } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tab, Tabs } from "@nextui-org/react";

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
      selectedKey={pathname}
      classNames={{
        base: "fixed bottom-6 left-1/2 -translate-x-1/2 bg-default-50 rounded-full px-2 py-0.5 backdrop-blur-sm backdrop-filter bg-opacity-50 shadow-medium z-50",
        tabContent: `font-semibold ${raleway.className}`,
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
