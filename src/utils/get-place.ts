import { cache } from "react";

import prisma from "@/app/db";

export const getPlace = cache(async (query?: any) => {
  const item = await prisma.place.findMany(query);
  return item;
});
