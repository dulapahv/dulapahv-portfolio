export function textResponse(content: string): Response {
  return new Response(content.trim(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
