import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Article, WithContext } from "schema-dts";

import type { City, Country, Experience, Place } from "@prisma/client";
import { Breadcrumb, MarkdownRenderer } from "@/components";
import { getUniqueExperience } from "@/data";
import { dynamicBlurDataUrl, formatDate } from "@/utils";

interface ExperienceWithPlace extends Experience {
  place: Place & {
    city: City & {
      country: Country;
    };
  };
}

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

  const item = (await getUniqueExperience({
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
      position: true,
      imagePath: true,
      imageDescription: true,
      description: true,
      startDate: true,
      endDate: true,
    },
  })) as ExperienceWithPlace;

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `Experience: ${item.position} | DulapahV's Portfolio`,
    description: item.description,
    openGraph: {
      title: `Experience: ${item.position} | DulapahV's Portfolio`,
      description: item.description,
      url: `https://dulapahv.dev/experience/${item.id}-${item.place.name.replace(/ /g, "-")}-${item.position.replace(/ /g, "-")}`,
      images: [
        {
          url: `https://assets.dulapahv.dev/images/exp/${item.imagePath}/cover.png`,
          alt: `${item.place.name} | ${item.position}`,
        },
        ...previousImages,
      ],
    },
  };
}

const Page = async ({ params }: Props) => {
  const id = params.id.split("-")[0];

  const item = (await getUniqueExperience({
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
      position: true,
      imagePath: true,
      imageDescription: true,
      description: true,
      startDate: true,
      endDate: true,
    },
  })) as ExperienceWithPlace;

  const healedUrl = `/experience/${item.id}-${item.place.name.replace(/ /g, "-")}-${item.position.replace(/ /g, "-")}`;
  if (`/experience/${params.id}` != healedUrl) redirect(healedUrl);

  const coverImgUrl = `https://assets.dulapahv.dev/images/exp/${item.imagePath}/cover.png`;

  const jsonLd: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://dulapahv.dev/experience/${item.id}-${item.place.name.replace(/ /g, "-")}-${item.position.replace(/ /g, "-")}`,
    },
    headline: `${item.place.name} | ${item.position}`,
    description: `${item.place.name} | ${item.position}`,
    image: `https://assets.dulapahv.dev/images/exp/${item.imagePath}/cover.png`,
    author: {
      "@type": "Person",
      name: "Dulapah Vibulsanti",
      url: "https://dulapahv.dev/",
    },
    publisher: {
      "@type": "Person",
      name: "Dulapah Vibulsanti",
      url: "https://dulapahv.dev/",
    },
    datePublished: formatDate(item.createdAt),
    dateModified: formatDate(item.updatedAt),
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
        <Breadcrumb lastItem={`${item.place.name} | ${item.position}`} />
        <header className="flex flex-col">
          <h2 className="text-xl font-semibold text-default-800 duration-100 sm:text-2xl">
            {item.position}
            <span className="font-medium text-default-500">{` | ${formatDate(item.startDate)} - ${formatDate(item.endDate)}`}</span>
          </h2>
          <p className="text-base font-medium text-default-500 duration-100 sm:text-lg">
            {item.place.name}
          </p>
          <p className="text-sm text-default-500 duration-100 sm:text-base">
            {item.place.city.name}, {item.place.city.country.name}
          </p>
        </header>
        <main className="space-y-8 pb-2">
          <Image
            src={coverImgUrl}
            alt={`${item.place.name} | ${item.position}`}
            width={1920}
            height={1080}
            placeholder="blur"
            blurDataURL={await dynamicBlurDataUrl(coverImgUrl)}
            priority
            className="rounded-md"
          />
          <MarkdownRenderer>{item.description}</MarkdownRenderer>
        </main>
        <footer className="space-y-4 border-t-1 border-default-300 pt-10 dark:border-default-100">
          <h3 className="text-2xl font-semibold" id="gallery">
            Gallery
          </h3>
          {item.imageDescription.map(async (description, index) => {
            const url = `https://assets.dulapahv.dev/images/exp/${item.imagePath}/${index + 1}.png`;

            return (
              <div className="space-y-2" key={index}>
                <h3 className="text-sm sm:text-base">{`${index + 1}. ${description}`}</h3>
                <Image
                  src={url}
                  alt={description}
                  width={1920}
                  height={1080}
                  placeholder="blur"
                  blurDataURL={await dynamicBlurDataUrl(url)}
                  className="rounded-md"
                />
              </div>
            );
          })}
        </footer>
      </div>
    </>
  );
};

export default Page;
