import type { COBEOptions } from "cobe";
import Image from "next/image";
import Link from "next/link";
import { Link as NextUILink } from "@nextui-org/react";
import { get } from "@vercel/edge-config";

import { ASSETS_URL, GITHUB_URL, LINKEDIN_URL, NAME } from "@/lib/constants";
import { Globe } from "@/ui/globe";
import { dynamicBlurDataUrl } from "@/utils/dynamic-blur-data-url";
import { parseError } from "@/utils/parse-error";

async function getRepoCount() {
  try {
    const res = await get("followers");
    return JSON.stringify(res);
  } catch (error) {
    const message = parseError(error);

    console.error(message);
  }
}

const lived: COBEOptions["markers"] = [
  // Bangkok, thailand
  { location: [13.7563, 100.5018], size: 0.2 },

  // Glasgow, Scotland
  { location: [55.8617, 4.2583], size: 0.2 },
];

const visited: COBEOptions["markers"] = [
  // Ayutthaya, Thailand
  { location: [14.3692, 100.5877], size: 0.1 },

  // Chiang Mai, Thailand
  { location: [18.7883, 98.9853], size: 0.1 },

  // Nakhon Si Thammarat, Thailand
  { location: [8.4325, 99.9599], size: 0.1 },

  // Phuket, Thailand
  { location: [7.8804, 98.3923], size: 0.1 },

  // Trat, Thailand
  { location: [12.4202, 102.5298], size: 0.1 },

  // Kuala Lumpur, Malaysia
  { location: [3.1319, 101.6841], size: 0.1 },

  // Edinburgh, Scotland
  { location: [55.9533, 3.1883], size: 0.1 },

  // London, England
  { location: [51.5074, 0.1278], size: 0.1 },
];

async function getTimezone() {
  try {
    const res = await fetch(
      "http://worldtimeapi.org/api/timezone/Europe/London",
    );
    const data = await res.json();
    return data.datetime.split("T")[1].split(".")[0].slice(0, 5);
  } catch (error) {
    const message = parseError(error);

    console.error(message);
  }
}

export default async function Home() {
  return (
    <div className="space-y-8">
      <header className="prose prose-neutral flex max-w-none flex-col justify-between gap-y-4 dark:prose-invert md:flex-row">
        <div className="order-2 w-full md:order-2 md:w-3/5">
          <h1 className="text-2xl/10 font-semibold text-default-700 md:text-3xl/[3rem]">
            Hello 👋 I&apos;m {NAME}{" "}
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
            . I'm a Thai 🛺 Software Engineer{" "}
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
              <span className="px-2.5 py-1 text-base font-normal">
                {getRepoCount()}
              </span>
            </span>{" "}
            currently based in Glasgow, Scotland{" "}
            <span className="not-prose inline-flex items-center rounded-md border border-default-300 bg-default-50 px-2.5 py-1 align-text-bottom text-base shadow md:text-lg">
              {getTimezone()}
            </span>
            .
          </h1>
        </div>
        <div className="relative order-1 size-24 md:order-2 md:size-56">
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
        <p>
          I'm currently a Software Engineer at{" "}
          <NextUILink
            as={Link}
            href="https://www.natwestgroup.com/"
            color="primary"
            isExternal
            showAnchorIcon
          >
            NatWest Group
          </NextUILink>
          — a British banking and insurance holding company.
        </p>
        <div className="float-none mx-auto aspect-[4/3] max-w-96 overflow-hidden md:float-right">
          <Globe
            width={384}
            height={(384 / 4) * 3}
            markers={[...lived, ...visited]}
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
          I hold a BSc Honours in Software Engineering from the University of
          Glasgow and a BEng in Software Engineering from King Mongkut's
          Institute of Technology Ladkrabang (KMITL). This dual degree reflects
          my commitment to the field, providing me with a strong theoretical
          foundation and practical experience through internships and projects.
        </p>
        <p>
          I aspire to be a software developer who makes a meaningful impact by
          bridging the digital divide and using technology for positive social
          change. I am passionate about making technology accessible to everyone
          and eager to develop innovative solutions for healthcare, education,
          and sustainability.
        </p>
      </main>
    </div>
  );
}
