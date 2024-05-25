import { cache } from "react";

import prisma from "@/app/db";

export const getExperience = cache(async (query?: any) => {
  const item = await prisma.experience.findMany(query);
  return item;
});
