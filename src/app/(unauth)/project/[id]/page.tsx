import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Article, WithContext } from "schema-dts";

import type { ProjectsWithPlace } from "@/types/prisma";
import { getUniqueProject } from "@/data/get-project";
import { ASSETS_URL, BASE_URL, NAME } from "@/lib/constants";
import { Breadcrumb } from "@/ui/breadcrumb";
import { MarkdownRenderer } from "@/ui/markdown-renderer";
import { UrlButton } from "@/ui/url-button";
import { dynamicBlurDataUrl } from "@/utils/dynamic-blur-data-url";
import { formatDate } from "@/utils/format-date";

interface Props {
  params: {
    id: string;
  };
}

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
      id: true,
      title: true,
      description: true,
      startDate: true,
      endDate: true,
      placeId: true,
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
          url: `${ASSETS_URL}/images/proj/${item.imagePath}/1.png`,
          alt: item.title,
        },
        ...previousImages,
      ],
    },
  };
}

export default async function Page({ params }: Props) {
  const id = params.id.split("-")[0];

  const item = (await getUniqueProject({
    select: {
      id: true,
      title: true,
      imagePath: true,
      imageDescription: true,
      description: true,
      url: true,
      startDate: true,
      endDate: true,
      placeId: true,
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
  })) as ProjectsWithPlace;

  const healedUrl = `/project/${item.id}-${item.title.replace(/ /g, "-")}`;
  if (`/project/${params.id}` != healedUrl) redirect(healedUrl);

  const coverImgUrl = `${ASSETS_URL}/images/proj/${item.imagePath}/1.png`;

  const jsonLd: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}${healedUrl}`,
    },
    headline: item.title,
    description: item.description,
    image: `${ASSETS_URL}/images/proj/${item.imagePath}/1.png`,
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
        <header>
          <h2 className="text-3xl/[3rem] font-semibold">
            {item.title}
          </h2>
          <p className="font-medium text-default-500">{`${formatDate(item.startDate)} - ${formatDate(item.endDate)}`}</p>
          {item.placeId ? (
            <>
              <p className="font-medium text-default-500">{item.place.name}</p>
              <p className="text-sm font-light text-default-500">
                {item.place.city.name}, {item.place.city.country.name}
              </p>
            </>
          ) : (
            <p className="font-medium text-default-500">Personal project</p>
          )}
        </header>
        <main className="space-y-8 pb-2">
          <Image
            src={coverImgUrl}
            alt={`Cover image for ${item.title}`}
            width={1920}
            height={1080}
            placeholder="blur"
            blurDataURL={await dynamicBlurDataUrl(coverImgUrl)}
            priority
            className="rounded-md"
          />
          <MarkdownRenderer>{item.description}</MarkdownRenderer>
          {item.url ? <UrlButton url={item.url} /> : null}
        </main>
        <footer className="space-y-4 border-t-1 border-default-300 pt-10 dark:border-default-100">
          <h3 className="text-2xl font-semibold" id="gallery">
            Gallery
          </h3>
          {item.imageDescription.map(async (description, index) => {
            const url = `${ASSETS_URL}/images/proj/${item.imagePath}/${index + 1}.png`;

            return (
              <div className="space-y-2" key={index}>
                <h3 className="text-sm sm:text-base">{`${index + 1}. ${description}`}</h3>
                <Image
                  src={url}
                  alt={`Image ${index + 1} for ${item.title}`}
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
