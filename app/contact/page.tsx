import { unstable_ViewTransition as ViewTransition } from 'react';
import type { Metadata } from 'next';

import type { ContactPage } from 'schema-dts';

import { contactPageSchema } from '@/lib/json-ld';
import { createMetadata } from '@/lib/metadata';
import Breadcrumb from '@/components/breadcrumb';
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

export default async function ContactPage({
  searchParams,
}: PageProps<'/contact'>) {
  const params = await searchParams;
  const data = {
    name: params.name?.toString() || '',
    email: params.email?.toString() || '',
    message: params.message?.toString() || '',
  } as RecipientEmailTemplateProps;

  return (
    <>
      <JsonLd schemas={[contactPageSchema]} />
      <div className="mx-auto max-w-2xl space-y-4">
        <Breadcrumb lastLabel={title} />
      </div>
      <ViewTransition default="slide">
        <main className="mx-auto max-w-2xl space-y-4">
          <header className="gap-0">
            <h1 className="text-foreground text-lg font-medium">{title}</h1>
            <p className="text-foreground-muted">{description}</p>
          </header>
          <section aria-label="Contact form">
            <ContactForm searchParams={data} />
          </section>
        </main>
      </ViewTransition>
    </>
  );
}
