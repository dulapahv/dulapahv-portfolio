import { BASE_URL } from '@/lib/constants';

export async function dynamicBlurDataUrl(url: string) {
  const base64str = await fetch(
    `${BASE_URL}/_next/image?url=${url}&w=1920&q=75`,
  ).then(async (res) =>
    Buffer.from(await res.arrayBuffer()).toString('base64'),
  );

  const blurSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 5"><filter id="a" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="1"/></filter><image preserveAspectRatio="none" filter="url(#a)" height="100%" width="100%" href="data:image/avif;base64,${base64str}"/></svg>`;

  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str);

  return `data:image/svg+xml;base64,${toBase64(blurSvg)}`;
}
