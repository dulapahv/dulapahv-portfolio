import { cache } from "react";

import { prisma } from "@/db";

export const getManyExperience = cache(async (query?: any) => {
  const item = await prisma.experience.findMany(query);
  const count = await prisma.experience.count({ where: query.where });
  return { item, count };
});

export const getUniqueExperience = cache(async (query?: any) => {
  const item = await prisma.experience.findUnique(query);
  return item;
});
