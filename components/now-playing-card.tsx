'use client';

import type { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import type { SpotifyTrack } from '@/app/actions/Spotify';

interface NowPlayingCardProps {
  track: SpotifyTrack;
}

export function NowPlayingCard({ track }: NowPlayingCardProps) {
  return (
    <div
      className="relative rounded-lg border p-4"
      style={{
        background:
          'linear-gradient(to bottom right, color-mix(in oklch, transparent, var(--x-primary-500, rgb(34 197 94)) 10%), color-mix(in oklch, transparent, var(--x-primary-600, rgb(22 163 74)) 10%))',
        borderColor: 'color-mix(in oklch, transparent, var(--x-primary-500, rgb(34 197 94)) 20%)'
      }}
    >
      <div className="absolute top-3 right-3 flex items-center gap-2">
        <div className="relative flex items-center justify-center">
          <div
            className="absolute size-2 animate-ping rounded-full opacity-75"
            style={{ backgroundColor: 'var(--x-primary-600, rgb(22 163 74))' }}
          />
          <div
            className="relative size-2 rounded-full"
            style={{ backgroundColor: 'var(--x-primary-600, rgb(22 163 74))' }}
          />
        </div>
        <span
          className="text-xs font-semibold tracking-wider uppercase"
          style={{ color: 'var(--x-primary-600, rgb(22 163 74))' }}
        >
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

          <p className="text-foreground-muted mt-1 truncate text-sm">
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
            className="text-foreground-subtle hover:text-foreground-muted mt-1 block truncate text-xs transition-colors
              hover:underline"
          >
            {track.album.name}
          </Link>
        </div>
      </div>
    </div>
  );
}
