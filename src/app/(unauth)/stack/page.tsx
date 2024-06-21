import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

import type { TagWithStacks } from "@/types/prisma";
import { getManyTag } from "@/data/get-tag";
import { SITE_NAME } from "@/lib/constants";
import { Breadcrumb } from "@/ui/breadcrumb";

export const metadata: Metadata = {
  title: `Stack | ${SITE_NAME}`,
  description: "Tools and technologies I use.",
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
          },
          orderBy: {
            name: "asc",
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
      <main className="space-y-4 divide-y-1 divide-default-100">
        {tags.map((tag, index) => (
          <div key={tag.id} id={tag.name} className="space-y-4">
            <h2
              className={twMerge(
                "text-2xl font-semibold",
                index !== 0 && "pt-8",
              )}
            >
              {tag.name}
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2">
              {tag.stacks.map((stack) => (
                <Link
                  href={`/stack/${stack.id}-${stack.name.replace(/ /g, "-")}`}
                  key={stack.id}
                  id={stack.name}
                  className="flex space-x-2 rounded-md px-4 py-2 duration-100 hover:bg-default-100"
                >
                  <Image
                    src={`https://assets.dulapahv.dev/images%2Fweb_front%2Freactjs.svg`}
                    alt={stack.name}
                    width={32}
                    height={32}
                    className="rounded-md"
                  />
                  <div className="flex flex-col">
                    <span>{stack.name}</span>
                    <span className="text-sm text-default-500">
                      Build and test APIs.
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
