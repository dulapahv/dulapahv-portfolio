import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang='en'>
      {/* Google Analytics */}
      <Script src='https://www.googletagmanager.com/gtag/js?id=G-Q1V5DFC2B7' />
      <Script id='google-analytics'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-Q1V5DFC2B7');
        `}
      </Script>

      {/* Standard Meta Tags */}
      <meta charSet='UTF-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta name='description' content="DulapahV's Portfolio" />
      <meta
        name='keywords'
        content='DulapahV, dulapahv, Dulapah, Vibulsanti, Dulapah Vibulsanti'
      />
      <meta name='author' content='Dulapah Vibulsanti' />
      <meta name='publisher' content='Dulapah Vibulsanti' />
      <meta name='copyright' content='Dulapah Vibulsanti' />
      <meta name='page-topic' content='Portfolio' />
      <meta name='page-type' content='Portfolio' />
      <meta name='audience' content='Everyone' />
      <meta name='robots' content='index, follow' />

      {/* Content Language */}
      <meta httpEquiv='content-language' content='en' />

      {/* Theme and Styling */}
      <meta name='theme-color' content='#34dcdd' />
      <meta name='msapplication-navbutton-color' content='#34dcdd' />
      <meta name='apple-mobile-web-app-status-bar-style' content='#34dcdd' />
      <meta name='msapplication-TileColor' content='#34dcdd' />
      <meta name='background-color' content='#2b2b2b' />
      <meta name='color-scheme' content='dark light' />

      {/* More Descriptive Description */}
      <meta
        name='description'
        content="DulapahV's Portfolio, a website that contains my personal information, education, experiences, skills, and projects"
      />

      {/* Icons and Manifest */}
      <link rel='icon' href='/favicon.ico' />
      <link rel='apple-touch-icon' href='%PUBLIC_URL%/logo192.png' />
      <link rel='manifest' href='/manifest.json' />

      {/* Title */}
      <title>DulapahV&apos;s Portfolio</title>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
