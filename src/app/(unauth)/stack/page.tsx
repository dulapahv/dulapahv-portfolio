import type { Metadata } from 'next';
import Link from 'next/link';

import { Chip } from '@nextui-org/react';

import type { TagWithStacks } from '@/types/prisma';
import { ASSETS_URL, SITE_NAME } from '@/lib/constants';
import { getStackIconDisplayName } from '@/utils/get-stack-icon-display-name';
import { getStackIconFileName } from '@/utils/get-stack-icon-file-name';
import { getManyTag } from '@/data/get-tag';
import { Breadcrumb } from '@/ui/breadcrumb';
import { StackIconWrapper } from '@/ui/stack-icon-wrapper';

export const metadata: Metadata = {
  title: `Stack | ${SITE_NAME}`,
  description: 'Tools and technologies I use.',
};

export default async function Page() {
  const tags = (
    await getManyTag({
      select: {
        id: true,
        name: true,
        stacks: {
          select: {
            id: true,
            name: true,
            description: true,
            forceLightIcon: true,
            featured: true,
          },
          orderBy: {
            name: 'asc',
          },
        },
      },
    })
  ).item as TagWithStacks[];

  return (
    <div className="space-y-6">
      <Breadcrumb />
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Stack</h1>
        <p className="font-light text-default-500">
          Tools and technologies I use.
        </p>
      </header>
      <main className="space-y-12">
        {tags.map((tag) => (
          <div
            key={tag.id}
            id={tag.name}
            className="*:shadow-lg *:backdrop-blur-lg *:[-webkit-backdrop-filter:blur(16px)]"
          >
            <div
              className="flex h-12 items-center rounded-t-md border border-b-[0.5px] border-default-200
                bg-neutral-50/70 px-4 dark:bg-black/70"
            >
              <h2 className="text-sm font-medium text-default-500">
                {tag.name}
              </h2>
            </div>
            <ul
              className="grid grid-cols-1 rounded-b-md border border-t-[0.5px] border-default-200
                bg-white/70 p-2 dark:bg-neutral-950/70 sm:grid-cols-2"
            >
              {tag.stacks.map((stack) => (
                <Link
                  href={`/stack/${stack.id}-${stack.name.replace(/ /g, '-')}`}
                  key={stack.id}
                  id={stack.name}
                  className="group flex items-center space-x-4 rounded-md px-4 py-2 duration-100
                    hover:bg-default-100/50"
                >
                  <div className="relative size-9">
                    <StackIconWrapper
                      src={`${ASSETS_URL}/images/stack/${getStackIconFileName(stack.name)}.svg`}
                      forceLightTheme={stack.forceLightIcon}
                      alt={stack.name}
                      fill
                      className="flex-shrink-0 rounded-md object-contain"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-x-2">
                      <span className="duration-100 group-hover:text-primary">
                        {getStackIconDisplayName(stack.name)}
                      </span>
                      {stack.featured && (
                        <Chip
                          size="sm"
                          color="primary"
                          variant="flat"
                          classNames={{
                            base: 'h-[18px]',
                            content: 'text-primary',
                          }}
                        >
                          Featured
                        </Chip>
                      )}
                    </div>
                    <span className="text-sm text-default-500 duration-100 group-hover:text-primary">
                      {stack.description}
                    </span>
                  </div>
                </Link>
              ))}
            </ul>
          </div>
        ))}
      </main>
    </div>
  );
}
