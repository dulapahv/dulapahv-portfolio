import { cache } from 'react';

import prisma from '@/lib/prisma';

export const getManyProject = cache(async (query?: any) => {
  const item = await prisma.project.findMany({
    ...query,
    cacheStrategy: {
      ttl: 2_592_000, // 1 month
      swr: 7_776_000, // 3 month
    },
  });
  const count = await prisma.project.count({
    where: query.where,
    cacheStrategy: {
      ttl: 2_592_000, // 1 month
      swr: 7_776_000, // 3 month
    },
  });
  return { item, count };
});

export const getUniqueProject = cache(async (query: any) => {
  const item = await prisma.project.findUnique({
    ...query,
    cacheStrategy: {
      ttl: 2_592_000, // 1 month
      swr: 7_776_000, // 3 month
    },
  });
  return item;
});
