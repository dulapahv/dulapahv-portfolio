import { cache } from "react";

import { prisma } from "@/lib";

export const getManyPlace = cache(async (query?: any) => {
  const item = await prisma.place.findMany(query);
  const count = await prisma.place.count({ where: query.where });
  return { item, count };
});

export const getUniquePlace = cache(async (query: any) => {
  const item = await prisma.place.findUnique(query);
  return item;
});
