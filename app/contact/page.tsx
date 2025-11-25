import { Suspense, ViewTransition } from 'react';
import type { Metadata } from 'next';

import type { ContactPage } from 'schema-dts';

import { contactPageSchema } from '@/lib/json-ld';
import { createMetadata } from '@/lib/metadata';
import Breadcrumb from '@/components/breadcrumb';
import { JsonLd } from '@/components/json-ld';

import { ContactFormWrapper } from './components/formWrapper';

const title = 'Contact';
const description = "Let me know what's on your mind and I'll get back to you as soon as possible.";

export const metadata: Metadata = createMetadata({
  title,
  description,
  ogText: 'Contact DulapahV'
});

function ContactFormSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="space-y-2">
        <div className="h-4 w-16 rounded bg-gray-200" />
        <div className="h-10 rounded bg-gray-200" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-16 rounded bg-gray-200" />
        <div className="h-10 rounded bg-gray-200" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-20 rounded bg-gray-200" />
        <div className="h-32 rounded bg-gray-200" />
      </div>
      <div className="h-10 w-32 rounded bg-gray-200" />
    </div>
  );
}

export default function ContactPage({ searchParams }: PageProps<'/contact'>) {
  return (
    <>
      <JsonLd schemas={[contactPageSchema]} />
      <div className="mx-auto max-w-3xl space-y-4">
        <Breadcrumb lastLabel={title} />
      </div>
      <ViewTransition enter="slide-in-right">
        <main className="mx-auto max-w-3xl space-y-4">
          <header className="gap-0">
            <h1 className="text-foreground text-lg font-medium">{title}</h1>
            <p className="text-foreground-muted">{description}</p>
          </header>
          <section aria-label="Contact form">
            <Suspense fallback={<ContactFormSkeleton />}>
              <ContactFormWrapper searchParams={searchParams} />
            </Suspense>
          </section>
        </main>
      </ViewTransition>
    </>
  );
}
