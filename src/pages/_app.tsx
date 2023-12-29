import { useEffect } from 'react';

import { ThemeProvider } from 'next-themes';

import Head from 'next/head';
import { AppProps } from 'next/app';
import { Open_Sans } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';

import '@/styles/globals.css';

const open_sans = Open_Sans({ subsets: ['latin'] });

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import('no-darkreader');
  }, []);

  return (
    <>
      <Head>
        {/* Standard Meta Tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="DulapahV's Portfolio" />
        <meta
          name="keywords"
          content="DulapahV, dulapahv, Dulapah, Vibulsanti, Dulapah Vibulsanti"
        />
        <meta name="author" content="Dulapah Vibulsanti" />
        <meta name="publisher" content="Dulapah Vibulsanti" />
        <meta name="copyright" content="Dulapah Vibulsanti" />
        <meta name="page-topic" content="Portfolio" />
        <meta name="page-type" content="Portfolio" />
        <meta name="audience" content="Everyone" />
        <meta name="robots" content="index, follow" />

        {/* Content Language */}
        <meta httpEquiv="content-language" content="en" />

        {/* Theme and Styling */}
        <meta name="theme-color" content="#34dcdd" />
        <meta name="msapplication-navbutton-color" content="#34dcdd" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#34dcdd" />
        <meta name="msapplication-TileColor" content="#34dcdd" />
        <meta name="background-color" content="#2b2b2b" />
        <meta name="color-scheme" content="dark light" />

        {/* Disable Dark Reader Plugin */}
        <meta name="darkreader" content="NO-DARKREADER-PLUGIN" />

        {/* More Descriptive Description */}
        <meta
          name="description"
          content="This website is a personal project to showcase my skills and experience, as well as to share my knowledge and experience with others."
        />

        {/* Icons and Manifest */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Title */}
        <title>DulapahV&apos;s Portfolio</title>
      </Head>
      <div className={`${open_sans.className}`}>
        <ThemeProvider defaultTheme="dark">
          <div className="flex min-h-screen flex-col bg-WHITE dark:bg-BLACK ">
            <div className="flex-grow">
              <Component {...pageProps} />
              <SpeedInsights />
            </div>
          </div>
        </ThemeProvider>
      </div>
    </>
  );
}

export default MyApp;
