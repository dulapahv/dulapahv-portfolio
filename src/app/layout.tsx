import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import Image from 'next/image';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';

import { BASE_URL, DESCRIPTION, NAME, SITE_NAME } from '@/lib/constants';
import { cn } from '@/utils/cn';

import '@/styles/globals.css';
import '@/styles/highlight.css';

import { Providers } from './providers';

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  referrer: 'origin-when-cross-origin',
  keywords: "DulapahV, Portfolio, Developer, Dulapah Vibulsanti",
  creator: NAME,
  publisher: NAME,
  authors: {
    name: NAME,
    url: BASE_URL,
  },
  metadataBase: new URL(BASE_URL),
  formatDetection: {
    telephone: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_US',
    url: BASE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@dulapahv',
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fff' },
    { media: '(prefers-color-scheme: dark)', color: '#000' },
  ],
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
  maximumScale: 5,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="min-h-dvh text-default-800 dark"
      suppressHydrationWarning
    >
      <head>
        <meta name="darkreader-lock" />
      </head>
      <body
        className={cn(
          'mx-auto my-4 mt-16 max-w-5xl text-pretty px-4 antialiased sm:px-16 lg:mt-32',
          poppins.className,
        )}
      >
        <Analytics />
        <SpeedInsights />
        <ThemeProvider attribute="class">
          <div
            aria-hidden
            role="presentation"
            className="pointer-events-none fixed -right-[35%] -top-[25%] -z-50 size-full select-none
              overflow-clip opacity-50 mix-blend-darken hue-rotate-[45deg]
              dark:mix-blend-lighten sm:rotate-[20deg]"
          >
            <Image src="/pinku.png" alt="" fill priority />
          </div>
          <div
            aria-hidden
            role="presentation"
            className="pointer-events-none fixed -bottom-[15%] -left-[25%] -z-50 size-[80%] select-none
              overflow-clip opacity-90 mix-blend-darken dark:opacity-60 dark:mix-blend-lighten
              sm:rotate-[15deg]"
          >
            <Image src="/ao.png" alt="" fill priority />
          </div>
          <Providers className="mb-32">
            <Toaster
              richColors
              className="whitespace-pre-line"
              pauseWhenPageIsHidden
              containerAriaLabel="Toast Notifications"
            />
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
