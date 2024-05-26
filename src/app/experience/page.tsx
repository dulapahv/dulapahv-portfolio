import { Poppins } from "next/font/google";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

import type { Experience, Place } from "@prisma/client";
import { Breadcrumb } from "@/components";
import { getManyExperience } from "@/data";

interface ExperienceWithPlace extends Experience {
  place: Place;
}

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const Page = async () => {
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
    orderBy: {
      // _relevance: {
      //   fields: ["position"],
      //   search: "",
      //   sort: "desc",
      // },
      endDate: "desc",
    },
  })) as ExperienceWithPlace[];

  return (
    <div className="flex flex-col gap-y-8">
      <Breadcrumb />
      <header className="flex flex-col gap-y-2">
        <h1 className="text-3xl font-bold">Experience</h1>
        <p className="text-lg text-default-500">
          Companies and clients I&apos;ve worked with.
        </p>
      </header>
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
                >{` | ${new Date(item.startDate).getFullYear()} - ${new Date(item.endDate).getFullYear()}`}</span>
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
