import { cache } from "react";

import prisma from "@/lib/prisma";

export const getManyStack = cache(async (query?: any) => {
  const item = await prisma.stack.findMany(query);
  const count = await prisma.stack.count({ where: query.where });
  return { item, count };
});

export const getUniqueStack = cache(async (query: any) => {
  const item = await prisma.stack.findUnique(query);
  return item;
});
