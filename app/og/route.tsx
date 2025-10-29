import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const GET = async (request: NextRequest) => {
  const getParam = (key: string): string | null => {
    return request.nextUrl.searchParams.get(key) || request.nextUrl.searchParams.get(`amp;${key}`);
  };

  const title = getParam('title');
  const description = getParam('description');

  const logo = await readFile(join(process.cwd(), 'app/og/logo.png'));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;
  const geistBold = await readFile(join(process.cwd(), 'app/og/Geist-Bold.ttf'));
  const geistRegular = await readFile(join(process.cwd(), 'app/og/Geist-Regular.ttf'));

  return new ImageResponse(
    (
      <div
        tw="flex flex-col justify-between items-start w-full h-full bg-black p-12"
        style={{
          backgroundSize: '80px 80px',
          backgroundImage:
            'linear-gradient(to right, #1C1C1C 1px, transparent 1px), linear-gradient(to bottom, #1C1C1C 1px, transparent 1px)'
        }}
      >
        <img src={logoSrc} alt="avatar" width={72} height={72} tw="overflow-hidden" />
        <div tw="flex flex-col">
          <h1 tw="max-w-[48rem] text-[64px] font-bold leading-[69px] tracking-tighter m-0 text-[#F1F1F1]">
            {title}
          </h1>
          {description && (
            <p tw="max-w-[64rem] text-[24px] font-normal leading-[32px] tracking-tight text-[#A5A5A5] mt-4 mb-0">
              {description}
            </p>
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Geist',
          data: geistBold,
          style: 'normal',
          weight: 700
        },
        {
          name: 'Geist',
          data: geistRegular,
          style: 'normal',
          weight: 400
        }
      ]
    }
  );
};
