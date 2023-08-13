import React from 'react';

import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'next-themes';
import { useTranslation } from 'next-i18next';
import { appWithTranslation } from 'next-i18next';

import { AppProps } from 'next/app';
import { Footer, Nav } from '@/components';
import { Kanit, Open_Sans } from 'next/font/google';
import ToastTheme from '@/components/ToastTheme.json';

import '@/styles/globals.css';

const open_sans = Open_Sans({ subsets: ['latin'] });

const kanit = Kanit({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'thai'],
});

function MyApp({ Component, pageProps }: AppProps) {
  const { i18n } = useTranslation();
  return (
    <>
      <div
        className={`${
          i18n.language === 'en' ? open_sans.className : kanit.className
        }`}
      >
        <div>
          <Toaster />
        </div>
        <ThemeProvider defaultTheme='dark'>
          <div className='flex flex-col h-screen bg-WHITE dark:bg-neutral-800'>
            <Nav />
            <div className='flex-grow'>
              <Component {...pageProps} />
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </div>
    </>
  );
}

export default appWithTranslation(MyApp);
