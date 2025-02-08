import { cache } from 'react';

import prisma from '@/lib/prisma';

export const getManyStack = cache(async (query?: any) => {
  const item = await prisma.stack.findMany({
    ...query,
    cacheStrategy: {
      ttl: 2_592_000, // 1 month
      swr: 7_776_000, // 3 month
    },
  });
  const count = await prisma.stack.count({
    where: query.where,
    cacheStrategy: {
      ttl: 2_592_000, // 1 month
      swr: 7_776_000, // 3 month
    },
  });
  return { item, count };
});

export const getUniqueStack = cache(async (query: any) => {
  const item = await prisma.stack.findUnique({
    ...query,
    cacheStrategy: {
      ttl: 2_592_000, // 1 month
      swr: 7_776_000, // 3 month
    },
  });
  return item;
});
