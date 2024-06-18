import RSS from "rss";

import type { City, Country, Experience, Place, Stack } from "@prisma/client";
import { getManyExperience } from "@/data/get-experience";
import {
  BASE_URL,
  DESCRIPTION,
  NAME,
  SHORT_NAME,
  SITE_NAME,
} from "@/lib/constants";

interface ExperienceWithPlace extends Experience {
  place: Place & {
    city: City & {
      country: Country;
    };
  };
  stacks: Stack[];
}

const feed = new RSS({
  title: SITE_NAME,
  description: DESCRIPTION,
  site_url: BASE_URL,
  feed_url: `${BASE_URL}/feed.xml`,
  copyright: `${new Date().getFullYear()} ${SHORT_NAME}`,
  language: "en",
  pubDate: new Date(),
});

export async function GET() {
  const experiences = (
    await getManyExperience({
      select: {
        id: true,
        position: true,
        updatedAt: true,
        place: {
          select: {
            name: true,
          },
        },
        stacks: {
          select: {
            name: true,
          },
        },
      },
    })
  ).item as ExperienceWithPlace[];

  experiences.map((experience) => {
    const url = `${BASE_URL}/experience/${experience.id}-${experience.place.name.replace(/ /g, "-")}-${experience.position.replace(/ /g, "-")}`;
    feed.item({
      title: `${experience.place.name} | ${experience.position}`,
      guid: url,
      url: url,
      date: experience.updatedAt,
      description: `${experience.place.name} | ${experience.position}`,
      author: NAME,
      categories: experience.stacks.map((stack) => stack.name),
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
}
