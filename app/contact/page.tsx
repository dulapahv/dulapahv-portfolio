import { Suspense } from 'react';
import type { Metadata } from 'next';

import type { ContactPage } from 'schema-dts';

import { contactPageSchema } from '@/lib/json-ld';
import { createMetadata } from '@/lib/metadata';
import type { RecipientEmailTemplateProps } from '@/components/email';
import { JsonLd } from '@/components/json-ld';

import { ContactForm } from './components/form';

const title = 'Contact';
const description =
  "Let me know what's on your mind and I'll get back to you as soon as possible.";

export const metadata: Metadata = createMetadata({
  title,
  description,
  ogText: 'Contact DulapahV',
});

interface PageProps {
  searchParams: Promise<RecipientEmailTemplateProps>;
}

export default async function ContactPage({ searchParams }: PageProps) {
  const params = (await searchParams) || {};

  return (
    <>
      <JsonLd schemas={[contactPageSchema]} />
      <main className="mx-auto max-w-4xl space-y-4">
        <header className="gap-0">
          <h1 className="text-foreground font-medium">{title}</h1>
          <p className="text-foreground-muted">{description}</p>
        </header>
        <section aria-label="Contact form">
          <Suspense
            fallback={
              <div aria-live="polite" aria-label="Loading contact form">
                Loading...
              </div>
            }
          >
            <ContactForm searchParams={params} />
          </Suspense>
        </section>
      </main>
    </>
  );
}
