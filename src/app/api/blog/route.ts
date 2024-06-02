import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const data = await prisma.blog.findMany();

  return Response.json({ data });
}
