import type { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";
import { Article, WithContext } from "schema-dts";

import type { ProjectsWithPlace } from "@/types";
import { Breadcrumb, MarkdownRenderer } from "@/components";
import { getUniqueProject } from "@/data";
import { ASSETS_URL, BASE_URL, NAME } from "@/lib/constants";
import { formatDate } from "@/utils";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
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

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `Project: ${item.title} | DulapahV's Portfolio`,
    description: item.description,
    openGraph: {
      title: `Project: ${item.title} | DulapahV's Portfolio`,
      description: item.description,
      url: `${BASE_URL}/project/${item.id}-${item.title.replace(/ /g, "-")}`,
      images: [
        {
          url: `${ASSETS_URL}/images/proj/${item.imagePath}/cover.png`,
          alt: item.title,
        },
        ...previousImages,
      ],
    },
  };
}

const Page = async ({ params }: Props) => {
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

  const jsonLd: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}${healedUrl}`,
    },
    headline: item.title,
    description: item.description,
    image: `${ASSETS_URL}/images/proj/${item.imagePath}/cover.png`,
    author: {
      "@type": "Person",
      name: NAME,
      url: BASE_URL,
    },
    publisher: {
      "@type": "Person",
      name: NAME,
      url: BASE_URL,
    },
    datePublished: item.createdAt.toISOString(),
    dateModified: item.updatedAt.toISOString(),
  };

  return (
    <>
      <section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </section>
      <div className="space-y-8">
        <Breadcrumb lastItem={`${item.title}`} />
        <header className="flex flex-col">
          <h2 className="text-2xl font-semibold text-default-800 duration-100">
            {item.title}
            <span className="font-medium text-default-500">{` | ${formatDate(item.startDate)} - ${formatDate(item.endDate)}`}</span>
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
    </>
  );
};

export default Page;
