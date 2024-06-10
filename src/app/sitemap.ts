import { MetadataRoute } from "next";

import type { City, Country, Experience, Place } from "@prisma/client";
import { getManyExperience, getManyProject } from "@/data";

interface ExperienceWithPlace extends Experience {
  place: Place & {
    city: City & {
      country: Country;
    };
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const links = [
    {
      url: "https://dulapahv.dev",
      lastModified: new Date(),
    },
    {
      url: "https://dulapahv.dev/experience",
      lastModified: new Date(),
    },
    {
      url: "https://dulapahv.dev/project",
      lastModified: new Date(),
    },
    {
      url: "https://dulapahv.dev/stack",
      lastModified: new Date(),
    },
    {
      url: "https://dulapahv.dev/contact",
      lastModified: new Date(),
    },
  ];

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
      },
    })
  ).item as ExperienceWithPlace[];

  const projects = (
    await getManyProject({
      select: {
        id: true,
        title: true,
        updatedAt: true,
      },
    })
  ).item;

  experiences.forEach((experience) => {
    links.push({
      url: `https://dulapahv.dev/experience/${experience.id}-${experience.place.name.replace(/ /g, "-")}-${experience.position.replace(/ /g, "-")}`,
      lastModified: experience.updatedAt,
    });
  });

  projects.forEach((project) => {
    links.push({
      url: `https://dulapahv.dev/project/${project.id}-${project.title.replace(/ /g, "-")}`,
      lastModified: project.updatedAt,
    });
  });

  return links;
}
