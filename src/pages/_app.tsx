import React from 'react';

import { ThemeProvider } from 'next-themes';

import { Nav } from '@/components';
import { AppProps } from 'next/app';
import { Open_Sans } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';

import '@/styles/globals.css';

const open_sans = Open_Sans({ subsets: ['latin'] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className={`${open_sans.className}`}>
        <ThemeProvider defaultTheme="dark">
          <div className="flex min-h-screen flex-col bg-WHITE dark:bg-BLACK ">
            <div className="flex-grow">
              <Component {...pageProps} />
              <SpeedInsights />
            </div>
            <div className="fixed bottom-0 right-0">
              <Nav />
            </div>
          </div>
        </ThemeProvider>
      </div>
    </>
  );
}

export default MyApp;
