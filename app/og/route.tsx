import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

import { ASSETS_URL } from "@/lib/constants";

const FONT_URL_REGEX = /src: url\((.+)\) format\('(opentype|truetype)'\)/;

async function loadGoogleFont(font: string, weight: number, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}&text=${encodeURIComponent(text)}`;

  const css = await (await fetch(url)).text();

  const resource = css.match(FONT_URL_REGEX);

  if (resource) {
    const response = await fetch(resource[1]);
    return response.arrayBuffer();
  }

  throw new Error("failed to load font data");
}

export const GET = async (request: NextRequest) => {
  const getParam = (key: string): string | null => {
    return (
      request.nextUrl.searchParams.get(key) ||
      request.nextUrl.searchParams.get(`amp;${key}`)
    );
  };

  const title = getParam("title") || "";
  const description = getParam("description") || "";

  const textForFont = `${title || ""}${description || ""}` || " ";

  return new ImageResponse(
    <div
      style={{
        backgroundSize: "80px 80px",
        backgroundImage:
          "linear-gradient(to right, #1C1C1C 1px, transparent 1px), linear-gradient(to bottom, #1C1C1C 1px, transparent 1px)",
      }}
      tw="flex flex-col justify-between items-start w-full h-full bg-black p-12"
    >
      {/* biome-ignore lint/performance/noImgElement: OG image generation requires img tag */}
      <img
        alt="avatar"
        height={72}
        src={`${ASSETS_URL}/logo.svg`}
        tw="overflow-hidden"
        width={72}
      />
      <div tw="flex flex-col">
        <h1 tw="max-w-[50rem] text-[64px] font-bold leading-[69px] tracking-tighter m-0 text-[#F1F1F1]">
          {title}
        </h1>
        {description && (
          <p tw="max-w-[64rem] text-[24px] font-normal leading-[32px] tracking-tight text-[#A5A5A5] mt-4 mb-0">
            {description}
          </p>
        )}
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Geist",
          data: await loadGoogleFont("Geist", 400, textForFont),
          weight: 400,
          style: "normal",
        },
        {
          name: "Geist",
          data: await loadGoogleFont("Geist", 700, textForFont),
          weight: 700,
          style: "normal",
        },
      ],
    }
  );
};
