"use client";

import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import type { SpotifyTrack } from "@/app/actions/spotify";
import { cn } from "@/lib/utils";

interface NowPlayingCardProps {
  track: SpotifyTrack;
}

export function NowPlayingCard({ track }: NowPlayingCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-lg bg-linear-to-br from-green-500/10 to-emerald-500/10 p-4",
        "border border-green-500/20"
      )}
    >
      <div className="absolute top-1 right-1 flex items-center gap-1.5">
        <div className="relative flex items-center justify-center">
          <div className="absolute size-1.5 animate-ping rounded-full bg-green-600 opacity-75" />
          <div className="relative size-1.5 rounded-full bg-green-600" />
        </div>
        <span className="font-semibold text-[10px] text-green-600 uppercase tracking-wider">
          Now Playing
        </span>
      </div>

      <div className="flex items-center gap-4">
        {track.album.images[0] && (
          <Link
            className="shrink-0"
            href={track.external_urls.spotify as Route}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Image
              alt={track.album.name}
              className="rounded shadow-lg"
              height={64}
              src={track.album.images[0].url}
              width={64}
            />
          </Link>
        )}

        <div className="min-w-0 flex-1">
          <Link
            className="block truncate font-semibold text-base text-foreground hover:underline"
            href={track.external_urls.spotify as Route}
            rel="noopener noreferrer"
            target="_blank"
          >
            {track.name}
          </Link>

          <p className="truncate text-foreground-muted text-sm">
            {track.artists.map((artist, index) => (
              <span key={artist.id}>
                <Link
                  className="hover:text-foreground hover:underline"
                  href={artist.external_urls.spotify as Route}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {artist.name}
                </Link>
                {index < track.artists.length - 1 && ", "}
              </span>
            ))}
          </p>

          <Link
            className="block truncate text-foreground-subtle text-xs hover:text-foreground-muted hover:underline"
            href={track.album.external_urls.spotify as Route}
            rel="noopener noreferrer"
            target="_blank"
          >
            {track.album.name}
          </Link>
        </div>
      </div>
    </div>
  );
}
