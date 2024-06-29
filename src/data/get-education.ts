import { cache } from "react";

import prisma from "@/lib/prisma";

export const getManyEducation = cache(async (query?: any) => {
  const item = await prisma.education.findMany({
    ...query,
    cacheStrategy: {
      ttl: 2_592_000, // 1 month
      swr: 7_776_000, // 3 month
    },
  });
  const count = await prisma.education.count({
    where: query.where,
    cacheStrategy: {
      ttl: 2_592_000, // 1 month
      swr: 7_776_000, // 3 month
    },
  });
  return { item, count };
});

export const getUniqueEducation = cache(async (query?: any) => {
  const item = await prisma.education.findUnique({
    ...query,
    cacheStrategy: {
      ttl: 2_592_000, // 1 month
      swr: 7_776_000, // 3 month
    },
  });
  return item;
});
