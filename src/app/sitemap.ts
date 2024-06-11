import { MetadataRoute } from "next";

import type { City, Country, Experience, Place } from "@prisma/client";
import { getManyExperience, getManyProject } from "@/data";
import { BASE_URL } from "@/lib/constants";

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
      url: BASE_URL,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/experience`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/project`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/stack`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/contact`,
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
      url: `${BASE_URL}/experience/${experience.id}-${experience.place.name.replace(/ /g, "-")}-${experience.position.replace(/ /g, "-")}`,
      lastModified: experience.updatedAt,
    });
  });

  projects.forEach((project) => {
    links.push({
      url: `${BASE_URL}/project/${project.id}-${project.title.replace(/ /g, "-")}`,
      lastModified: project.updatedAt,
    });
  });

  return links;
}
