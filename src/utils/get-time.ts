import { BASE_URL } from "@/lib/constants";
import { parseError } from "@/utils/parse-error";

export async function getTime() {
  try {
    const res = await fetch(`${BASE_URL}/api/time`);
    const data = await res.json();
    return data.datetime;
  } catch (error) {
    const message = parseError(error);

    console.error(message);
  }
}
