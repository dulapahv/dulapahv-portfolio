import React from 'react';

import { Kanit, Noto_Sans_JP } from 'next/font/google';

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

const Experience = () => {
  const ScrollingTextBg = () => {
    return (
      <div className='flex flex-col justify-center animate-fade-in h-screen overflow-hidden'>
        <div className='flex flex-col justify-evenly mt-12 dark:text-white text-base sm:text-lg md:text-xl lg:text-2xl font-semibold !opacity-90 animate-puff-out-center animation-delay-1000'>
          <p className='text-center animate-slide-text-right-5'>
            NextJS
          </p>
          <p className='text-center animate-slide-text-left-2 animation-delay-1000 text-BLUE font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl'>
            Hi! I&apos;m dulapahv~💕
          </p>
          <p className='text-center animate-slide-text-left-4'>
            TypeScript
          </p>
          <p className='text-center animate-slide-text-right-4 animation-delay-400'>
            <span className={KanitFont}>สวัสดี</span>! dulapahv{' '}
            <span className={KanitFont}>เองน้า</span>~💕
          </p>
          <p className='text-center animate-slide-text-left-2 animation-delay-700'>
            Python
          </p>
          <p className='text-center animate-slide-text-right-5'>
            PostgreSQL
          </p>
          <p className='text-center animate-slide-text-left-1'>
            HTML
          </p>
          <p className='text-center animate-slide-text-right-1 text-RED font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl'>
            A frontend developer🖼️
          </p>
          <p className='text-center animate-slide-text-right-2'>
            CSS
          </p>
          <p className='text-center animate-slide-text-right-3 animation-delay-1000'>
            <span className={NotoSansJPFont}>こんにちは</span>! dulapahv{' '}
            <span className={NotoSansJPFont}>です</span>~💕
          </p>
          <p className='text-center animate-slide-text-left-3 animation-delay-900'>
            JavaScript
          </p>
          <p className='text-center animate-slide-text-right-2'>
            C
          </p>
          <p className='text-center animate-slide-text-left-5 animation-delay-300'>
            C++
          </p>
          <p className='text-center animate-slide-text-right-3 animation-delay-200'>
            <span className={KanitFont}>เราคือ</span> Frontend Developer{' '}
            <span className={KanitFont}>นะ</span>~🖼️
          </p>
          <p className='text-center animate-slide-text-right-5 animation-delay-600'>
            Java
          </p>
          <p className='text-center animate-slide-text-right-1 animation-delay-1000'>
            ReactJS
          </p>
          <p className='text-center animate-slide-text-left-1 animation-delay-200 text-YELLOW font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl'>
            Pursuing fullstack developer💯
          </p>
          <p className='text-center animate-slide-text-right-4 animation-delay-200'>
            <span className={NotoSansJPFont}>
              わたしはフロントエンドデベロッパーです
            </span>
            ~🖼️
          </p>
          <p className='text-center animate-slide-text-left-2 animation-delay-400'>
            NGINX
          </p>
          <p className='text-right animate-slide-text-right-5 animation-delay-1000'>
            <span className={KanitFont}>เรากำลังเรียนรู้เพื่อเป็น</span>{' '}
            Fullstack Developer💯
          </p>
          <p className='text-center animate-slide-text-right-2 animation-delay-600'>
            Linux
          </p>
          <p className='text-right animate-slide-text-right-1 animation-delay-800'>
            <span className={NotoSansJPFont}>
              わたしはフルスタックデベロッパーになりたいです
            </span>
            ~💯
          </p>
          <p className='text-center animate-slide-text-left-3'>
            Figma
          </p>
          <p className='text-center animate-slide-text-right-2 animation-delay-100 text-PURPLE font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl'>
            Thanks for visiting my website!😊
          </p>
          <p className='text-center animate-slide-text-left-5'>
            TailwindCSS
          </p>
          <p className='text-center animate-slide-text-right-3 animation-delay-1000'>
            <span className={KanitFont}>
              ขอบคุณที่เข้ามาเยี่ยมชมเว็บไซต์ของเรานะ
            </span>
            ~😊
          </p>
          <p className='text-center animate-slide-text-left-4 animation-delay-200'>
            UX/UI
          </p>
          <p className='text-center animate-slide-text-right-4 animation-delay-400'>
            <span className={NotoSansJPFont}>
              私のウェブサイトをご覧いただきありがとうございます
            </span>
            ~😊
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        className='fixed w-[15rem] sm:w-[20rem] md:w-[30rem] lg:w-[40rem] [background-size:105%] sm:[background-size:79%] md:[background-size:53%] lg:[background-size:40%] bg-repeat dark:bg-black/60 h-screen overflow-hidden dark:bg-blend-multiply z-0'
        style={{
          backgroundImage: `url(/images/bg_pattern.png)`,
        }}
      ></div>
      <ScrollingTextBg />
    </>
  );
};

export default Experience;
