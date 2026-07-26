import type { Metadata } from "next";
import { ViewTransition } from "react";

import Breadcrumb from "@/components/breadcrumb";
import { Mdx } from "@/components/mdx";
import { TableOfContents } from "@/components/toc/toc";
import { allPages } from "@/lib/content-utils/content-utils";
import { createMetadata } from "@/lib/metadata";

const SLUG = "security";

const getPage = () => {
  const found = allPages.find((p) => p.slug === SLUG);

  if (!found) {
    throw new Error(`Missing content/page/${SLUG}.mdx`);
  }

  return found;
};

const page = getPage();

export const metadata: Metadata = createMetadata({
  title: page.title,
  description: page.description,
  ogText: page.title,
});

export default function SecurityPage() {
  return (
    <>
      <div className="mx-auto max-w-3xl space-y-4">
        <Breadcrumb lastLabel={page.title} pathname={`/${SLUG}`} />
      </div>
      <ViewTransition enter="fade-lift" exit="fade-lift">
        <main className="mx-auto max-w-3xl space-y-4">
          <header className="space-y-2">
            <h1 className="font-semibold text-2xl">{page.title}</h1>
            <p className="text-foreground-muted" role="doc-subtitle">
              {page.description}
            </p>
          </header>

          <TableOfContents tocItems={page.tocItems} />

          <Mdx code={page.body} />
        </main>
      </ViewTransition>
    </>
  );
}
