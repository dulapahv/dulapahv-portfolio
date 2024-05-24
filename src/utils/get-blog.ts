import { cache } from "react";

import prisma from "@/app/db";

export const getBlog = cache(async (id: string) => {
  const item = await prisma.blog.findMany();
  return item;
});
