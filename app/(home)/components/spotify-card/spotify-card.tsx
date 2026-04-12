import {
  MicrophoneStageIcon,
  MusicNotesIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import {
  getCurrentlyPlaying,
  getTopArtists,
  getTopTracks,
} from "@/app/actions/spotify";
import { Link } from "@/components/link";
import { SPOTIFY_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Card } from "../card";
import { CardHeader, CardHeaderIconLink } from "../card-header";
import { Marquee } from "../marquee/marquee";
import { NowPlayingCard } from "../now-playing-card/now-playing-card";

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
      <CardHeader
        action={
          <CardHeaderIconLink
            href={SPOTIFY_URL}
            title="View my Spotify profile"
          />
        }
        title="Spotify"
      />

      <div className="flex flex-1 flex-col gap-6 overflow-y-auto">
        {nowPlaying ? <NowPlayingCard track={nowPlaying} /> : null}

        {topArtists.length > 0 ? (
          <div>
            <div className="mb-3 flex items-center gap-2 font-medium text-foreground text-sm">
              <MicrophoneStageIcon className="size-4" weight="bold" />
              <span>Top Artists - Last 4 Weeks</span>
            </div>
            <div className="flex flex-col gap-2">
              {topArtists.map((artist, index) => (
                <Link
                  className={cn(
                    "flex items-center gap-3 rounded-lg p-2",
                    "hover:bg-background-muted"
                  )}
                  href={artist.external_urls.spotify}
                  key={artist.id}
                >
                  <span className="font-medium text-foreground-muted text-sm">
                    {index + 1}
                  </span>
                  {artist.images[0] ? (
                    <Image
                      alt={artist.name}
                      className="size-10 shrink-0 rounded-full object-cover"
                      height={40}
                      src={artist.images[0].url}
                      width={40}
                    />
                  ) : null}
                  <div className="min-w-0 flex-1">
                    <Marquee className="font-medium text-foreground text-sm">
                      {artist.name}
                    </Marquee>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        {topTracks.length > 0 ? (
          <div>
            <div className="mb-3 flex items-center gap-2 font-medium text-foreground text-sm">
              <MusicNotesIcon className="size-4" weight="bold" />
              <span>Top Tracks - Last 4 Weeks</span>
            </div>
            <div className="flex flex-col gap-2">
              {topTracks.map((track, index) => (
                <div
                  className={cn(
                    "flex items-center gap-3 rounded-lg p-2",
                    "hover:bg-background-muted"
                  )}
                  key={track.id}
                >
                  <span className="font-medium text-foreground-muted text-sm">
                    {index + 1}
                  </span>
                  {track.album.images[0] ? (
                    <Link
                      className="shrink-0"
                      href={track.external_urls.spotify}
                    >
                      <Image
                        alt={track.album.name}
                        className="rounded"
                        height={40}
                        src={track.album.images[0].url}
                        width={40}
                      />
                    </Link>
                  ) : null}
                  <div className="min-w-0 flex-1">
                    <Marquee>
                      <Link
                        className="font-medium text-foreground text-sm hover:underline"
                        href={track.external_urls.spotify}
                      >
                        {track.name}
                      </Link>
                    </Marquee>
                    <Marquee className="text-foreground-muted text-xs">
                      {track.artists.map((artist, artistIndex) => (
                        <span key={artist.id}>
                          <Link
                            className="hover:text-foreground hover:underline"
                            href={artist.external_urls.spotify}
                          >
                            {artist.name}
                          </Link>
                          {artistIndex < track.artists.length - 1 ? ", " : null}
                        </span>
                      ))}
                    </Marquee>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </Card>
  );
}
