import { cache } from "react";

import prisma from "@/lib/prisma";

export const getManyCountry = cache(async (query?: any) => {
  const item = await prisma.country.findMany(query);
  const count = await prisma.country.count({ where: query.where });
  return { item, count };
});

export const getUniqueCountry = cache(async (query?: any) => {
  const item = await prisma.country.findUnique(query);
  return item;
});
