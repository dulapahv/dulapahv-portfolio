import Link from "next/link";

import type { Experience, Place } from "@prisma/client";
import { getExperience } from "@/utils/get-experience";

interface ExperienceWithPlace extends Experience {
  place: Place;
}

const Page = async () => {
  const items = (await getExperience({
    select: {
      place: {
        select: {
          name: true,
          location: true,
        },
      },
      id: true,
      position: true,
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
      <header className="mt-32 flex flex-col gap-y-2">
        <h1 className="text-3xl font-semibold">Experience</h1>
        <p className="text-lg text-default-500">
          Companies and clients I&apos;ve worked with.
        </p>
      </header>
      <main className="flex flex-col gap-y-4 divide-y-1 divide-default-100">
        {items.map((experience) => (
          <Link
            href={`/experience/${experience.id}-${encodeURIComponent(experience.place.name)}-${encodeURIComponent(experience.position)}`}
            key={experience.id}
            className="group pt-3"
          >
            <h2 className="text-lg font-bold duration-100 group-hover:text-primary">
              {experience.position}
            </h2>
            <p className="text-xs font-bold text-default-500 duration-100 group-hover:text-primary">
              {experience.place.name}
            </p>
            <p className="text-xs text-default-500 duration-100 group-hover:text-primary">
              {experience.place.location}
            </p>
          </Link>
        ))}
      </main>
    </div>
  );
};

export default Page;
