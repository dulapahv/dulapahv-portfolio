import { cache } from 'react';

import prisma from '@/lib/prisma';

export const getManyCountry = cache(async (query?: any) => {
  const item = await prisma.country.findMany({
    ...query,
    cacheStrategy: {
      ttl: 2_592_000, // 1 month
      swr: 7_776_000, // 3 month
    },
  });
  const count = await prisma.country.count({
    where: query.where,
    cacheStrategy: {
      ttl: 2_592_000, // 1 month
      swr: 7_776_000, // 3 month
    },
  });
  return { item, count };
});

export const getUniqueCountry = cache(async (query?: any) => {
  const item = await prisma.country.findUnique({
    ...query,
    cacheStrategy: {
      ttl: 2_592_000, // 1 month
      swr: 7_776_000, // 3 month
    },
  });
  return item;
});
