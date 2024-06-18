import { cache } from "react";

import prisma from "@/lib/prisma";

export const getManyProject = cache(async (query?: any) => {
  const item = await prisma.project.findMany(query);
  const count = await prisma.project.count({ where: query.where });
  return { item, count };
});

export const getUniqueProject = cache(async (query: any) => {
  const item = await prisma.project.findUnique(query);
  return item;
});
