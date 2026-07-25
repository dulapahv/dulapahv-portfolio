// Rough heuristic used by Cloudflare's own markdown responses: ~4 characters
// per token. Precise enough for an agent budgeting a context window.
const CHARS_PER_TOKEN = 4;

/**
 * Creates a `text/markdown` Response.
 *
 * `Vary: accept` is mandatory here — the same URL serves HTML to browsers and
 * Markdown to agents, so a cache that ignores `Accept` would hand one to the
 * other.
 */
export function markdownResponse(content: string): Response {
  const body = `${content.trim()}\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "accept",
      "x-markdown-tokens": String(Math.ceil(body.length / CHARS_PER_TOKEN)),
    },
  });
}
