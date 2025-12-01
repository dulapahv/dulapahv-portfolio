import type { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import {
  ArrowUpRightIcon,
  MicrophoneStageIcon,
  MusicNotesIcon
} from '@phosphor-icons/react/dist/ssr';

import { SPOTIFY_URL } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Card } from '@/components/card';
import { NowPlayingCard } from '@/components/now-playing-card';
import { getCurrentlyPlaying, getTopArtists, getTopTracks } from '@/app/actions/Spotify';

export async function SpotifyCard() {
  const [currentlyPlaying, topArtists, topTracks] = await Promise.all([
    getCurrentlyPlaying(),
    getTopArtists(5),
    getTopTracks(5)
  ]);

  if (!currentlyPlaying && topArtists.length === 0 && topTracks.length === 0) {
    return null;
  }

  const nowPlaying = currentlyPlaying?.is_playing ? currentlyPlaying.item : null;

  return (
    <Card className="flex h-full flex-col p-5">
      <div className="mb-4 flex items-start justify-between">
        <h2 className="text-foreground-muted text-xs font-semibold tracking-widest uppercase">
          Spotify
        </h2>
        <Link
          href={SPOTIFY_URL}
          target="_blank"
          rel="noopener noreferrer"
          title="View my Spotify profile"
          className="group"
        >
          <ArrowUpRightIcon
            className={cn(
              'text-foreground-muted size-5 transition-colors',
              'group-hover:text-mirai-red'
            )}
            weight="regular"
          />
        </Link>
      </div>

      <div className="flex flex-1 flex-col gap-6 overflow-y-auto">
        {nowPlaying && <NowPlayingCard track={nowPlaying} />}

        {topArtists.length > 0 && (
          <div>
            <div className="text-foreground mb-3 flex items-center gap-2 text-sm font-medium">
              <MicrophoneStageIcon className="size-4" weight="bold" />
              <span>Top Artists - Last 4 Weeks</span>
            </div>
            <div className="flex flex-col gap-2">
              {topArtists.map((artist, index) => (
                <Link
                  key={artist.id}
                  href={artist.external_urls.spotify as Route}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'flex items-center gap-3 rounded-lg p-2 transition-colors',
                    'hover:bg-background-muted'
                  )}
                >
                  <span className="text-foreground-muted text-sm font-medium">{index + 1}</span>
                  {artist.images[0] && (
                    <Image
                      src={artist.images[0].url}
                      alt={artist.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-foreground truncate text-sm font-medium">{artist.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {topTracks.length > 0 && (
          <div>
            <div className="text-foreground mb-3 flex items-center gap-2 text-sm font-medium">
              <MusicNotesIcon className="size-4" weight="bold" />
              <span>Top Tracks - Last 4 Weeks</span>
            </div>
            <div className="flex flex-col gap-2">
              {topTracks.map((track, index) => (
                <div
                  key={track.id}
                  className={cn(
                    'flex items-center gap-3 rounded-lg p-2 transition-colors',
                    'hover:bg-background-muted'
                  )}
                >
                  <span className="text-foreground-muted text-sm font-medium">{index + 1}</span>
                  {track.album.images[0] && (
                    <Link
                      href={track.external_urls.spotify as Route}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0"
                    >
                      <Image
                        src={track.album.images[0].url}
                        alt={track.album.name}
                        width={40}
                        height={40}
                        className="rounded"
                      />
                    </Link>
                  )}
                  <div className="min-w-0 flex-1">
                    <Link
                      href={track.external_urls.spotify as Route}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground block truncate text-sm font-medium hover:underline"
                    >
                      {track.name}
                    </Link>
                    <p className="text-foreground-muted truncate text-xs">
                      {track.artists.map((artist, artistIndex) => (
                        <span key={artist.id}>
                          <Link
                            href={artist.external_urls.spotify as Route}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-foreground transition-colors hover:underline"
                          >
                            {artist.name}
                          </Link>
                          {artistIndex < track.artists.length - 1 && ', '}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
