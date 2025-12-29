import { GeistMono } from "geist/font/mono";
import type { Metadata } from "next";
import { IBM_Plex_Sans, Raleway } from "next/font/google";
import Image from "next/image";
import { ThemeProvider } from "next-themes";
import MousePositionVarsSetter from "@/components/mouse-position-setter";
import { Navbar } from "@/components/navbar/navbar";
// import { StarsBackground } from '@/components/stars-background';
import { TopBar } from "@/components/top-bar/top-bar";
import { BASE_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

import "./globals.css";

export const raleway = Raleway({
  subsets: ["latin"],
  weight: "variable",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: "variable",
});

export const metadata: Metadata = {
  title: "DulapahV Portfolio",
  description: "Portfolio of DulapahV",
  metadataBase: new URL(BASE_URL),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      className={cn(
        "dark bg-background",
        ibmPlexSans.className,
        GeistMono.variable
      )}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <meta name="darkreader-lock" />
      </head>
      <body className="min-h-dvh text-pretty text-foreground leading-[1.6] antialiased">
        <ThemeProvider
          attribute="class"
          disableTransitionOnChange
          scriptProps={{ "data-cfasync": "false" }}
        >
          {/* <StarsBackground /> */}
          <MousePositionVarsSetter />
          <a
            className={cn(
              "sr-only rounded-md bg-mirai-red px-4! py-2! text-white transition-all",
              "focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:ring-mirai-red"
            )}
            href="#main-content"
          >
            Skip to main content
          </a>
          <div
            aria-hidden
            className="pointer-events-none fixed -top-[70%] -right-[60%] -z-50 size-[180%] select-none overflow-clip opacity-50 mix-blend-darken hue-rotate-45 sm:-top-[45%] sm:size-[150%] dark:mix-blend-lighten"
            role="presentation"
          >
            <Image
              alt=""
              className="object-contain"
              fill
              priority
              src="/pinku.png"
            />
          </div>
          <div
            aria-hidden
            className="pointer-events-none fixed -bottom-[50%] -left-[40%] -z-50 size-[140%] select-none overflow-clip opacity-90 mix-blend-darken sm:-bottom-[30%] sm:size-[110%] dark:opacity-60 dark:mix-blend-lighten"
            role="presentation"
          >
            <Image
              alt=""
              className="object-contain"
              fill
              priority
              src="/ao.png"
            />
          </div>
          <TopBar />
          <Navbar />
          <div
            className="mx-auto max-w-7xl space-y-4 px-4 py-16 pt-24"
            id="main-content"
          >
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
