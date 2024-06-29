import { NextRequest } from "next/server";
import { ErrorResponse, Resend } from "resend";

import { NAME } from "@/lib/constants";
import { EmailTemplateProps } from "@/types/types";
import { EmailTemplate } from "@/ui/email-template";
import { parseError } from "@/utils/parse-error";

export const runtime = "edge";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const fullName = req.nextUrl.searchParams.get("name");
  const email = req.nextUrl.searchParams.get("email");
  const type = req.nextUrl.searchParams.get("type");
  const message = req.nextUrl.searchParams.get("message");

  if (!fullName || !email || !type || !message) {
    const error = {
      message: "Please fill in all required fields",
      name: "missing_required_field",
    } as ErrorResponse;
    return Response.json({ error }, { status: 422 });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: `${NAME} <${process.env.EMAIL}>`,
      to: [`${process.env.EMAIL}`],
      subject: `✨ ${type} - ${fullName}`,
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
    const message = parseError(error);

    console.error(message);

    return Response.json(message, { status: 500 });
  }
}
