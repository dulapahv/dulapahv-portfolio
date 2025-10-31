import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import Image from 'next/image';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GeistMono } from 'geist/font/mono';
import { ThemeProvider } from 'next-themes';

import { BASE_URL } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Navbar } from '@/components/navbar';
import { ThemeSwitcher } from '@/components/theme-switcher';

import './globals.css';

export const raleway = Raleway({
  subsets: ['latin'],
  weight: 'variable'
});

export const metadata: Metadata = {
  title: 'DulapahV Portfolio',
  description: 'Portfolio of DulapahV',
  metadataBase: new URL(BASE_URL)
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={cn('bg-background dark', raleway.className, GeistMono.variable)}
      suppressHydrationWarning
    >
      <head>
        <meta name="darkreader-lock" />
      </head>
      <body className="text-foreground min-h-dvh leading-[1.6] text-pretty antialiased">
        <Analytics />
        <SpeedInsights />
        <ThemeProvider
          attribute="class"
          disableTransitionOnChange
          scriptProps={{ 'data-cfasync': 'false' }}
        >
          <a
            href="#main-content"
            className={cn(
              'bg-mirai-red sr-only rounded-md px-4! py-2! font-medium text-white transition-all',
              'focus:ring-mirai-red focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50'
            )}
          >
            Skip to main content
          </a>
          <div
            aria-hidden
            role="presentation"
            className="pointer-events-none fixed -top-[70%] -right-[60%] -z-50 size-[180%] overflow-clip opacity-50
              mix-blend-darken hue-rotate-45 select-none sm:-top-[45%] sm:size-[150%] dark:mix-blend-lighten"
          >
            <Image src="/pinku.png" alt="" fill priority className="object-contain" />
          </div>
          <div
            aria-hidden
            role="presentation"
            className="pointer-events-none fixed -bottom-[50%] -left-[40%] -z-50 size-[140%] overflow-clip opacity-90
              mix-blend-darken select-none sm:-bottom-[30%] sm:size-[110%] dark:opacity-60 dark:mix-blend-lighten"
          >
            <Image src="/ao.png" alt="" fill priority className="object-contain" />
          </div>
          <Navbar />
          <ThemeSwitcher />
          <div id="main-content" className="mx-auto max-w-4xl space-y-4 px-4 py-16">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
