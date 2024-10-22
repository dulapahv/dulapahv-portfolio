import { cache } from "react";

import prisma from "@/lib/prisma";

export const getManyTag = cache(async (query?: any) => {
  const item = await prisma.tag.findMany({
    ...query,

  });
  const count = await prisma.tag.count({
    where: query.where,

  });
  return { item, count };
});

export const getUniqueTag = cache(async (query: any) => {
  const item = await prisma.tag.findUnique({
    ...query,
    cacheStrategy: {
      ttl: 2_592_000, // 1 month
      swr: 7_776_000, // 3 month
    },
  });
  return item;
});
