'use client';

import type { FC } from 'react';
import dynamic from 'next/dynamic';

import type { YouTubePlayerProps } from 'react-player/youtube';

import { cn } from '@/lib/utils';

const ReactPlayer = dynamic(
  async () =>
    import(
      /* webpackChunkName: "react-player" */
      'react-player/youtube'
    ),
  { ssr: false }
);

type VideoProperties = YouTubePlayerProps & {
  readonly className?: string;
};

export const Video: FC<VideoProperties> = ({ className, ...properties }) => (
  <div className={cn('relative aspect-video overflow-hidden rounded-md', className)}>
    <ReactPlayer
      {...properties}
      width="100%"
      height="100%"
      style={{ position: 'absolute', inset: 0 }}
    />
  </div>
);
