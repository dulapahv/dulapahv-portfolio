import type { Metadata } from 'next';

import { Breadcrumb } from '@/ui/breadcrumb';
import { ContactForm } from '@/ui/contact-form';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    "Let me know what's on your mind and I'll get back to you as soon as possible.",
};

export default async function Page(props: {
  searchParams?: Promise<{
    name: string;
    email: string;
    type: string;
    message: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const name = searchParams?.name ? decodeURIComponent(searchParams.name) : '';
  const message = searchParams?.message
    ? decodeURIComponent(searchParams.message)
    : '';
  const type = searchParams?.type
    ? decodeURIComponent(searchParams.type)
    : 'general';
  const email = searchParams?.email
    ? decodeURIComponent(searchParams.email)
    : '';

  return (
    <div className="space-y-6">
      <Breadcrumb />
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Contact</h1>
        <p className="font-light text-default-500">
          Let me know what's on your mind and I'll get back to you as soon as
          possible.
        </p>
        <div className="py-4">
          <ContactForm
            name={name}
            email={email}
            type={type}
            message={message}
          />
        </div>
      </header>
    </div>
  );
}
