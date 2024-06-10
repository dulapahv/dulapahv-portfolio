import type { Metadata } from "next";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

import type {
  City,
  Country,
  Experience,
  Place,
  Stack,
  Tag,
} from "@prisma/client";
import {
  Breadcrumb,
  ExperienceSearchToolbar,
  PaginationFooter,
} from "@/components";
import { getManyCountry, getManyExperience, getManyTag } from "@/data";
import { formatDate } from "@/utils";

export const dynamic = "force-dynamic";

interface CountriesWithCities extends Country {
  cities: City[];
}

interface ExperienceWithPlace extends Experience {
  place: Place & {
    city: City & {
      country: Country;
    };
  };
}

interface TagWithStacks extends Tag {
  stacks: Stack[];
}

export const metadata: Metadata = {
  title: "Experience | DulapahV's Portfolio",
  description: "Companies and clients I've worked with.",
};

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
    locationId: string;
    sortBy: string;
    perPage: string;
    tagId: string;
  };
}) => {
  const search = searchParams?.search || "";
  const page = Number(searchParams?.page) || 1;
  const locationId = searchParams?.locationId || "";
  const sortBy = searchParams?.sortBy || "";
  const perPage = Number(searchParams?.perPage) || 5;
  const tagId = searchParams?.tagId || "";

  const experiences = await getManyExperience({
    select: {
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
      id: true,
      position: true,
      startDate: true,
      endDate: true,
    },
    where: {
      OR: [
        {
          position: {
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
      place: {
        cityId: locationId ? { in: locationId.split(",") } : undefined,
      },
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

  const countries = await getManyCountry({
    select: {
      id: true,
      name: true,
      cities: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

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

  const items = experiences.item as ExperienceWithPlace[];
  const count = experiences.count;
  const tagsItems = tags.item as TagWithStacks[];
  const countriesItems = countries.item as CountriesWithCities[];

  return (
    <div className="space-y-6">
      <Breadcrumb />
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Experience</h1>
        <p className="font-light text-default-500">
          Companies and clients I&apos;ve worked with.
        </p>
      </header>
      <main className="space-y-4 divide-y-1 divide-default-100">
        <div className="space-y-2">
          <ExperienceSearchToolbar
            count={count}
            countries={countriesItems}
            tags={tagsItems}
          />
        </div>
        {items.map((item) => (
          <Link
            href={`/experience/${item.id}-${item.place.name.replace(/ /g, "-")}-${item.position.replace(/ /g, "-")}`}
            key={item.id}
            className="group relative flex items-center justify-between gap-x-4 pt-3"
          >
            <div>
              <h2 className="font-medium text-default-800 duration-100 group-hover:text-primary">
                {item.position}
                <span className="font-normal text-default-500 group-hover:text-primary">{` | ${formatDate(item.startDate)} - ${formatDate(item.endDate)}`}</span>
              </h2>
              <p className="text-sm font-medium text-default-500 duration-100 group-hover:text-primary">
                {item.place.name}
              </p>
              <p className="text-xs text-default-500 duration-100 group-hover:text-primary">
                {item.place.city.name}, {item.place.city.country.name}
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
