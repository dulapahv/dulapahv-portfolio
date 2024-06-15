import { NextRequest } from "next/server";
import { Resend } from "resend";

import { EmailTemplate } from "@/components";
import { EmailTemplateProps } from "@/types";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const fullName = req.nextUrl.searchParams.get("name") || "N/A";
  const email = req.nextUrl.searchParams.get("email") || "N/A";
  const type = req.nextUrl.searchParams.get("type") || "N/A";
  const message = req.nextUrl.searchParams.get("message") || "N/A";

  try {
    const { data, error } = await resend.emails.send({
      from: "contact@dulapahv.dev",
      to: ["contact@dulapahv.dev"],
      subject: `${type} - ${fullName}`,
      react: EmailTemplate({
        fullName,
        email,
        type,
        message,
      } as EmailTemplateProps),
    });
    if (error) {
      return Response.json({ error }, { status: 500 });
    }
    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
