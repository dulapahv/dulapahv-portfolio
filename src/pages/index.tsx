import Head from 'next/head';
import {
  AboutMe,
  Education,
  Experience,
  Footer,
  Header,
  Nav,
  Project,
  Skill,
} from '@/components';

const Index = () => {
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
          content="DulapahV's Portfolio, a website that contains my personal information, education, experiences, skills, and projects"
        />

        {/* Icons and Manifest */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Title */}
        <title>DulapahV&apos;s Portfolio</title>
      </Head>
      <div
        className="fixed z-0 min-h-screen w-[15rem] overflow-hidden bg-repeat [background-size:105%] sm:w-[20rem] sm:[background-size:79%] md:w-[30rem] md:[background-size:53%] lg:w-[40rem] lg:[background-size:40%] dark:bg-black/40 dark:brightness-[.33]"
        style={{
          backgroundImage: `url(/images/bg_pattern.png)`,
        }}
      ></div>
      <Header />
      <AboutMe />
      <Education />
      <Experience />
      <Skill />
      <Project />
      <Footer />
      <div className="fixed bottom-0 right-0 z-[2147483647]">
        <Nav />
      </div>
    </>
  );
};

export default Index;
