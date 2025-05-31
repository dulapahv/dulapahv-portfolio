import type { Metadata } from 'next';

import merge from 'deepmerge';

import { BASE_URL } from '@/lib/constants';

type MetadataGenerator = Omit<Metadata, 'description' | 'title'> & {
  title: string;
  description: string;
  ogText?: string;
  ogDescription?: string;
  image?: string;
};

const applicationName = 'DulapahV Portfolio';
const author: Metadata['authors'] = {
  name: 'Dulapah Vibulsanti',
  url: BASE_URL,
};
const publisher = 'Dulapah Vibulsanti';
const twitterHandle = '@dulapahv';

export const createMetadata = ({
  title,
  description,
  ogText,
  ogDescription,
  image,
  ...properties
}: MetadataGenerator): Metadata => {
  const parsedTitle = `${title} | ${applicationName}`;
  const imageUrl =
    image ??
    `/og?title=${encodeURIComponent(ogText ?? title)}&description=${encodeURIComponent(ogDescription ?? description)}`;

  const defaultMetadata: Metadata = {
    title: parsedTitle,
    description,
    applicationName,
    authors: [author],
    creator: author.name,
    formatDetection: {
      telephone: false,
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: parsedTitle,
    },
    openGraph: {
      title: parsedTitle,
      description,
      type: 'website',
      siteName: applicationName,
      locale: 'en_US',
      url: imageUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
        },
      ],
    },
    publisher,
    twitter: {
      title: parsedTitle,
      description,
      creatorId: twitterHandle,
      card: 'summary_large_image',
      creator: twitterHandle,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
        },
      ],
    },
  };

  const metadata: Metadata = merge(defaultMetadata, properties);

  return metadata;
};
