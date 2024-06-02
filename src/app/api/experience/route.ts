import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const data = await prisma.experience.findMany();

  return Response.json({ data });
}
