import { Poppins } from "next/font/google";
import Link from "next/link";
import { redirect } from "next/navigation";

import type { Experience, Place } from "@prisma/client";
import { Breadcrumb, MarkdownRenderer } from "@/components";
import { getUniqueExperience } from "@/data";
import { formatDate } from "@/utils";

interface ExperienceWithPlace extends Experience {
  place: Place;
}

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const Page = async ({ params }: { params: { id: string } }) => {
  const id = params.id.split("-")[0];

  const item = (await getUniqueExperience({
    where: {
      id: id,
    },
    select: {
      place: {
        select: {
          name: true,
          location: true,
        },
      },
      id: true,
      position: true,
      description: true,
      startDate: true,
      endDate: true,
    },
  })) as ExperienceWithPlace;

  const healedUrl = `/experience/${item.id}-${item.place.name.replace(/ /g, "-")}-${item.position.replace(/ /g, "-")}`;
  if (`/experience/${params.id}` != healedUrl) redirect(healedUrl);

  return (
    <div className="flex flex-col gap-y-8">
      <Breadcrumb lastItem={`${item.place.name} | ${item.position}`} />
      <header className="flex flex-col">
        <h2 className="text-3xl font-bold text-default-800 duration-100">
          {item.position}
          <span
            className={`text-2xl font-semibold text-default-500 ${poppins.className}`}
          >{` | ${formatDate(item.startDate)} - ${formatDate(item.endDate)}`}</span>
        </h2>
        <p className="text-lg font-semibold text-default-500 duration-100">
          {item.place.name}
        </p>
        <p className="text-base text-default-500 duration-100">
          {item.place.location}
        </p>
      </header>
      <main>
        <MarkdownRenderer>{item.description}</MarkdownRenderer>
      </main>
    </div>
  );
};

export default Page;
