import { describe, expect, it } from "vitest";

import { pickSpotifyImage } from "./spotify-image";

const album = [
  { url: "640.jpg", height: 640, width: 640 },
  { url: "300.jpg", height: 300, width: 300 },
  { url: "64.jpg", height: 64, width: 64 },
];

describe("pickSpotifyImage", () => {
  it("should pick the smallest image that covers the requested width", () => {
    expect(pickSpotifyImage(album, 80)?.url).toBe("300.jpg");
    expect(pickSpotifyImage(album, 64)?.url).toBe("64.jpg");
    expect(pickSpotifyImage(album, 301)?.url).toBe("640.jpg");
  });

  it("should fall back to the largest image when none is wide enough", () => {
    expect(pickSpotifyImage(album, 1000)?.url).toBe("640.jpg");
  });

  it("should fall back to the first image when widths are unknown", () => {
    const images = [
      { url: "a.jpg", height: null, width: null },
      { url: "b.jpg", height: null, width: null },
    ];
    expect(pickSpotifyImage(images, 80)?.url).toBe("a.jpg");
  });

  it("should return undefined for an empty list", () => {
    expect(pickSpotifyImage([], 80)).toBeUndefined();
  });
});
