import Image from "next/image";
import Link from "next/link";
import { Link as NextUILink } from "@nextui-org/react";

import {
  ASSETS_URL,
  GITHUB_URL,
  LINKEDIN_URL,
  LIVED_LOCATIONS,
  NAME,
  VISITED_LOCATIONS,
} from "@/lib/constants";
import { Clock } from "@/ui/clock";
import { Globe } from "@/ui/globe";
import { dynamicBlurDataUrl } from "@/utils/dynamic-blur-data-url";
import { getRepoCount } from "@/utils/get-repo-count";

export default async function Home() {
  return (
    <div className="space-y-8">
      <header className="prose prose-neutral flex max-w-none flex-col justify-between gap-y-4 dark:prose-invert md:flex-row">
        <div className="order-2 w-full md:order-2 md:w-3/5">
          <h1 className="text-2xl/10 font-semibold text-default-700 md:text-3xl/[3rem]">
            <span className="text-primary">
              Hello{" "}
              <span className="hover:animate-wave inline-block cursor-grab">
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
            <span className="not-prose inline-flex items-center rounded-md border border-default-300 bg-default-50 align-text-bottom">
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
            alt="Dulapah Vibulsanti"
            fill
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
          <span className="absolute left-0 mr-4 h-full w-2 rounded-l-md bg-primary"></span>
          "Technology has the power to transform lives, and I am passionate
          about making technology equally accessible to everyone"
        </blockquote>
        <p>
          I'm currently a Software Engineer at{" "}
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
          included Back End development with Express.js, as I strive to become a
          well-rounded Full Stack Developer capable of delivering comprehensive
          web applications.
        </p>
        <p>
          I hold a BSc Honours in Software Engineering from the{" "}
          <Link
            href="https://www.gla.ac.uk/"
            className="text-primary hover:underline"
          >
            University of Glasgow
          </Link>{" "}
          and a BEng in Software Engineering from{" "}
          <Link
            href="https://www.kmitl.ac.th/"
            className="text-primary hover:underline"
          >
            King Mongkut's Institute of Technology Ladkrabang (KMITL)
          </Link>
          . This dual degree reflects my commitment to the field, providing me
          with a strong theoretical foundation and practical experience through
          internships and projects.
        </p>
      </main>
    </div>
  );
}
