import { cache } from "react";

import { prisma } from "@/lib";

export const getManyBlog = cache(async (query?: any) => {
  const item = await prisma.blog.findMany(query);
  return item;
});

export const getUniqueBlog = cache(async (query?: any) => {
  const item = await prisma.blog.findUnique(query);
  return item;
});
