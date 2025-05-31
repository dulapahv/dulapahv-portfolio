import { Suspense } from 'react';
import type { Metadata } from 'next';

import { createMetadata } from '@/lib/metadata';
import type { RecipientEmailTemplateProps } from '@/components/email';

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
  searchParams: Promise<Omit<RecipientEmailTemplateProps, 'captcha'>>;
}

export default async function ContactPage({ searchParams }: PageProps) {
  const params = (await searchParams) || {};

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      <div className="gap-0">
        <h1 className="text-foreground font-medium">{title}</h1>
        <p className="text-foreground-muted">{description}</p>
      </div>
      <div>
        <Suspense fallback={null}>
          <ContactForm searchParams={params} />
        </Suspense>
      </div>
    </div>
  );
}
