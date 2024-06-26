import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Blog } from "@prisma/client";
import { Article, WithContext } from "schema-dts";

import { getUniqueBlog } from "@/data/get-blog";
import { ASSETS_URL, BASE_URL, NAME } from "@/lib/constants";
import { Breadcrumb } from "@/ui/breadcrumb";
import { MarkdownRenderer } from "@/ui/markdown-renderer";
import { dynamicBlurDataUrl } from "@/utils/dynamic-blur-data-url";

interface Props {
  params: {
    id: string;
  };
}

async function fetch({ params }: Props) {
  const id = params.id.split("-")[0];

  return (await getUniqueBlog({
    select: {
      id: true,
      title: true,
      description: true,
      content: true,
      imagePath: true,
      wordCount: true,
      createdAt: true,
      updatedAt: true,
    },
    where: {
      id: id,
    },
  })) as Blog;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const item = await fetch({ params });

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `Blog: ${item.title} | DulapahV's Portfolio`,
    description: item.description,
    openGraph: {
      title: `Blog: ${item.title} | DulapahV's Portfolio`,
      description: item.description,
      url: `${BASE_URL}/blog/${item.id}-${item.title.replace(/ /g, "-")}`,
      images: [
        {
          url: `${ASSETS_URL}/images/blog/${item.imagePath}/cover.png`,
          alt: `${item.title}`,
        },
        ...previousImages,
      ],
    },
  };
}

export default async function Page({ params }: Props) {
  const item = await fetch({ params });

  const healedUrl = `/blog/${item.id}-${item.title.replace(/ /g, "-")}`;
  if (`/blog/${params.id}` != healedUrl) redirect(healedUrl);

  const coverImgUrl = `${ASSETS_URL}/images/blog/${item.imagePath}/cover.png`;

  const jsonLd: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/${healedUrl}`,
    },
    headline: item.title,
    description: item.description,
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
        <Breadcrumb lastItem={item.title} />
        <header>
          <h2 className="text-3xl/[3rem] font-semibold">{item.title}</h2>
          <p className="text-sm text-default-500">{`Published on ${item.createdAt.toLocaleDateString("en-GB")} •
          ${Math.ceil(item.wordCount / 200)} min read
          `}</p>
        </header>
        <main className="space-y-8 pb-2">
          <p className="text-default-500">{item.description}</p>
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
        </main>
        {/* <footer className="space-y-4 border-t-1 border-default-300 pt-10 dark:border-default-100">
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
        </footer> */}
      </div>
    </>
  );
}
