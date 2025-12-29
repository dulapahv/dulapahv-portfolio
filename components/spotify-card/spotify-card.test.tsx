import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SpotifyCard } from "./spotify-card";

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
    [key: string]: string | boolean | number;
  }) => <img alt={alt} src={src} {...props} />,
}));

vi.mock("@/components/now-playing-card", () => ({
  NowPlayingCard: () => <div>Now Playing Card</div>,
}));

vi.mock("@/app/actions/Spotify", () => ({
  getCurrentlyPlaying: vi.fn().mockResolvedValue(null),
  getTopArtists: vi.fn().mockResolvedValue([
    {
      id: "artist-1",
      name: "Test Artist 1",
      external_urls: { spotify: "https://open.spotify.com/artist/1" },
      images: [{ url: "https://example.com/artist1.jpg" }],
    },
    {
      id: "artist-2",
      name: "Test Artist 2",
      external_urls: { spotify: "https://open.spotify.com/artist/2" },
      images: [{ url: "https://example.com/artist2.jpg" }],
    },
  ]),
  getTopTracks: vi.fn().mockResolvedValue([
    {
      id: "track-1",
      name: "Test Track 1",
      artists: [
        {
          id: "artist-a",
          name: "Artist A",
          external_urls: { spotify: "https://open.spotify.com/artist/a" },
        },
      ],
      external_urls: { spotify: "https://open.spotify.com/track/1" },
      album: {
        name: "Album 1",
        images: [{ url: "https://example.com/track1.jpg" }],
      },
    },
    {
      id: "track-2",
      name: "Test Track 2",
      artists: [
        {
          id: "artist-b",
          name: "Artist B",
          external_urls: { spotify: "https://open.spotify.com/artist/b" },
        },
      ],
      external_urls: { spotify: "https://open.spotify.com/track/2" },
      album: {
        name: "Album 2",
        images: [{ url: "https://example.com/track2.jpg" }],
      },
    },
  ]),
}));

describe("SpotifyCard", () => {
  it("should render spotify card with title", async () => {
    const component = await SpotifyCard();
    render(component);

    expect(screen.getByText("Spotify")).toBeInTheDocument();
  });

  it("should display top artists section", async () => {
    const component = await SpotifyCard();
    render(component);

    expect(screen.getByText("Top Artists - Last 4 Weeks")).toBeInTheDocument();
    expect(screen.getByText("Test Artist 1")).toBeInTheDocument();
    expect(screen.getByText("Test Artist 2")).toBeInTheDocument();
  });

  it("should display top tracks section", async () => {
    const component = await SpotifyCard();
    render(component);

    expect(screen.getByText("Top Tracks - Last 4 Weeks")).toBeInTheDocument();
    expect(screen.getByText("Test Track 1")).toBeInTheDocument();
    expect(screen.getByText("Test Track 2")).toBeInTheDocument();
  });

  it("should have link to Spotify profile", async () => {
    const component = await SpotifyCard();
    render(component);

    const link = screen.getByTitle("View my Spotify profile");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("should match snapshot", async () => {
    const component = await SpotifyCard();
    const { container } = render(component);
    expect(container).toMatchSnapshot();
  });
});
