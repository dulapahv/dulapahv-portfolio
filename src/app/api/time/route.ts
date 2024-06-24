import { parseError } from "@/utils/parse-error";

export const GET = async (): Promise<Response> => {
  try {
    const res = await fetch(
      "http://worldtimeapi.org/api/timezone/Europe/London",
      {
        cache: "no-store",
      },
    );
    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    const message = parseError(error);

    console.error(message);

    return new Response(message, { status: 500 });
  }
};
