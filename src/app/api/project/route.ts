import prisma from "@/app/db";

export async function GET(request: Request) {
  const data = await prisma.project.findMany();

  return Response.json({ data });
}
