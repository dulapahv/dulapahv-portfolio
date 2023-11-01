import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
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

const Aboutme = () => {
  const ScrollingTextBg = () => {
    return (
      <div
        className='flex flex-col justify-center animate-fade-in overflow-hidden'
        id='experience'
      >
        <div className='flex flex-col justify-evenly mt-12 dark:text-white text-base sm:text-lg md:text-xl lg:text-2xl font-semibold !opacity-90 animate-puff-out-center animation-delay-1000'>
          <p className='text-center animate-slide-text-right-5'>NextJS</p>
          <p className='text-center animate-slide-text-left-2 animation-delay-1000 text-BLUE font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl'>
            Hi! I&apos;m dulapahv~💕
          </p>
          <p className='text-center animate-slide-text-left-4'>TypeScript</p>
          <p className='text-center animate-slide-text-right-4 animation-delay-400'>
            <span className={KanitFont}>สวัสดี</span>! dulapahv{' '}
            <span className={KanitFont}>เองน้า</span>~💕
          </p>
          <p className='text-center animate-slide-text-left-2 animation-delay-700'>
            Python
          </p>
          <p className='text-center animate-slide-text-right-5'>PostgreSQL</p>
          <p className='text-center animate-slide-text-left-1'>HTML</p>
          <p className='text-center animate-slide-text-right-1 text-RED font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl'>
            A frontend developer🖼️
          </p>
          <p className='text-center animate-slide-text-right-2'>CSS</p>
          <p className='text-center animate-slide-text-right-3 animation-delay-1000'>
            <span className={NotoSansJPFont}>こんにちは</span>! dulapahv{' '}
            <span className={NotoSansJPFont}>です</span>~💕
          </p>
          <p className='text-center animate-slide-text-left-3 animation-delay-900'>
            JavaScript
          </p>
          <p className='text-center animate-slide-text-right-2'>C</p>
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
          <p className='text-center animate-slide-text-left-3'>Figma</p>
          <p className='text-center animate-slide-text-right-2 animation-delay-100 text-PURPLE font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl'>
            Thanks for visiting my website!😊
          </p>
          <p className='text-center animate-slide-text-left-5'>TailwindCSS</p>
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
    <div
      className='flex flex-col animate-clip-in-right overflow-x-hidden'
      id='aboutme'
    >
      <div className='w-screen relative'>
        <div className='absolute rounded-full w-4 h-4 bg-PURPLE animate-shake-vertical animation-delay-1200 opacity-70 left-[3%] top-72'></div>
        <div className='absolute rounded-full w-8 h-8 bg-RED animate-shake-vertical opacity-70 left-[5%] top-96'></div>
        <div className='absolute rounded-full w-14 h-14 bg-BLUE animate-shake-vertical animation-delay-400 opacity-70 left-[2%] top-[30rem]'></div>
        <div className='absolute rounded-full w-10 h-10 bg-YELLOW animate-shake-vertical animation-delay-800 opacity-70 left-[8%] top-[35rem]'></div>
      </div>
      <div className='relative'>
        <ScrollingTextBg />
        <div className='absolute top-0'>
          <motion.div
            className='flex flex-col h-fit backdrop-blur bg-PURPLE/60 ml-32 rounded-bl-3xl p-16 gap-8 my-16 scroll-my-16'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            whileInView={{ x: 50 }}
          >
            <h1 className='bg-PURPLE w-fit px-3 text-WHITE uppercase text-4xl font-semibold tracking-[0.2em] p-3 first-letter:text-RED'>
              About Me
            </h1>
            <div className='flex flex-col gap-2'>
              <div className='w-10 h-[2px] bg-BLUE flex flex-col'></div>

              <p className='text-WHITE text-xl text-justify'>
                I am a student at{' '}
                <a
                  href='https://www.gla.ac.uk/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-YELLOW after:content-["_↗"]'
                >
                  University of Glasgow
                </a>{' '}
                and{' '}
                <a
                  href='https://www.kmitl.ac.th/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-YELLOW after:content-["_↗"]'
                >
                  King Mongkut&apos;s Institute of Technology Ladkrabang
                </a>{' '}
                on a double degree program in Software Engineering. I am
                currently studying in the third year of my degree at the
                University of Glasgow.
              </p>
            </div>
            <div className='flex flex-col gap-2'>
              <div className='w-10 h-[2px] bg-BLUE flex flex-col'></div>
              <p className='text-WHITE text-xl text-justify'>
                I am a hard-working and enthusiastic person who is willing to
                learn new things and take on new challenges. I am interested in
                web development, especially frontend development.
              </p>
            </div>
            <div className='flex flex-col gap-2'>
              <div className='w-10 h-[2px] bg-BLUE flex flex-col'></div>
              <p className='text-WHITE text-xl text-justify'>
                I have experience in developing websites using ReactJS, NextJS
                and TailwindCSS. You can learn more about my experience{' '}
                <Link
                  href='/experience'
                  className='text-YELLOW after:content-["_↗"]'
                >
                  here
                </Link>
                . I am also interested in UX/UI design and have experience in
                designing websites using Figma. I am pursuing to be a fullstack
                developer and I am looking forward to where my career will take
                me.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Aboutme;
