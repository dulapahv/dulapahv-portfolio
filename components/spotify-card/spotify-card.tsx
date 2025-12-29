import {
  ArrowUpRightIcon,
  MicrophoneStageIcon,
  MusicNotesIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  getCurrentlyPlaying,
  getTopArtists,
  getTopTracks,
} from "@/app/actions/spotify";
import { Card } from "@/components/card";
import { NowPlayingCard } from "@/components/now-playing-card/now-playing-card";
import { SPOTIFY_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

export async function SpotifyCard() {
  const [currentlyPlaying, topArtists, topTracks] = await Promise.all([
    getCurrentlyPlaying(),
    getTopArtists(5),
    getTopTracks(5),
  ]);

  if (!currentlyPlaying && topArtists.length === 0 && topTracks.length === 0) {
    return null;
  }

  const nowPlaying = currentlyPlaying?.is_playing
    ? currentlyPlaying.item
    : null;

  return (
    <Card className="flex h-full flex-col p-5">
      <div className="mb-4 flex items-start justify-between">
        <h2 className="font-semibold text-foreground-muted text-xs uppercase tracking-widest">
          Spotify
        </h2>
        <Link
          className="group"
          href={SPOTIFY_URL}
          rel="noopener noreferrer"
          target="_blank"
          title="View my Spotify profile"
        >
          <ArrowUpRightIcon
            className={cn(
              "size-5 text-foreground-muted transition-colors",
              "group-hover:text-mirai-red"
            )}
            weight="regular"
          />
        </Link>
      </div>

      <div className="flex flex-1 flex-col gap-6 overflow-y-auto">
        {nowPlaying && <NowPlayingCard track={nowPlaying} />}

        {topArtists.length > 0 && (
          <div>
            <div className="mb-3 flex items-center gap-2 font-medium text-foreground text-sm">
              <MicrophoneStageIcon className="size-4" weight="bold" />
              <span>Top Artists - Last 4 Weeks</span>
            </div>
            <div className="flex flex-col gap-2">
              {topArtists.map((artist, index) => (
                <Link
                  className={cn(
                    "flex items-center gap-3 rounded-lg p-2 transition-colors",
                    "hover:bg-background-muted"
                  )}
                  href={artist.external_urls.spotify as Route}
                  key={artist.id}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="font-medium text-foreground-muted text-sm">
                    {index + 1}
                  </span>
                  {artist.images[0] && (
                    <Image
                      alt={artist.name}
                      className="rounded-full"
                      height={40}
                      src={artist.images[0].url}
                      width={40}
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-foreground text-sm">
                      {artist.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {topTracks.length > 0 && (
          <div>
            <div className="mb-3 flex items-center gap-2 font-medium text-foreground text-sm">
              <MusicNotesIcon className="size-4" weight="bold" />
              <span>Top Tracks - Last 4 Weeks</span>
            </div>
            <div className="flex flex-col gap-2">
              {topTracks.map((track, index) => (
                <div
                  className={cn(
                    "flex items-center gap-3 rounded-lg p-2 transition-colors",
                    "hover:bg-background-muted"
                  )}
                  key={track.id}
                >
                  <span className="font-medium text-foreground-muted text-sm">
                    {index + 1}
                  </span>
                  {track.album.images[0] && (
                    <Link
                      className="shrink-0"
                      href={track.external_urls.spotify as Route}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Image
                        alt={track.album.name}
                        className="rounded"
                        height={40}
                        src={track.album.images[0].url}
                        width={40}
                      />
                    </Link>
                  )}
                  <div className="min-w-0 flex-1">
                    <Link
                      className="block truncate font-medium text-foreground text-sm hover:underline"
                      href={track.external_urls.spotify as Route}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {track.name}
                    </Link>
                    <p className="truncate text-foreground-muted text-xs">
                      {track.artists.map((artist, artistIndex) => (
                        <span key={artist.id}>
                          <Link
                            className="transition-colors hover:text-foreground hover:underline"
                            href={artist.external_urls.spotify as Route}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            {artist.name}
                          </Link>
                          {artistIndex < track.artists.length - 1 && ", "}
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
