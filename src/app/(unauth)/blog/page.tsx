import type { Metadata } from 'next';
import Link from 'next/link';

import { ChevronRight } from 'lucide-react';

import type { TagWithStacks } from '@/types/prisma';
import { SITE_NAME } from '@/lib/constants';
import { formatDate } from '@/utils/format-date';
import { getManyBlog } from '@/data/get-blog';
import { getManyTag } from '@/data/get-tag';
import { BlogSearchToolbar } from '@/ui/blog-search-toolbar';
import { Breadcrumb } from '@/ui/breadcrumb';
import { PaginationFooter } from '@/ui/pagination-footer';

export const metadata: Metadata = {
  title: `Blog | ${SITE_NAME}`,
  description: 'Blog posts about my thoughts, ideas, and experiences.',
};

function getOrderBy(order_by: string): Record<string, any> {
  const orderMappings: Record<string, Record<string, any>> = {
    ['date-asc']: { createdAt: 'asc' },
    ['date-desc']: { createdAt: 'desc' },
  };

  return orderMappings[order_by];
}

export default async function Page(props: {
  searchParams?: Promise<{
    search: string;
    page: string;
    sortBy: string;
    perPage: string;
    tagId: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams?.search || '';
  const page = Number(searchParams?.page) || 1;
  const sortBy = searchParams?.sortBy || 'date-desc';
  const perPage = Number(searchParams?.perPage) || 5;
  const tagId = searchParams?.tagId || '';

  const tags = await getManyTag({
    select: {
      id: true,
      name: true,
      stacks: {
        select: {
          id: true,
          name: true,
        },
        orderBy: {
          name: 'asc',
        },
      },
    },
  });

  const blogs = await getManyBlog({
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      stacks: {
        select: {
          name: true,
        },
      },
    },
    where: {
      OR: [
        {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ],
      stacks: {
        some: {
          id: tagId ? { in: tagId.split(',') } : undefined,
        },
      },
    },
    orderBy: getOrderBy(sortBy as string),
    skip: (page - 1) * perPage,
    take: perPage,
  });

  const items = blogs.item;
  const count = blogs.count;
  const tagsItems = tags.item as TagWithStacks[];

  return (
    <div className="space-y-6">
      <Breadcrumb />
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Blog</h1>
        <p className="font-light text-default-500">
          Blog posts about my thoughts, ideas, and experiences.
        </p>
      </header>
      <main className="space-y-4 divide-y-1 divide-default-100">
        <div className="space-y-2">
          <BlogSearchToolbar count={count} tags={tagsItems} />
        </div>
        {items.length === 0 ? (
          <p className="py-6 text-center text-sm text-default-500">
            No blogs found
            {search ? (
              <>
                {' '}
                for <span className="text-default-800">{` "${search}"`}</span>
              </>
            ) : null}
            .
          </p>
        ) : null}
        {items.map((item) => (
          <Link
            href={`/blog/${item.id}-${item.title.replace(/ /g, '-')}`}
            key={item.id}
            className="group relative flex items-center justify-between gap-x-4 pt-3"
          >
            <div>
              <h2 className="font-semibold text-default-800 duration-100 group-hover:text-primary">
                {item.title}
              </h2>
              <p className="text-sm font-medium text-default-500 duration-100 group-hover:text-primary">{`${formatDate(item.createdAt)}`}</p>
              <p className="text-sm text-default-500 duration-100 group-hover:text-primary">
                {item.description}
              </p>
            </div>
            <ChevronRight
              size={20}
              className="flex-shrink-0 text-default-500 duration-100 group-hover:translate-x-2
                group-hover:text-primary"
            />
          </Link>
        ))}
      </main>
      {items.length > 0 ? (
        <footer className="flex justify-center">
          <PaginationFooter totalPages={Math.ceil(count / perPage)} />
        </footer>
      ) : null}
    </div>
  );
}
