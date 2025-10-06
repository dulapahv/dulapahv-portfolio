import type { ImageLoaderProps } from 'next/image';

const normalizeSrc = (src: string) =>
  src.startsWith('/') ? src.slice(1) : src;

export default function cloudflareLoader({
  src,
  width,
  quality,
}: ImageLoaderProps) {
  const params = [`width=${width}`];
  if (quality) params.push(`quality=${quality}`);
  const paramsString = params.join(',');

  if (process.env.NODE_ENV === 'development') {
    return `${src}?w=${width}${quality ? `&q=${quality}` : ''}`;
  }

  return `/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}`;
}
