import { NextResponse } from "next/server";

import prisma from "@/app/db";

export async function GET(request: Request) {
  const response = await prisma.blog.findMany();

  return NextResponse.json(
    {
      response,
    },
    {
      status: 200,
    },
  );
}
