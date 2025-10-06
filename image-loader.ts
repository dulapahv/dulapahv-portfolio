import type { ImageLoaderProps } from 'next/image';

import { IS_DEV_ENV } from '@/lib/constants';

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

  if (IS_DEV_ENV) {
    return `${src}?w=${width}${quality ? `&q=${quality}` : ''}`;
  }

  return `/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}`;
}
