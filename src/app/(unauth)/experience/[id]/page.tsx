import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Article, WithContext } from "schema-dts";

import type { ExperienceWithPlace } from "@/types/prisma";
import { getUniqueExperience } from "@/data/get-experience";
import { ASSETS_URL, BASE_URL, NAME } from "@/lib/constants";
import { Breadcrumb } from "@/ui/breadcrumb";
import { MarkdownRenderer } from "@/ui/markdown-renderer";
import { dynamicBlurDataUrl } from "@/utils/dynamic-blur-data-url";
import { formatDate } from "@/utils/format-date";

interface Props {
  params: {
    id: string;
  };
}

async function fetch({ params }: Props) {
  const id = params.id.split("-")[0];

  return (await getUniqueExperience({
    select: {
      id: true,
      position: true,
      imagePath: true,
      imageDescription: true,
      description: true,
      startDate: true,
      endDate: true,
      createdAt: true,
      updatedAt: true,
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
    },
    where: {
      id: id,
    },
  })) as ExperienceWithPlace;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const item = await fetch({ params });

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `Experience: ${item.position} | DulapahV's Portfolio`,
    description: `${item.place.name} | ${item.position}`,
    openGraph: {
      title: `Experience: ${item.position} | DulapahV's Portfolio`,
      description: item.description,
      url: `${BASE_URL}/experience/${item.id}-${item.place.name.replace(/ /g, "-")}-${item.position.replace(/ /g, "-")}`,
      images: [
        {
          url: `${ASSETS_URL}/images/exp/${item.imagePath}/cover.png`,
          alt: `${item.place.name} | ${item.position}`,
        },
        ...previousImages,
      ],
    },
  };
}

export default async function Page({ params }: Props) {
  const item = await fetch({ params });

  const healedUrl = `/experience/${item.id}-${item.place.name.replace(/ /g, "-")}-${item.position.replace(/ /g, "-")}`;
  if (`/experience/${params.id}` != healedUrl) redirect(healedUrl);

  const coverImgUrl = `${ASSETS_URL}/images/exp/${item.imagePath}/cover.png`;

  const jsonLd: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}${healedUrl}`,
    },
    headline: `${item.place.name} | ${item.position}`,
    description: `${item.place.name} | ${item.position}`,
    image: coverImgUrl,
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
        <Breadcrumb lastItem={`${item.place.name} | ${item.position}`} />
        <header>
          <h2 className="text-3xl/[3rem] font-semibold">
            {item.position}
          </h2>
          <p className="font-medium text-default-500">{`${formatDate(item.startDate)} - ${formatDate(item.endDate)}`}</p>
          <p className="font-medium text-default-500">{item.place.name}</p>
          <p className="text-sm font-light text-default-500">
            {item.place.city.name}, {item.place.city.country.name}
          </p>
        </header>
        <main className="space-y-8 pb-2">
          <Image
            src={coverImgUrl}
            alt={`Cover image for ${item.place.name} | ${item.position}`}
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
            const url = `${ASSETS_URL}/images/exp/${item.imagePath}/${index + 1}.png`;

            return (
              <div className="space-y-2" key={index}>
                <h3 className="text-sm sm:text-base">{`${index + 1}. ${description}`}</h3>
                <Image
                  src={url}
                  alt={`Image ${index + 1} for ${item.place.name} | ${item.position}`}
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
}
