import { BASE_URL } from "@/lib/constants";

/**
 * Builds the `/og` image URL with properly encoded query params.
 * Accepts optional `absolute: true` to prepend BASE_URL (needed in JSON-LD
 * where URLs must be fully qualified).
 */
export function buildOgUrl(
  title: string,
  description?: string,
  options?: { absolute?: boolean }
): string {
  const params = new URLSearchParams({ title });
  if (description) {
    params.set("description", description);
  }
  const path = `/og?${params.toString()}`;
  return options?.absolute ? `${BASE_URL}${path}` : path;
}
