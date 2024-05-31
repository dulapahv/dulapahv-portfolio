import { cache } from "react";

import { prisma } from "@/db";

export const getManyExperience = cache(async (query?: any) => {
  const item = await prisma.experience.findMany(query);
  const totalCount = await prisma.experience.count();
  return { item, totalCount };
});

export const getUniqueExperience = cache(async (query?: any) => {
  const item = await prisma.experience.findUnique(query);
  return item;
});
