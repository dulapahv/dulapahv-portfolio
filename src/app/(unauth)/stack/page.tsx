import type { Metadata } from "next";

import { SITE_NAME } from "@/lib/constants";
import { Breadcrumb } from "@/ui/breadcrumb";

export const metadata: Metadata = {
  title: `Stack | ${SITE_NAME}`,
  description: "Tools and technologies I use.",
};

const Page = () => {
  return (
    <div className="space-y-6">
      <Breadcrumb />
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Stack</h1>
        <p className="text-lg text-default-500">
          Tools and technologies I use.
        </p>
      </header>
    </div>
  );
};

export default Page;
