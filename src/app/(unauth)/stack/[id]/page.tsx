import type { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Chip } from '@nextui-org/react';
import { Stack } from '@prisma/client';
import { ChevronRight } from 'lucide-react';
import { Article, WithContext } from 'schema-dts';

import { ASSETS_URL, BASE_URL, NAME } from '@/lib/constants';
import { getStackIconDisplayName } from '@/utils/get-stack-icon-display-name';
import { getStackIconFileName } from '@/utils/get-stack-icon-file-name';
import { getUniqueStack } from '@/data/get-stack';
import { Breadcrumb } from '@/ui/breadcrumb';
import { StackIconWrapper } from '@/ui/stack-icon-wrapper';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

async function fetch({ params }: Props) {
  const id = (await params).id.split('-')[0];

  const item = (await getUniqueStack({
    where: {
      id: id,
    },
  })) as Stack;

  if (!item) redirect('/404');

  return item;
}

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const params = await props.params;
  const item = await fetch(props);

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `Stack: ${item.name} | DulapahV's Portfolio`,
    description: item.description,
    openGraph: {
      title: `Stack: ${item.name} | DulapahV's Portfolio`,
      description: item.description || 'Tools and technologies I use.',
      url: `${BASE_URL}/stack/${item.id}-${item.name.replace(/ /g, '-')}`,
      images: [
        {
          url: `${ASSETS_URL}/images/stack/${getStackIconFileName(item.name)}.svg`,
          alt: `${item.name}`,
        },
        ...previousImages,
      ],
    },
  };
}

export default async function Page(props: Props) {
  const params = await props.params;
  const item = await fetch(props);

  const healedUrl = `/stack/${item.id}-${item.name.replace(/ /g, '-')}`;
  if (`/stack/${params.id}` != healedUrl) redirect(healedUrl);

  const coverImgUrl = `${ASSETS_URL}/images/stack/${getStackIconFileName(item.name)}.svg`;

  const jsonLd: WithContext<Article> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/${healedUrl}`,
    },
    headline: item.name,
    description: item.description || 'Tools and technologies I use.',
    image: coverImgUrl,
    author: {
      '@type': 'Person',
      name: NAME,
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: NAME,
      url: BASE_URL,
    },
  };

  return (
    <>
      <section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </section>
      <div className="space-y-8">
        <Breadcrumb lastItem={`${item.name}`} />
        <header className="group flex items-center space-x-4 rounded-md">
          <div className="relative size-12">
            <StackIconWrapper
              src={`${ASSETS_URL}/images/stack/${getStackIconFileName(item.name)}.svg`}
              forceLightTheme={item.forceLightIcon}
              alt={item.name}
              fill
              className="flex-shrink-0 rounded-md object-contain"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-x-2">
              <span className="text-xl font-medium">
                {getStackIconDisplayName(item.name)}
              </span>
              {item.featured && (
                <Chip
                  size="sm"
                  color="primary"
                  variant="flat"
                  classNames={{
                    content: 'text-primary',
                  }}
                >
                  Featured
                </Chip>
              )}
            </div>
            <span className="text-default-500">{item.description}</span>
          </div>
        </header>
        <main className="space-y-4 divide-y-1 divide-default-100">
          <Link
            href={`/experience?tagId=${item.id}`}
            key={item.id}
            className="group relative flex items-center justify-between gap-x-4 pt-3"
          >
            <h2 className="font-medium text-default-800 duration-100 group-hover:text-primary">
              Show related experiences
            </h2>
            <ChevronRight
              size={20}
              className="flex-shrink-0 text-default-500 duration-100 group-hover:translate-x-2
                group-hover:text-primary"
            />
          </Link>
          <Link
            href={`/project?tagId=${item.id}`}
            key={item.id}
            className="group relative flex items-center justify-between gap-x-4 pt-3"
          >
            <h2 className="font-medium text-default-800 duration-100 group-hover:text-primary">
              Show related projects
            </h2>
            <ChevronRight
              size={20}
              className="flex-shrink-0 text-default-500 duration-100 group-hover:translate-x-2
                group-hover:text-primary"
            />
          </Link>
          <Link
            href={`/blog?tagId=${item.id}`}
            key={item.id}
            className="group relative flex items-center justify-between gap-x-4 pt-3"
          >
            <h2 className="font-medium text-default-800 duration-100 group-hover:text-primary">
              Show related blogs
            </h2>
            <ChevronRight
              size={20}
              className="flex-shrink-0 text-default-500 duration-100 group-hover:translate-x-2
                group-hover:text-primary"
            />
          </Link>
        </main>
      </div>
    </>
  );
}
