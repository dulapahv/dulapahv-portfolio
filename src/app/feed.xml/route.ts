import RSS from "rss";

import type {
  BlogsWithStacks,
  ExperienceWithPlaceStacks,
  ProjectWithPlaceStacks,
  TagWithStacks,
} from "@/types/prisma";
import { getManyBlog } from "@/data/get-blog";
import { getManyExperience } from "@/data/get-experience";
import { getManyProject } from "@/data/get-project";
import { getManyTag } from "@/data/get-tag";
import {
  BASE_URL,
  DESCRIPTION,
  NAME,
  SHORT_NAME,
  SITE_NAME,
} from "@/lib/constants";

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
  ).item as ExperienceWithPlaceStacks[];

  const projects = (
    await getManyProject({
      select: {
        id: true,
        title: true,
        updatedAt: true,
        stacks: {
          select: {
            name: true,
          },
        },
      },
    })
  ).item as ProjectWithPlaceStacks[];

  const blogs = (
    await getManyBlog({
      select: {
        id: true,
        title: true,
        updatedAt: true,
        stacks: {
          select: {
            name: true,
          },
        },
      },
    })
  ).item as BlogsWithStacks[];

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

  projects.map((project) => {
    const url = `${BASE_URL}/project/${project.id}-${project.title.replace(/ /g, "-")}`;
    feed.item({
      title: project.title,
      guid: url,
      url: url,
      date: project.updatedAt,
      description: project.title,
      author: NAME,
      categories: project.stacks.map((stack) => stack.name),
    });
  });

  blogs.map((blog) => {
    const url = `${BASE_URL}/blog/${blog.id}-${blog.title.replace(/ /g, "-")}`;
    feed.item({
      title: blog.title,
      guid: url,
      url: url,
      date: blog.updatedAt,
      description: blog.title,
      author: NAME,
      categories: blog.stacks.map((stack) => stack.name),
    });
  });

  tags.map((stacks) => {
    stacks.stacks.map((stack) => {
      const url = `${BASE_URL}/stack/${stack.id}-${stack.name.replace(/ /g, "-")}`;
      feed.item({
        title: stack.name,
        guid: url,
        url: url,
        date: new Date(),
        description: stack.name,
        author: NAME,
        categories: ["stack"],
      });
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
}
