import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

import type { City, Country, Place, Project, Stack, Tag } from "@prisma/client";
import {
  Breadcrumb,
  PaginationFooter,
  ProjectSearchToolbar,
} from "@/components";
import { getManyProject, getManyTag } from "@/data";
import { formatDate } from "@/utils";

export const dynamic = "force-dynamic";

interface ProjectsWithPlace extends Project {
  place: Place & {
    city: City & {
      country: Country;
    };
  };
}

interface TagWithStacks extends Tag {
  stacks: Stack[];
}

const getOrderBy = (order_by: string): Record<string, any> => {
  const orderMappings: Record<string, Record<string, any>> = {
    ["start-date-asc"]: { startDate: "asc" },
    ["start-date-desc"]: { startDate: "desc" },
    ["end-date-asc"]: { endDate: "asc" },
    ["end-date-desc"]: { endDate: "desc" },
  };

  return orderMappings[order_by] || { endDate: "desc" };
};

const Page = async ({
  searchParams,
}: {
  searchParams?: {
    search: string;
    page: string;
    type: string;
    sortBy: string;
    perPage: string;
    tagId: string;
  };
}) => {
  const search = searchParams?.search || "";
  const page = Number(searchParams?.page) || 1;
  const type = searchParams?.type || "";
  const sortBy = searchParams?.sortBy || "";
  const perPage = Number(searchParams?.perPage) || 5;
  const tagId = searchParams?.tagId || "";

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
          name: "asc",
        },
      },
    },
  });

  const projects = await getManyProject({
    select: {
      id: true,
      title: true,
      description: true,
      startDate: true,
      endDate: true,
      place: {
        select: {
          name: true,
          city: {
            select: {
              name: true,
              country: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      stacks: {
        select: {
          name: true,
        },
      },
    },
    where: {
      placeId:
        type === "professional"
          ? {
              not: null,
            }
          : type === "personal"
            ? null
            : undefined,
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          place: {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
        {
          place: {
            city: {
              name: {
                contains: search,
                mode: "insensitive",
              },
              country: {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
          },
        },
      ],
      stacks: {
        some: {
          id: tagId ? { in: tagId.split(",") } : undefined,
        },
      },
    },
    orderBy: getOrderBy(sortBy as string),
    skip: (page - 1) * perPage,
    take: perPage,
  });

  const items = projects.item as ProjectsWithPlace[];
  const count = projects.count;
  const tagsItems = tags.item as TagWithStacks[];

  return (
    <div className="space-y-6">
      <Breadcrumb />
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Project</h1>
        <p className="font-light text-default-500">
          Professional and personal projects I have worked on.
        </p>
      </header>
      <main className="space-y-4 divide-y-1 divide-default-100">
        <div className="space-y-2">
          <ProjectSearchToolbar count={count} tags={tagsItems} />
        </div>
        {items.map((item) => (
          <Link
            href={`/project/${item.id}-${item.title.replace(/ /g, "-")}`}
            key={item.id}
            className="group relative flex items-center justify-between gap-x-4 pt-3"
          >
            <div>
              <h2 className="font-medium text-default-800 duration-100 group-hover:text-primary">
                {item.title}
                <span className="font-normal text-default-500 group-hover:text-primary">{` | ${formatDate(item.startDate)} - ${formatDate(item.endDate)}`}</span>
              </h2>
              <p className="text-sm font-medium text-default-500 duration-100 group-hover:text-primary">
                {item.description}
              </p>
            </div>
            <FaArrowRight className="flex-shrink-0 text-default-500 duration-100 group-hover:translate-x-2 group-hover:text-primary" />
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
};

export default Page;
