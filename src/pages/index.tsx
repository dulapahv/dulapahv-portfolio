import React, { useEffect, useRef } from 'react';

import { useTranslation } from 'next-i18next';

import Link from 'next/link';
import Image from 'next/image';
import { Kanit, Noto_Sans_JP } from 'next/font/google';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { BsArrowDownCircleFill } from 'react-icons/bs';
import { findDOMNode } from 'react-dom';

const kanit = Kanit({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'thai'],
});

const noto_sans_jp = Noto_Sans_JP({
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['normal'],
  subsets: ['latin', 'latin'],
});

const KanitFont = kanit.className;
const NotoSansJPFont = noto_sans_jp.className;

const Index = () => {
  const { t } = useTranslation();
  const [section, setSection] = React.useState(0);

  const secondSectionRef = useRef<HTMLDivElement>(null);
  const scrollTextRef = useRef<HTMLDivElement>(null);

  const handleChangeSection1 = () => {
    scrollTextRef.current!.classList.add('animate-fade-out');
    setTimeout(() => {
      setSection(1);
    }, 1000);
  };

  const FirstSection = () => {
    return (
      <div
        className='flex flex-col justify-center animate-fade-in animation-delay-500 bg-repeat dark:bg-black/60 h-screen overflow-hidden dark:bg-blend-multiply'
        style={{
          backgroundImage: `url(/images/bg_pattern.png)`,
        }}
        ref={scrollTextRef}
      >
        <div className='flex flex-col justify-evenly mt-12 dark:text-white text-base sm:text-lg md:text-xl lg:text-2xl font-semibold !opacity-90 animate-puff-in-center animation-delay-1000'>
          <p className='animate-slide-text-right-5 animation-delay-500 select-none'>
            NextJS
          </p>
          <p className='animate-slide-text-left-2 animation-delay-1000 text-BLUE font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl select-none'>
            Hi! I&apos;m dulapahv~💕
          </p>
          <p className='animate-slide-text-left-4 select-none'>TypeScript</p>
          <p className='animate-slide-text-right-4 animation-delay-400 select-none'>
            <span className={KanitFont}>สวัสดี</span>! dulapahv{' '}
            <span className={KanitFont}>เองน้า</span>~💕
          </p>
          <p className='animate-slide-text-left-2 animation-delay-700 select-none'>
            Python
          </p>
          <p className='animate-slide-text-right-5 select-none'>PostgreSQL</p>
          <p className='animate-slide-text-left-1 select-none'>HTML</p>
          <p className='animate-slide-text-right-1 text-RED font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl select-none'>
            A frontend developer🖼️
          </p>
          <p className='animate-slide-text-right-2 select-none'>CSS</p>
          <p className='animate-slide-text-right-3 animation-delay-1000 select-none'>
            <span className={NotoSansJPFont}>こんにちは</span>! dulapahv{' '}
            <span className={NotoSansJPFont}>です</span>~💕
          </p>
          <p className='animate-slide-text-left-3 animation-delay-900 select-none'>
            JavaScript
          </p>
          <p className='animate-slide-text-right-2 select-none'>C</p>
          <p className='animate-slide-text-left-5 animation-delay-300 select-none'>
            C++
          </p>
          <p className='animate-slide-text-right-3 animation-delay-200 select-none'>
            <span className={KanitFont}>เราคือ</span> Frontend Developer{' '}
            <span className={KanitFont}>นะ</span>~🖼️
          </p>
          <p className='animate-slide-text-right-5 animation-delay-600 select-none'>
            Java
          </p>
          <p className='animate-slide-text-right-1 animation-delay-1000 select-none'>
            ReactJS
          </p>
          <p className='animate-slide-text-left-1 animation-delay-200 text-YELLOW font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl select-none'>
            Pursuing fullstack developer💯
          </p>
          <p className='animate-slide-text-right-4 animation-delay-200 select-none'>
            <span className={NotoSansJPFont}>
              わたしはフロントエンドデベロッパーです
            </span>
            ~🖼️
          </p>
          <p className='animate-slide-text-left-2 animation-delay-400 select-none'>
            NGINX
          </p>
          <p className='animate-slide-text-right-5 animation-delay-1000 select-none'>
            <span className={KanitFont}>เรากำลังเรียนรู้เพื่อเป็น</span>{' '}
            Fullstack Developer💯
          </p>
          <p className='animate-slide-text-right-2 animation-delay-600 select-none'>
            Linux
          </p>
          <p className='animate-slide-text-right-1 animation-delay-800 select-none'>
            <span className={NotoSansJPFont}>
              わたしはフルスタックデベロッパーになりたいです
            </span>
            ~💯
          </p>
          <p className='animate-slide-text-left-3 select-none'>Figma</p>
          <p className='animate-slide-text-right-2 animation-delay-100 text-PURPLE font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl select-none'>
            Thanks for visiting my website!😊
          </p>
          <p className='animate-slide-text-left-5 select-none'>TailwindCSS</p>
          <p className='animate-slide-text-right-3 animation-delay-1000 select-none'>
            <span className={KanitFont}>
              ขอบคุณที่เข้ามาเยี่ยมชมเว็บไซต์ของเรานะ
            </span>
            ~😊
          </p>
          <p className='animate-slide-text-left-4 animation-delay-200 select-none'>
            UX/UI
          </p>
          <p className='animate-slide-text-right-4 animation-delay-400 select-none'>
            <span className={NotoSansJPFont}>
              私のウェブサイトをご覧いただきありがとうございます
            </span>
            ~😊
          </p>
        </div>
        <div className='relative bottom-36 min-[425px]:bottom-20 text-RED text-2xl text-center flex flex-col items-center gap-1 drop-shadow-lg'>
          <button
            className='btn z-[1] bg-RED hover:bg-RED hover:ring-2 hover:ring-offset-2 ring-RED hover:ring-offset-white dark:ring-offset-black text-WHITE active:!scale-90'
            onClick={handleChangeSection1}
          >
            {t("Let's get started")}
          </button>
          <button className='absolute btn animate-ping w-24 pointer-events-none z-0'></button>
        </div>
      </div>
    );
  };

  const SecondSection = () => {
    return (
      <div className='h-screen flex flex-col' ref={secondSectionRef}>
        <div
          className='absolute w-1/3 animate-fade-in animation-delay-500 bg-repeat dark:bg-black/60 h-screen overflow-hidden dark:bg-blend-multiply'
          style={{
            backgroundImage: `url(/images/bg_pattern.png)`,
          }}
        >
          <div className='dark:text-white'>hi</div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {section === 0 && <FirstSection />}
      {section === 1 && <SecondSection />}
    </div>
  );
};

export async function getStaticProps(context: any) {
  // extract the locale identifier from the URL
  const { locale } = context;

  return {
    props: {
      // pass the translation props to the page component
      ...(await serverSideTranslations(locale)),
    },
  };
}

export default Index;
