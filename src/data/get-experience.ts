import { cache } from "react";

import prisma from "@/lib/prisma";

export const getManyExperience = cache(async (query?: any) => {
  const item = await prisma.experience.findMany({
    ...query,
    cacheStrategy: {
      ttl: 2_592_000, // 1 month
      swr: 7_776_000, // 3 month
    },
  });
  const count = await prisma.experience.count({
    where: query.where,
    cacheStrategy: {
      ttl: 2_592_000, // 1 month
      swr: 7_776_000, // 3 month
    },
  });
  return { item, count };
});

export const getUniqueExperience = cache(async (query?: any) => {
  const item = await prisma.experience.findUnique({
    ...query,
    cacheStrategy: {
      ttl: 2_592_000, // 1 month
      swr: 7_776_000, // 3 month
    },
  });
  return item;
});
