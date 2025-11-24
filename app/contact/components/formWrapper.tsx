import type { RecipientEmailTemplateProps } from '@/components/Email';

import { ContactForm } from './form';

interface ContactFormWrapperProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function ContactFormWrapper({ searchParams }: ContactFormWrapperProps) {
  const params = await searchParams;
  const data = {
    name: params.name?.toString() || '',
    email: params.email?.toString() || '',
    message: params.message?.toString() || ''
  } as RecipientEmailTemplateProps;

  return <ContactForm searchParams={data} />;
}
