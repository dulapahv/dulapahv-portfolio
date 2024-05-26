import { cache } from "react";

import prisma from "@/db/db";

export const getManyExperience = cache(async (query?: any) => {
  const item = await prisma.experience.findMany(query);
  return item;
});

export const getUniqueExperience = cache(async (query?: any) => {
  const item = await prisma.experience.findUnique(query);
  return item;
});
