import { getTime } from "@/utils/get-time";

export async function Clock() {
  const time = (await getTime()).split("T")[1].split(".")[0].slice(0, 5);

  return (
    <div className="not-prose inline-flex items-center space-x-2 rounded-md border border-default-300 bg-default-50 px-2 py-1 align-text-bottom text-base shadow md:text-lg">
      <span>
        {time >= "06:00" && time < "12:00" ? (
          <span role="img" aria-label="morning">
            🌅
          </span>
        ) : time >= "12:00" && time < "18:00" ? (
          <span role="img" aria-label="afternoon">
            🌞
          </span>
        ) : time >= "18:00" && time < "21:00" ? (
          <span role="img" aria-label="evening">
            🌆
          </span>
        ) : (
          <span role="img" aria-label="night">
            🌙
          </span>
        )}
      </span>
      <span>{time}</span>
    </div>
  );
}
