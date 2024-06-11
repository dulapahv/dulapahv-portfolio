import type { Metadata } from "next";

import { Breadcrumb } from "@/components";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Blog | ${SITE_NAME}`,
  description: "Blog posts about my thoughts, ideas, and experiences.",
};

const Page = () => {
  return (
    <div className="space-y-6">
      <Breadcrumb />
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Blog</h1>
        <p className="text-lg text-default-500">
          Blog posts about my thoughts, ideas, and experiences.
        </p>
      </header>
    </div>
  );
};

export default Page;
