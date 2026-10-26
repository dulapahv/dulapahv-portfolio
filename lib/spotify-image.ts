interface SpotifyImage {
  url: string;
  width: number | null;
}

// Spotify lists each image in a few sizes, largest first (640/300/64 for
// albums, 640/320/160 for artists). The image loader passes remote URLs through
// untouched, so picking the variant here is the only way to avoid shipping the
// 640px original into a 40px slot. Returns the smallest one at least `minWidth`
// wide, falling back to the largest.
export const pickSpotifyImage = <T extends SpotifyImage>(
  images: T[],
  minWidth: number
): T | undefined =>
  images.findLast((image) => (image.width ?? 0) >= minWidth) ?? images[0];
