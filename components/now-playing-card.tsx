'use client';

import type { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import type { SpotifyTrack } from '@/app/actions/Spotify';

interface NowPlayingCardProps {
  track: SpotifyTrack;
}

export function NowPlayingCard({ track }: NowPlayingCardProps) {
  return (
    <div
      className={cn(
        'relative rounded-lg bg-linear-to-br from-green-500/10 to-emerald-500/10 p-4',
        'border border-green-500/20'
      )}
    >
      <div className="absolute top-1 right-1 flex items-center gap-1.5">
        <div className="relative flex items-center justify-center">
          <div className="absolute size-1.5 animate-ping rounded-full bg-green-600 opacity-75" />
          <div className="relative size-1.5 rounded-full bg-green-600" />
        </div>
        <span className="text-[10px] font-semibold tracking-wider text-green-600 uppercase">
          Now Playing
        </span>
      </div>

      <div className="flex items-center gap-4">
        {track.album.images[0] && (
          <Link
            href={track.external_urls.spotify as Route}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 transition-opacity hover:opacity-80"
          >
            <Image
              src={track.album.images[0].url}
              alt={track.album.name}
              width={64}
              height={64}
              className="rounded shadow-lg"
            />
          </Link>
        )}

        <div className="min-w-0 flex-1">
          <Link
            href={track.external_urls.spotify as Route}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground block truncate text-base font-semibold hover:underline"
          >
            {track.name}
          </Link>

          <p className="text-foreground-muted truncate text-sm">
            {track.artists.map((artist, index) => (
              <span key={artist.id}>
                <Link
                  href={artist.external_urls.spotify as Route}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors hover:underline"
                >
                  {artist.name}
                </Link>
                {index < track.artists.length - 1 && ', '}
              </span>
            ))}
          </p>

          <Link
            href={track.album.external_urls.spotify as Route}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground-subtle hover:text-foreground-muted block truncate text-xs transition-colors
              hover:underline"
          >
            {track.album.name}
          </Link>
        </div>
      </div>
    </div>
  );
}
