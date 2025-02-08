import { MetadataRoute } from "next";

import { getManyBlog } from "@/data/get-blog";
import { getManyExperience } from "@/data/get-experience";
import { getManyProject } from "@/data/get-project";
import { getManyTag } from "@/data/get-tag";
import { BASE_URL } from "@/lib/constants";
import { ExperienceWithPlace, TagWithStacks } from "@/types/prisma";

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

  const blogs = (
    await getManyBlog({
      select: {
        id: true,
        title: true,
        updatedAt: true,
      },
    })
  ).item;

  const tags = (
    await getManyTag({
      select: {
        name: true,
        stacks: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
  ).item as TagWithStacks[];

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

  blogs.forEach((blog) => {
    links.push({
      url: `${BASE_URL}/blog/${blog.id}-${blog.title.replace(/ /g, "-")}`,
      lastModified: blog.updatedAt,
    });
  });

  tags.forEach((stacks) => {
    stacks.stacks.forEach((stack) => {
      links.push({
        url: `${BASE_URL}/stack/${stack.id}-${stack.name.replace(/ /g, "-")}`,
        lastModified: new Date(),
      });
    });
  });

  return links;
}
