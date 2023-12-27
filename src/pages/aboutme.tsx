import React from 'react';

import { cubicBezier, motion } from 'framer-motion';

import { aboutme } from '@/data';
import { Kanit, Noto_Sans_JP } from 'next/font/google';

const kanit = Kanit({
  weight: ['600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'thai'],
});

const noto_sans_jp = Noto_Sans_JP({
  weight: ['600', '700'],
  style: ['normal'],
  subsets: ['latin', 'latin'],
});

const KanitFont = kanit.className;
const NotoSansJPFont = noto_sans_jp.className;

const Aboutme = () => {
  const ScrollingTextBg = () => {
    return (
      <div className="flex animate-fade-in flex-col justify-center overflow-hidden">
        <div className="mt-12 flex animate-puff-out-center flex-col justify-evenly text-base font-semibold !opacity-90 animation-delay-1000 *:text-center sm:text-lg md:text-xl lg:text-2xl dark:text-white">
          <p className="animate-slide-text-right-5">NextJS</p>
          <p className="animate-slide-text-left-2 text-lg font-bold text-BLUE animation-delay-1000 sm:text-xl md:text-2xl lg:text-3xl">
            Hi! I&apos;m dulapahv~💕
          </p>
          <p className="animate-slide-text-left-4">TypeScript</p>
          <p className="animate-slide-text-right-4 animation-delay-400">
            <span className={KanitFont}>สวัสดี</span>! dulapahv{' '}
            <span className={KanitFont}>เองน้า</span>~💕
          </p>
          <p className="animate-slide-text-left-2 animation-delay-700">
            Python
          </p>
          <p className="animate-slide-text-right-5">PostgreSQL</p>
          <p className="animate-slide-text-left-1">HTML</p>
          <p className="animate-slide-text-right-1 text-lg font-bold text-RED sm:text-xl md:text-2xl lg:text-3xl">
            A frontend developer🖼️
          </p>
          <p className="animate-slide-text-right-2">CSS</p>
          <p className="animate-slide-text-right-3 animation-delay-1000">
            <span className={NotoSansJPFont}>こんにちは</span>! dulapahv{' '}
            <span className={NotoSansJPFont}>です</span>~💕
          </p>
          <p className="animate-slide-text-left-3 animation-delay-900">
            JavaScript
          </p>
          <p className="animate-slide-text-right-2">C</p>
          <p className="animate-slide-text-left-5 animation-delay-300">C++</p>
          <p className="animate-slide-text-right-3 animation-delay-200">
            <span className={KanitFont}>เราคือ</span> Frontend Developer{' '}
            <span className={KanitFont}>นะ</span>~🖼️
          </p>
          <p className="animate-slide-text-right-5 animation-delay-600">Java</p>
          <p className="animate-slide-text-right-1 animation-delay-1000">
            ReactJS
          </p>
          <p className="animate-slide-text-left-1 text-lg font-bold text-YELLOW animation-delay-200 sm:text-xl md:text-2xl lg:text-3xl">
            Pursuing fullstack developer💯
          </p>
          <p className="animate-slide-text-right-4 animation-delay-200">
            <span className={NotoSansJPFont}>
              わたしはフロントエンドデベロッパーです
            </span>
            ~🖼️
          </p>
          <p className="animate-slide-text-left-2 animation-delay-400">NGINX</p>
          <p className="animate-slide-text-right-5 text-right animation-delay-1000">
            <span className={KanitFont}>เรากำลังเรียนรู้เพื่อเป็น</span>{' '}
            Fullstack Developer💯
          </p>
          <p className="animate-slide-text-right-2 animation-delay-600">
            Linux
          </p>
          <p className="animate-slide-text-right-1 text-right animation-delay-800">
            <span className={NotoSansJPFont}>
              わたしはフルスタックデベロッパーになりたいです
            </span>
            ~💯
          </p>
          <p className="animate-slide-text-left-3">Figma</p>
          <p className="animate-slide-text-right-2 text-lg font-bold text-PURPLE animation-delay-100 sm:text-xl md:text-2xl lg:text-3xl">
            Thanks for visiting my website!😊
          </p>
          <p className="animate-slide-text-left-5">TailwindCSS</p>
          <p className="animate-slide-text-right-3 animation-delay-1000">
            <span className={KanitFont}>
              ขอบคุณที่เข้ามาเยี่ยมชมเว็บไซต์ของเรานะ
            </span>
            ~😊
          </p>
          <p className="animate-slide-text-left-4 animation-delay-200">UX/UI</p>
          <p className="animate-slide-text-right-4 animation-delay-400">
            <span className={NotoSansJPFont}>
              私のウェブサイトをご覧いただきありがとうございます
            </span>
            ~😊
          </p>
        </div>
      </div>
    );
  };

  const Floaties = () => {
    return (
      <div className="relative w-screen *:absolute *:rounded-full *:opacity-70">
        <div className="left-[3%] top-[33rem] size-4 animate-shake-vertical bg-PURPLE animation-delay-1200"></div>
        <div className="left-[5%] top-[39rem] size-8 animate-shake-vertical bg-RED"></div>
        <div className="left-[2%] top-[45rem] size-14 animate-shake-vertical bg-BLUE animation-delay-400"></div>
        <div className="left-[8%] top-[50rem] size-10 animate-shake-vertical bg-YELLOW animation-delay-800"></div>
      </div>
    );
  };

  return (
    <div className="flex flex-col overflow-hidden" id="aboutme">
      <Floaties />
      <div className="relative">
        <ScrollingTextBg />
        <div className="absolute top-0 lg:top-20">
          <div className="lg:md-12 my-2 ml-4 flex h-fit scroll-my-16 flex-col gap-4 rounded-bl-3xl bg-PURPLE/60 p-4 backdrop-blur sm:my-4 sm:ml-8 sm:p-8 md:my-8 md:ml-12 md:gap-8 md:p-6 lg:my-16 lg:ml-16">
            <motion.h1
              className="w-fit bg-PURPLE p-1 px-3 text-xl font-semibold uppercase tracking-[0.2em] text-WHITE first-letter:text-RED sm:text-2xl md:p-3 md:text-3xl lg:text-4xl"
              initial={{
                transform: 'scale(.5)',
                transformOrigin: '50% 100%',
                opacity: 0,
              }}
              whileInView={{
                transform: 'scale(1)',
                transformOrigin: '50% 100%',
                opacity: 1,
              }}
              transition={{
                ease: cubicBezier(0.19, 1.0, 0.22, 1.0),
                duration: 0.5,
              }}
              viewport={{ once: true }}
            >
              About Me
            </motion.h1>
            {aboutme.map((text, index) => (
              <div className="flex flex-col gap-2" key={index}>
                <div className="flex h-[2px] w-10 flex-col bg-BLUE"></div>
                <motion.p
                  className="text-justify text-xs text-WHITE min-[425px]:text-sm sm:text-base md:text-lg lg:text-xl"
                  initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' }}
                  whileInView={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                  }}
                  transition={{
                    ease: 'easeOut',
                    duration: 1,
                    delay: (index + 1) * 0.1,
                  }}
                  viewport={{ once: true }}
                >
                  {text}
                </motion.p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutme;
