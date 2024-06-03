import { cache } from "react";

import { prisma } from "@/lib";

export const getManyTag = cache(async (query?: any) => {
  const item = await prisma.tag.findMany(query);
  const count = await prisma.tag.count({ where: query.where });
  return { item, count };
});

export const getUniqueTag = cache(async (query: any) => {
  const item = await prisma.tag.findUnique(query);
  return item;
});
