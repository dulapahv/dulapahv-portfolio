import prisma from "@/db/db";

export async function GET(request: Request) {
  const data = await prisma.blog.findMany();

  return Response.json({ data });
}
