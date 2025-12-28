import type {
  Article,
  BreadcrumbList,
  Person,
  Thing,
  WebSite,
  WithContext,
} from "schema-dts";

import { combineSchemas, personSchema, websiteSchema } from "@/lib/json-ld";

interface JsonLdProps {
  schemas?: WithContext<Article | BreadcrumbList | Person | WebSite | Thing>[];
}

export function JsonLd({ schemas = [] }: JsonLdProps) {
  // Always include person and website schemas on every page
  const allSchemas = [personSchema, websiteSchema, ...schemas];

  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for Schema.org structured data
      dangerouslySetInnerHTML={{
        __html: combineSchemas(allSchemas).replace(/</g, "\\u003c"),
      }}
      type="application/ld+json"
    />
  );
}
