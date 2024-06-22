import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { Chip } from "@nextui-org/react";
import { Stack } from "@prisma/client";
import { ChevronRight } from "lucide-react";
import { Article, WithContext } from "schema-dts";

import { getUniqueStack } from "@/data/get-stack";
import { ASSETS_URL, SITE_NAME } from "@/lib/constants";
import { Breadcrumb } from "@/ui/breadcrumb";
import { StackIconWrapper } from "@/ui/stack-icon-wrapper";
import { getStackIconName } from "@/utils/get-stack-icon-name";

interface Props {
  params: {
    id: string;
  };
}

// export async function generateMetadata(
//   { params }: Props,
//   parent: ResolvingMetadata,
// ): Promise<Metadata> {
//   const id = params.id.split("-")[0];
// }

export default async function Page({ params }: Props) {
  const id = params.id.split("-")[0];

  const item = (await getUniqueStack({
    where: {
      id: id,
    },
  })) as Stack;

  return (
    <>
      <section></section>
      <div className="space-y-8">
        <Breadcrumb lastItem={`${item.name}`} />
        <header className="group flex items-center space-x-4 rounded-md">
          <div className="relative size-12">
            <StackIconWrapper
              src={`${ASSETS_URL}/images/stack/${getStackIconName(item.name)}.svg`}
              forceLightTheme={item.forceLightIcon}
              alt={item.name}
              fill
              className="flex-shrink-0 rounded-md object-contain"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-x-2">
              <span className="text-xl font-medium">{item.name}</span>
              {item.featured && (
                <Chip size="sm" color="primary" variant="flat">
                  Featured
                </Chip>
              )}
            </div>
            <span className="text-default-500">Build and test APIs.</span>
          </div>
        </header>
        <main className="space-y-4 divide-y-1 divide-default-100">
          <Link
            href={`/experience?tagId=${item.id}`}
            key={item.id}
            className="group relative flex items-center justify-between gap-x-4 pt-3"
          >
            <h2 className="font-medium text-default-800 duration-100 group-hover:text-primary">
              Show {item.name} related experiences
            </h2>
            <ChevronRight
              size={20}
              className="flex-shrink-0 text-default-500 duration-100 group-hover:translate-x-2 group-hover:text-primary"
            />
          </Link>
          <Link
            href={`/project?tagId=${item.id}`}
            key={item.id}
            className="group relative flex items-center justify-between gap-x-4 pt-3"
          >
            <h2 className="font-medium text-default-800 duration-100 group-hover:text-primary">
              Show {item.name} related projects
            </h2>
            <ChevronRight
              size={20}
              className="flex-shrink-0 text-default-500 duration-100 group-hover:translate-x-2 group-hover:text-primary"
            />
          </Link>
          <Link
            href={`/blog?tagId=${item.id}`}
            key={item.id}
            className="group relative flex items-center justify-between gap-x-4 pt-3"
          >
            <h2 className="font-medium text-default-800 duration-100 group-hover:text-primary">
              Show {item.name} related blogs
            </h2>
            <ChevronRight
              size={20}
              className="flex-shrink-0 text-default-500 duration-100 group-hover:translate-x-2 group-hover:text-primary"
            />
          </Link>
        </main>
      </div>
    </>
  );
}
