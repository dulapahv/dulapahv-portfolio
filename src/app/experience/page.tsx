import { Poppins } from "next/font/google";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

import type { Experience, Place } from "@prisma/client";
import { Breadcrumb, SearchBox } from "@/components";
import { getManyExperience } from "@/data";
import { formatDate } from "@/utils";

export const dynamic = "force-dynamic";

interface ExperienceWithPlace extends Experience {
  place: Place;
}

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const getOrderBy = (order_by: string): Record<string, any> => {
  const orderMappings: Record<string, Record<string, any>> = {
    position: { position: "asc" },
    position_asc: { position: "asc" },
    position_desc: { position: "desc" },
    company: { place: { name: "asc" } },
    company_asc: { place: { name: "asc" } },
    company_desc: { place: { name: "desc" } },
    location: { place: { location: "asc" } },
    location_asc: { place: { location: "asc" } },
    location_desc: { place: { location: "desc" } },
    start_date: { startDate: "asc" },
    start_date_asc: { startDate: "asc" },
    start_date_desc: { startDate: "desc" },
    end_date: { endDate: "desc" },
    end_date_asc: { endDate: "asc" },
    end_date_desc: { endDate: "desc" },
  };

  return orderMappings[order_by] || { endDate: "desc" };
};

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { search, order_by } = searchParams;

  const items = (await getManyExperience({
    select: {
      place: {
        select: {
          name: true,
          location: true,
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
            location: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
      ],
    },
    orderBy: getOrderBy(order_by as string),
  })) as ExperienceWithPlace[];

  return (
    <div className="flex flex-col gap-y-6">
      <Breadcrumb />
      <header className="flex flex-col gap-y-2">
        <h1 className="text-3xl font-bold">Experience</h1>
        <p className="text-lg text-default-500">
          Companies and clients I&apos;ve worked with.
        </p>
      </header>
      <SearchBox />
      <main className="flex flex-col gap-y-4 divide-y-1 divide-default-100">
        {items.map((item) => (
          <Link
            href={`/experience/${item.id}-${item.place.name.replace(/ /g, "-")}-${item.position.replace(/ /g, "-")}`}
            key={item.id}
            className="group relative flex items-center justify-between gap-x-4 pt-3"
          >
            <div>
              <h2 className="text-lg font-semibold text-default-800 duration-100 group-hover:text-primary">
                {item.position}
                <span
                  className={`text-base font-medium text-default-500 group-hover:text-primary ${poppins.className}`}
                >{` | ${formatDate(item.startDate)} - ${formatDate(item.endDate)}`}</span>
              </h2>
              <p className="text-sm font-semibold text-default-500 duration-100 group-hover:text-primary">
                {item.place.name}
              </p>
              <p className="text-xs text-default-500 duration-100 group-hover:text-primary">
                {item.place.location}
              </p>
            </div>
            <FaArrowRight className="flex-shrink-0 text-default-500 duration-100 group-hover:translate-x-2 group-hover:text-primary" />
          </Link>
        ))}
      </main>
    </div>
  );
};

export default Page;
