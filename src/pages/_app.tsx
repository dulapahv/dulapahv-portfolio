import React from 'react';

import { ThemeProvider } from 'next-themes';
import { useTranslation } from 'next-i18next';
import { appWithTranslation } from 'next-i18next';

import { Nav } from '@/components';
import { AppProps } from 'next/app';
import { Kanit, Open_Sans } from 'next/font/google';

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
        <ThemeProvider defaultTheme='dark'>
          <div className='min-h-screen flex flex-col bg-WHITE dark:bg-BLACK'>
            <div className='flex-grow'>
              <Component {...pageProps} />
            </div>
            <div className='fixed bottom-0 right-0'>
              <Nav />
            </div>
          </div>
        </ThemeProvider>
      </div>
    </>
  );
}

export default appWithTranslation(MyApp);
