import Image from "next/image";
import type { SpotifyTrack } from "@/app/actions/spotify";
import { Link } from "@/components/link";
import { pickSpotifyImage } from "@/lib/spotify-image";
import { cn } from "@/lib/utils";
import { Marquee } from "../marquee";

// Album art renders at 64px, so ask Spotify for at least 2x that.
const ALBUM_ART_MIN_WIDTH = 128;

interface NowPlayingCardProps {
  track: SpotifyTrack;
}

export function NowPlayingCard({ track }: NowPlayingCardProps) {
  const albumArt = pickSpotifyImage(track.album.images, ALBUM_ART_MIN_WIDTH);

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
        {albumArt ? (
          <Link className="shrink-0" href={track.external_urls.spotify}>
            <Image
              alt={track.album.name}
              className="rounded shadow-lg"
              height={64}
              src={albumArt.url}
              width={64}
            />
          </Link>
        ) : null}

        <div className="min-w-0 flex-1">
          <Marquee>
            <Link
              className="font-semibold text-base text-foreground hover:underline"
              href={track.external_urls.spotify}
            >
              {track.name}
            </Link>
          </Marquee>

          <Marquee className="text-foreground-muted text-sm">
            {track.artists.map((artist, index) => (
              <span key={artist.id}>
                <Link
                  className="hover:text-foreground hover:underline"
                  href={artist.external_urls.spotify}
                >
                  {artist.name}
                </Link>
                {index < track.artists.length - 1 ? ", " : null}
              </span>
            ))}
          </Marquee>

          <Marquee>
            <Link
              className="text-foreground-subtle text-xs hover:text-foreground-muted hover:underline"
              href={track.album.external_urls.spotify}
            >
              {track.album.name}
            </Link>
          </Marquee>
        </div>
      </div>
    </div>
  );
}
