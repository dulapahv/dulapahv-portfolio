import { cache } from "react";

import prisma from "@/db/db";

export const getManyPlace = cache(async (query?: any) => {
  const item = await prisma.place.findMany(query);
  return item;
});

export const getUniquePlace = cache(async (query: any) => {
  const item = await prisma.place.findUnique(query);
  return item;
});
