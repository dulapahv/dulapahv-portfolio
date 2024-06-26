import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Link as NextUILink } from "@nextui-org/react";
import { Article, WithContext } from "schema-dts";

import { getManyEducation } from "@/data/get-education";
import {
  ASSETS_URL,
  BASE_URL,
  DESCRIPTION,
  GITHUB_URL,
  LINKEDIN_URL,
  LIVED_LOCATIONS,
  NAME,
  SITE_NAME,
  VISITED_LOCATIONS,
} from "@/lib/constants";
import { EducationWithPlace } from "@/types/prisma";
import { Clock } from "@/ui/clock";
import { Globe } from "@/ui/globe";
import { MarkdownRenderer } from "@/ui/markdown-renderer";
import { dynamicBlurDataUrl } from "@/utils/dynamic-blur-data-url";
import { formatDate } from "@/utils/format-date";
import { getRepoCount } from "@/utils/get-repo-count";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: DESCRIPTION,
};

export default async function Home() {
  const educations = (
    await getManyEducation({
      select: {
        id: true,
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
        degree: true,
        description: true,
        startDate: true,
        endDate: true,
      },
      orderBy: {
        endDate: "desc",
      },
    })
  ).item as EducationWithPlace[];

  const jsonLd: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": BASE_URL,
    },
    headline: SITE_NAME,
    description: DESCRIPTION,
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
        <header className="prose prose-neutral flex max-w-none flex-col justify-between gap-y-4 dark:prose-invert md:flex-row">
          <div className="order-2 w-full md:order-2 md:w-3/5">
            <h1 className="text-2xl/10 font-semibold text-default-700 md:text-3xl/[3rem]">
              <span className="text-primary">
                Hello{" "}
                <span className="inline-block cursor-grab hover:animate-wave">
                  👋
                </span>{" "}
                I&apos;m {NAME}{" "}
                <span className="not-prose inline-flex size-8 items-center rounded-md border border-default-300 bg-default-50 align-text-bottom shadow md:size-[38px]">
                  <Link
                    href={LINKEDIN_URL}
                    target="_blank"
                    className="rounded-md border-default-300 p-1 hover:bg-default-100"
                  >
                    <Image
                      src={`${ASSETS_URL}/images/linkedin.svg`}
                      alt="LinkedIn"
                      width={30}
                      height={30}
                      className="m-0"
                    />
                  </Link>
                </span>
                .
              </span>{" "}
              I'm a Thai 🛺 Software Engineer{" "}
              <span className="not-prose inline-flex items-center rounded-md border border-default-300 bg-default-50 align-text-bottom shadow">
                <Link
                  href={GITHUB_URL}
                  target="_blank"
                  className="rounded-l-md border-r border-default-300 p-1 hover:bg-default-100"
                >
                  <Image
                    src={`${ASSETS_URL}/images/octocat.svg`}
                    alt="GitHub"
                    width={30}
                    height={30}
                    className="m-0 size-6 md:size-[30px]"
                  />
                </Link>
                <span className="px-3 py-1 text-base">{getRepoCount()}</span>
              </span>{" "}
              currently based in Glasgow, Scotland <Clock />.
            </h1>
          </div>
          <div className="relative order-1 size-24 md:order-2 md:size-44">
            <Image
              src={`${ASSETS_URL}/images/profile_pic.jpg`}
              alt={NAME}
              fill
              sizes="(max-width: 768px) 96px, 176px"
              placeholder="blur"
              blurDataURL={await dynamicBlurDataUrl(
                `${ASSETS_URL}/images/profile_pic.jpg`,
              )}
              className="m-0 rounded-full object-contain"
            />
          </div>
        </header>
        <main className="space-y-8">
          <blockquote className="relative flex items-center rounded-md border border-default-200 bg-default-50/50 p-2 pl-6">
            <span className="absolute left-0 mr-4 h-full w-2 rounded-l-md bg-primary" />
            "Technology has the power to transform lives, and I am passionate
            about making technology equally accessible to everyone"
          </blockquote>
          <p>
            I'm currently a Software Engineer Intern at{" "}
            <NextUILink
              as={Link}
              href="https://www.natwestgroup.com/"
              color="primary"
              underline="hover"
              isExternal
              showAnchorIcon
            >
              NatWest Group
            </NextUILink>
            — a British banking and insurance holding company.
          </p>
          <div className="float-none mx-auto h-72 w-full overflow-hidden min-[408px]:w-96 md:float-left">
            <Globe
              width={384}
              height={320}
              markers={[...LIVED_LOCATIONS, ...VISITED_LOCATIONS]}
            />
          </div>
          <p>
            I am an experienced software engineer specializing in Front End
            technologies such as Next.js and React.js. My journey has also
            included Back End development with Express.js, as I strive to become
            a well-rounded Full Stack Developer capable of delivering
            comprehensive web applications.
          </p>
          <p>
            I hold a BSc Honours in Software Engineering from the{" "}
            <Link
              href="https://www.gla.ac.uk/"
              className="text-primary duration-100 hover:underline"
            >
              University of Glasgow
            </Link>{" "}
            and a BEng in Software Engineering from{" "}
            <Link
              href="https://www.kmitl.ac.th/"
              className="text-primary duration-100 hover:underline"
            >
              King Mongkut's Institute of Technology Ladkrabang (KMITL)
            </Link>
            . This dual degree reflects my commitment to the field, providing me
            with a strong theoretical foundation and practical experience
            through internships and projects.
          </p>
        </main>
        <footer className="space-y-4 border-t-1 border-default-300 pt-10 dark:border-default-100">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold">Education</h2>
            <p className="font-light text-default-500">
              My academic journey and qualifications.
            </p>
          </div>
          <ul className="space-y-6">
            {educations.map((education) => (
              <li key={education.id}>
                <h3 className="text-lg/6 font-semibold">
                  {education.place.name}
                </h3>
                <p className="text-sm text-default-500">
                  {education.place.city.name}{" "}
                  {education.place.city.country.name}
                </p>
                <p className="text-sm/7">
                  {formatDate(education.startDate)} -{" "}
                  {formatDate(education.endDate)}
                </p>
                <p className="text-sm font-medium">{education.degree}</p>
                {education.description ? (
                  <MarkdownRenderer>{education.description}</MarkdownRenderer>
                ) : null}
              </li>
            ))}
          </ul>
        </footer>
      </div>
    </>
  );
}
