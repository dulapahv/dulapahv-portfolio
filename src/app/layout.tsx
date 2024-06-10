import type { Metadata, Viewport } from "next";
import { ReactNode } from "react";
import dynamic from "next/dynamic";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { ThemeProvider } from "next-themes";

import { Navbar } from "@/components";

import "./globals.css";

import { Providers } from "./providers";

const noDarkReader = dynamic(() => import("no-darkreader"), { ssr: false });

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DulapahV's Portfolio",
  description:
    "This website is a personal project to showcase my skills and experience, as well as to share my knowledge and experience with others.",
  generator: "DulapahV",
  applicationName: "DulapahV's Portfolio",
  referrer: "origin-when-cross-origin",
  keywords: "DulapahV, Portfolio, Developer, Dulapah Vibulsanti",
  authors: [
    {
      name: "Dulapah Vibulsanti",
      url: "https://dulapahv.dev/",
    },
  ],
  creator: "Dulapah Vibulsanti",
  publisher: "Dulapah Vibulsanti",
  formatDetection: {
    email: true,
    telephone: true,
    address: true,
  },
  openGraph: {
    title: "DulapahV's Portfolio",
    description:
      "This website is a personal project to showcase my skills and experience, as well as to share my knowledge and experience with others.",
    url: "https://dulapahv.dev/",
    siteName: "DulapahV's Portfolio",
    images: [
      {
        url: "https://assets.dulapahv.dev/ogp.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        type: "image/x-icon",
      },
      {
        url: "/favicon-16x16.png",
        type: "image/png",
        sizes: "16x16",
      },
      {
        url: "/favicon-32x32.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "/favicon-96x96.png",
        type: "image/png",
        sizes: "96x96",
      },
      {
        url: "/favicon-128x128.png",
        type: "image/png",
        sizes: "128x128",
      },
      {
        url: "/favicon-196x196.png",
        type: "image/png",
        sizes: "196x196",
      },
    ],
    apple: [
      { url: "/favicon-57x57.png", sizes: "57x57", type: "image/png" },
      { url: "/favicon-60x60.png", sizes: "60x60", type: "image/png" },
      { url: "/favicon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/favicon-76x76.png", sizes: "76x76", type: "image/png" },
      {
        url: "/favicon-114x114.png",
        sizes: "114x114",
        type: "image/png",
      },
      {
        url: "/favicon-120x120.png",
        sizes: "120x120",
        type: "image/png",
      },
      {
        url: "/favicon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        url: "/favicon-152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        url: "/favicon-180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  alternates: {
    types: {
      "application/rss+xml": "https://dulapahv.dev/feed.xml",
    },
  },
  other: {
    darkreader: "NO-DARKREADER-PLUGIN",
    "msapplication-TileColor": "#fb568a",
    "msapplication-TileImage": "/mstile-144x144.png",
    "msapplication-square70x70logo": "/mstile-70x70.png",
    "msapplication-square150x150logo": "/mstile-150x150.png",
    "msapplication-wide310x150logo": "/mstile-310x150.png",
    "msapplication-square310x310logo": "/mstile-310x310.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#fb568a",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className="min-h-dvh text-default-800"
    >
      <body
        className={`mx-auto my-4 mt-16 max-w-5xl px-4 antialiased sm:px-16 lg:mt-32 ${poppins.className}`}
      >
        <div className="fixed -right-[35%] -top-[25%] -z-50 size-full select-none overflow-clip opacity-50 mix-blend-darken hue-rotate-[45deg] dark:mix-blend-lighten sm:rotate-[20deg]">
          <Image src="/grad-right.png" alt="grad-right" fill priority />
        </div>
        <div className="fixed -bottom-[15%] -left-[25%] -z-50 size-[80%] select-none overflow-clip opacity-90 mix-blend-darken dark:opacity-60 dark:mix-blend-lighten sm:rotate-[15deg]">
          <Image src="/grad-left.png" alt="grad-left" fill priority />
        </div>
        <Providers>
          <ThemeProvider>
            <div className="mb-16 sm:mb-32">{children}</div>
            <Navbar />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
