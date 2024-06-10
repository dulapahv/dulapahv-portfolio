import RSS from "rss";

import type { City, Country, Experience, Place, Stack } from "@prisma/client";
import { getManyExperience, getManyProject } from "@/data";

interface ExperienceWithPlace extends Experience {
  place: Place & {
    city: City & {
      country: Country;
    };
  };
  stacks: Stack[];
}

const feed = new RSS({
  title: "DulapahV's Portfolio",
  description:
    "This website is a personal project to showcase my skills and experience, as well as to share my knowledge and experience with others.",
  site_url: "https://dulapahv.dev",
  feed_url: `https://dulapahv.dev/feed.xml`,
  copyright: `${new Date().getFullYear()} DulapahV`,
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
    feed.item({
      title: `${experience.place.name} | ${experience.position}`,
      guid: `https://dulapahv.dev/experience/${experience.id}-${experience.place.name.replace(/ /g, "-")}-${experience.position.replace(/ /g, "-")}`,
      url: `https://dulapahv.dev/experience/${experience.id}-${experience.place.name.replace(/ /g, "-")}-${experience.position.replace(/ /g, "-")}`,
      date: experience.updatedAt,
      description: `${experience.place.name} | ${experience.position}`,
      author: "Dulapah Vibulsanti",
      categories: experience.stacks.map((stack) => stack.name),
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
}
