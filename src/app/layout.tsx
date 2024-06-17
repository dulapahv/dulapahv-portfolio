import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { Toaster } from "sonner";

import { Navbar } from "@/components";
import {
  ASSETS_URL,
  BASE_URL,
  DESCRIPTION,
  NAME,
  SHORT_NAME,
  SITE_NAME,
  THEME_COLOR,
} from "@/lib/constants";

import "./globals.css";

import { Providers } from "./providers";

const noDarkReader = dynamic(() => import("no-darkreader"), { ssr: false });

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: SITE_NAME,
  description: DESCRIPTION,
  generator: SHORT_NAME,
  applicationName: SITE_NAME,
  referrer: "origin-when-cross-origin",
  keywords: "DulapahV, Portfolio, Developer, Dulapah Vibulsanti",
  authors: [
    {
      name: NAME,
      url: BASE_URL,
    },
  ],
  creator: NAME,
  publisher: NAME,
  openGraph: {
    title: SITE_NAME,
    description: DESCRIPTION,
    url: BASE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: `${ASSETS_URL}/ogp.png`,
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
        url: "/images/favicon.ico",
        type: "image/x-icon",
        sizes: "any",
      },
      {
        url: "/images/favicon-16x16.png",
        type: "image/png",
        sizes: "16x16",
      },
      {
        url: "/images/favicon-32x32.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "/images/favicon-96x96.png",
        type: "image/png",
        sizes: "96x96",
      },
      {
        url: "/images/favicon-128x128.png",
        type: "image/png",
        sizes: "128x128",
      },
      {
        url: "/images/favicon-196x196.png",
        type: "image/png",
        sizes: "196x196",
      },
    ],
    apple: [
      { url: "/images/favicon-57x57.png", sizes: "57x57", type: "image/png" },
      { url: "/images/favicon-60x60.png", sizes: "60x60", type: "image/png" },
      { url: "/images/favicon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/images/favicon-76x76.png", sizes: "76x76", type: "image/png" },
      {
        url: "/images/favicon-114x114.png",
        sizes: "114x114",
        type: "image/png",
      },
      {
        url: "/images/favicon-120x120.png",
        sizes: "120x120",
        type: "image/png",
      },
      {
        url: "/images/favicon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        url: "/images/favicon-152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        url: "/images/favicon-180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  alternates: {
    types: {
      "application/rss+xml": `${BASE_URL}/feed.xml`,
    },
  },
  other: {
    darkreader: "NO-DARKREADER-PLUGIN",
    "msapplication-TileColor": THEME_COLOR,
    "msapplication-TileImage": "/images/mstile-144x144.png",
    "msapplication-square70x70logo": "/images/mstile-70x70.png",
    "msapplication-square150x150logo": "/images/mstile-150x150.png",
    "msapplication-wide310x150logo": "/images/mstile-310x150.png",
    "msapplication-square310x310logo": "/images/mstile-310x310.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff" },
    { media: "(prefers-color-scheme: dark)", color: "#000" },
  ],
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html
      lang="en"
      className={`${typeof window !== "undefined" ? (localStorage.getItem("theme") === "light" ? "light" : "dark") : ""} `}
      suppressHydrationWarning
    >
      <body
        className={`min-h-dvh bg-white text-default-800 dark:bg-black ${poppins.className}`}
      >
        <div
          aria-hidden
          role="presentation"
          className="pointer-events-none fixed -right-[35%] -top-[25%] size-full select-none overflow-clip opacity-50 mix-blend-darken hue-rotate-[45deg] dark:mix-blend-lighten sm:rotate-[20deg]"
        >
          <Image src="/pink.png" alt="" fill priority />
        </div>
        <div
          aria-hidden
          role="presentation"
          className="pointer-events-none fixed -bottom-[15%] -left-[25%] size-[80%] select-none overflow-clip opacity-90 mix-blend-darken dark:opacity-60 dark:mix-blend-lighten sm:rotate-[15deg]"
        >
          <Image src="/blue.png" alt="" fill priority />
        </div>
        <Providers className="mx-auto my-4 mb-32 mt-16 max-w-5xl text-pretty px-4 antialiased sm:px-16 lg:mt-32">
          <Toaster richColors className="whitespace-pre-line" />
          {children}
          <Navbar />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
