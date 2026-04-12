import type { Metadata } from "next";
import { Archivo, Geist_Mono, IBM_Plex_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { BackgroundDecor } from "@/components/background-decor";
import MousePositionVarsSetter from "@/components/mouse-position-setter";
import { Navbar } from "@/components/navbar/navbar";
// import { StarsBackground } from '@/components/stars-background';
import { TopBar } from "@/components/top-bar/top-bar";
import { BASE_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-archivo",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-geist-mono",
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
        archivo.variable,
        geistMono.variable
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
              "sr-only rounded-md bg-mirai-red px-4! py-2! text-white",
              "focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:ring-mirai-red"
            )}
            href="#main-content"
          >
            Skip to main content
          </a>
          <BackgroundDecor />

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
