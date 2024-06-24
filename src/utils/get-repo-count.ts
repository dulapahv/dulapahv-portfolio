import { get } from "@vercel/edge-config";

import { parseError } from "@/utils/parse-error";

export async function getRepoCount() {
  try {
    const res = await get("followers");
    return JSON.stringify(res);
  } catch (error) {
    const message = parseError(error);

    console.error(message);
  }
}
