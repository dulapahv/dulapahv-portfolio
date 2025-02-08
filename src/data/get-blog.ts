import { cache } from 'react';

import prisma from '@/lib/prisma';

export const getManyBlog = cache(async (query?: any) => {
  const item = await prisma.blog.findMany({
    ...query,
    cacheStrategy: {
      ttl: 604_800, // 1 week
      swr: 2_592_000, // 1 month
    },
  });
  const count = await prisma.blog.count({
    where: query.where,
    cacheStrategy: {
      ttl: 604_800, // 1 week
      swr: 2_592_000, // 1 month
    },
  });
  return { item, count };
});

export const getUniqueBlog = cache(async (query?: any) => {
  const item = await prisma.blog.findUnique({
    ...query,
    cacheStrategy: {
      ttl: 604_800, // 1 week
      swr: 2_592_000, // 1 month
    },
  });
  return item;
});
