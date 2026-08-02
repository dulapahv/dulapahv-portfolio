import { BASE_URL } from "@/lib/constants";

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
