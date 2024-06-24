import { cache } from "react";

import prisma from "@/lib/prisma";

export const getManyEducation = cache(async (query?: any) => {
  const item = await prisma.education.findMany(query);
  const count = await prisma.education.count({ where: query.where });
  return { item, count };
});

export const getUniqueEducation = cache(async (query?: any) => {
  const item = await prisma.education.findUnique(query);
  return item;
});
