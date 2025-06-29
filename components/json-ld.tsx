import { WithContext } from 'schema-dts';

import { combineSchemas, personSchema, websiteSchema } from '@/lib/json-ld';

interface JsonLdProps {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  schemas?: Array<WithContext<any>>;
}

export const JsonLd = ({ schemas = [] }: JsonLdProps) => {
  // Always include person and website schemas on every page
  const allSchemas = [personSchema, websiteSchema, ...schemas];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: combineSchemas(allSchemas),
      }}
    />
  );
};
