import { unstable_ViewTransition as ViewTransition } from 'react';
import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import Image from 'next/image';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GeistMono } from 'geist/font/mono';
import { ThemeProvider } from 'next-themes';

import { BASE_URL } from '@/lib/constants';
import { Navbar } from '@/components/navbar';
import { ThemeSwitcher } from '@/components/theme-switcher';

import './globals.css';

export const raleway = Raleway({
  subsets: ['latin'],
  weight: 'variable',
});

export const metadata: Metadata = {
  title: 'DulapahV Portfolio',
  description: 'Portfolio of DulapahV',
  metadataBase: new URL(BASE_URL),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${raleway.className} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="darkreader-lock" />
      </head>
      <body className="bg-background text-foreground leading-[1.6] text-pretty antialiased">
        <Analytics />
        <SpeedInsights />
        <ThemeProvider attribute="class" disableTransitionOnChange>
          <div
            aria-hidden
            role="presentation"
            className="pointer-events-none fixed -top-[25%] -right-[35%] -z-50 size-full overflow-clip
              opacity-50 mix-blend-darken hue-rotate-[45deg] select-none sm:rotate-[20deg]
              dark:mix-blend-lighten"
          >
            <Image src="/pinku.png" alt="" fill priority />
          </div>
          <div
            aria-hidden
            role="presentation"
            className="pointer-events-none fixed -bottom-[15%] -left-[25%] -z-50 size-[80%]
              overflow-clip opacity-90 mix-blend-darken select-none sm:rotate-[15deg]
              dark:opacity-60 dark:mix-blend-lighten"
          >
            <Image src="/ao.png" alt="" fill priority />
          </div>
          <ThemeSwitcher />
          <Navbar />
          <div className="mx-auto max-w-4xl space-y-4 px-4 py-16">
            <ViewTransition>{children}</ViewTransition>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
