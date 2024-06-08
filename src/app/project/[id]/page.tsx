import { Poppins } from "next/font/google";
import { redirect } from "next/navigation";

import type { City, Country, Place, Project } from "@prisma/client";
import { Breadcrumb, MarkdownRenderer } from "@/components";
import { getUniqueProject } from "@/data";
import { formatDate } from "@/utils";

interface ProjectsWithPlace extends Project {
  place: Place & {
    city: City & {
      country: Country;
    };
  };
}

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const Page = async ({ params }: { params: { id: string } }) => {
  const id = params.id.split("-")[0];

  const item = (await getUniqueProject({
    where: {
      id: id,
    },
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
      id: true,
      title: true,
      description: true,
      startDate: true,
      endDate: true,
      placeId: true,
    },
  })) as ProjectsWithPlace;

  const healedUrl = `/project/${item.id}-${item.title.replace(/ /g, "-")}`;
  if (`/project/${params.id}` != healedUrl) redirect(healedUrl);

  return (
    <div className="flex flex-col gap-y-8">
      <Breadcrumb lastItem={`${item.title}`} />
      <header className="flex flex-col">
        <h2 className="text-3xl font-bold text-default-800 duration-100">
          {item.title}
          <span
            className={`text-2xl font-semibold text-default-500 ${poppins.className}`}
          >{` | ${formatDate(item.startDate)} - ${formatDate(item.endDate)}`}</span>
        </h2>
        {item.placeId ? (
          <>
            <p className="text-lg font-semibold text-default-500 duration-100">
              {item.place.name}
            </p>
            <p className="text-base text-default-500 duration-100">
              {item.place.city.name}, {item.place.city.country.name}
            </p>
          </>
        ) : (
          <p className="text-lg font-semibold text-default-500 duration-100">
            Personal project
          </p>
        )}
      </header>
      <main>
        <MarkdownRenderer>{item.description}</MarkdownRenderer>
      </main>
    </div>
  );
};

export default Page;
