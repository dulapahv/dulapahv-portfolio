import React, { useRef } from 'react';

import { useTranslation } from 'next-i18next';

import Link from 'next/link';
import Image from 'next/image';
import { TbMinusVertical } from 'react-icons/tb';
import { Kanit, Noto_Sans_JP } from 'next/font/google';
import { BsArrowDownCircleFill } from 'react-icons/bs';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

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
  const { t, i18n } = useTranslation();

  const EducationSectionRef = useRef<HTMLDivElement>(null);

  const Header = () => {
    return (
      <div className='flex flex-col animate-fade-in overflow-x-hidden'>
        <div className='w-screen relative'>
          <video
            autoPlay
            loop
            muted
            className='w-screen blur absolute object-cover h-screen'
          >
            <source src='/videos/bg_video.mp4' type='video/mp4' />
          </video>
          <div className='absolute rounded-full w-4 h-4 bg-RED animate-shake-vertical opacity-70 left-[8%] top-64'></div>
          <div className='absolute rounded-full w-8 h-8 bg-BLUE animate-shake-vertical animation-delay-400 opacity-70 left-[13%] top-44'></div>
          <div className='absolute rounded-full w-16 h-16 bg-YELLOW animate-shake-vertical animation-delay-800 opacity-70 left-[36%] top-32'></div>
          <div className='absolute rounded-full w-12 h-12 bg-PURPLE animate-shake-vertical animation-delay-1200 opacity-70 left-[68%] top-32'></div>
          <div className='absolute rounded-full w-8 h-8 bg-YELLOW animate-shake-vertical animation-delay-800 opacity-70 left-[4%] top-[40rem]'></div>
          <div className='absolute rounded-full w-12 h-12 bg-PURPLE animate-shake-vertical animation-delay-1200 opacity-70 -left-[1%] top-[44rem]'></div>
          <div className='absolute rounded-full w-12 h-12 bg-RED animate-shake-vertical opacity-70 left-[26%] top-[48rem]'></div>
          <div className='absolute rounded-full w-8 h-8 bg-YELLOW animate-shake-vertical animation-delay-800 opacity-70 left-[84%] top-[53rem]'></div>
          <div className='absolute rounded-full w-16 h-16 bg-BLUE animate-shake-vertical animation-delay-400 opacity-70 left-[97%] top-[32rem]'></div>
        </div>
        <div className='flex flex-col lg:flex-row h-screen items-center justify-center gap-8 lg:gap-0 lg:justify-around z-[1] overflow-hidden'>
          <div className='w-fit flex flex-col gap-10 lg:gap-20 mx-8'>
            <div className='animate-clip-in-left animation-delay-100'>
              <h1
                className={`bg-BLUE text-3xl md:text-4xl lg:text-5xl text-WHITE uppercase font-bold p-3 pl-6 text-center ${
                  i18n.language === 'en'
                    ? 'tracking-[0.2em]'
                    : 'tracking-[0.35em]'
                } [text-shadow:0_0_5px_#54f1ff]`}
              >
                {t('Dulapah Vibulsanti')}
              </h1>
              <h2 className='bg-WHITE text-BLACK flex flex-wrap items-center px-3 w-fit text-sm md:text-base'>
                NEXT.JS <TbMinusVertical /> TAILWINDCSS <TbMinusVertical />{' '}
                TYPESCRIPT <TbMinusVertical /> FIGMA <TbMinusVertical /> REST
                APIs <TbMinusVertical /> OOP
              </h2>
            </div>
            <div className='flex flex-col gap-4'>
              <h3 className='bg-RED text-WHITE items-center uppercase px-3 py-1 w-fit font-medium text-base md:text-lg animate-clip-in-left animation-delay-100 -rotate-6 [text-shadow:0_0_5px_#c3456d]'>
                {t('Software Engineer')}
              </h3>
              <h3 className='bg-YELLOW text-WHITE items-center uppercase px-3 py-1 w-fit font-medium text-base md:text-lg animate-clip-in-left animation-delay-200 -rotate-6 [text-shadow:0_0_5px_#917833]'>
                {t('Frontend Developer')}
              </h3>
              <h3 className='bg-PURPLE text-WHITE items-center uppercase px-3 py-1 w-fit font-medium text-base md:text-lg animate-clip-in-left animation-delay-300 -rotate-6 [text-shadow:0_0_5px_#7948c7]'>
                {t('Pursuing Fullstack Developer')}
              </h3>
            </div>
          </div>
          <div className='relative'>
            <div className='absolute bg-BLUE w-screen h-36 -bottom-16 left-32 opacity-50 animate-clip-in-right'></div>
            <div className='flex mx-8 w-64 min-[375px]:w-72 min-[425px]:w-80 sm:w-96 md:w-[26rem] lg:w-auto'>
              <div className='animate-clip-in-left animation-delay-300 z-[1] w-fit'>
                <Image
                  src='/images/profile_pic.jpg'
                  width={500}
                  height={500}
                  alt='profile_pic'
                  className='rounded-bl-3xl'
                />
              </div>
              <div className='absolute bg-BLUE h-full aspect-square animate-clip-in-left z-0 rounded-bl-3xl shadow'></div>
            </div>
          </div>
        </div>
        <div className='relative bottom-16 text-RED z-[1] text-2xl text-center flex flex-col items-center gap-1'>
          <div className='animate-bounce flex flex-col items-center'>
            <BsArrowDownCircleFill
              className='btn btn-sm btn-circle text-RED cursor-pointer z-[1] drop-shadow-md'
              onClick={() => {
                EducationSectionRef.current!.scrollIntoView();
              }}
            />
            <button className='absolute btn btn-sm btn-circle pointer-events-none animate-ping z-0 drop-shadow-md'></button>
          </div>
          <p className='text-xs'>{t('Scroll to see more')}</p>
        </div>
      </div>
    );
  };

  const AboutMe = () => {
    return (
      <div className='flex flex-col animate-fade-in overflow-x-hidden'>
        <div className='w-screen relative'>
          <div className='absolute rounded-full w-4 h-4 bg-PURPLE animate-shake-vertical animation-delay-1200 opacity-70 left-[3%] top-72'></div>
          <div className='absolute rounded-full w-8 h-8 bg-RED animate-shake-vertical opacity-70 left-[5%] top-96'></div>
          <div className='absolute rounded-full w-14 h-14 bg-BLUE animate-shake-vertical animation-delay-400 opacity-70 left-[2%] top-[30rem]'></div>
          <div className='absolute rounded-full w-10 h-10 bg-YELLOW animate-shake-vertical animation-delay-800 opacity-70 left-[8%] top-[35rem]'></div>
        </div>
        <div
          className='flex flex-col h-fit bg-PURPLE/60 ml-32 rounded-bl-3xl p-16 gap-8 my-16 scroll-my-16'
          ref={EducationSectionRef}
        >
          <h1 className='bg-PURPLE w-fit px-3 text-WHITE uppercase text-4xl font-semibold tracking-[0.2em] p-3 first-letter:text-RED'>
            {t('About Me')}
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
              on a double degree program in Software Engineering. I am currently
              studying in the third year of my degree at the University of
              Glasgow.
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
              I have experience in developing websites using ReactJS, NextJS and
              TailwindCSS. You can learn more about my experience{' '}
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
        </div>
      </div>
    );
  };

  const Education = () => {
    return (
      <div className='flex flex-col items-center h-fit gap-8 py-8'>
        <div className='flex flex-col items-center gap-6 py-8'>
          <h1 className='text-BLACK dark:text-WHITE text-4xl uppercase tracking-[0.2em] font-semibold first-letter:text-RED'>
            {t('Education')}
          </h1>
          <div className='w-14 h-[2px] bg-BLUE flex flex-col'></div>
        </div>
        <div className='flex relative'>
          <Image
            src='/images/uofg_campus.png'
            width={1915}
            height={632}
            alt='University of Glasgow'
            className='w-screen bg-clip-content object-cover h-[500px]'
          />
          <div className='absolute top-12 bg-PURPLE p-3 opacity-80 text-WHITE rounded-br-xl'>
            <h2 className='text-2xl font-semibold'>University of Glasgow</h2>
            <p className='text-xs leading-3'>Scotland, United Kingdom</p>
            <p className='text-lg leading-10'>
              BSc Honours in Software Engineering
            </p>
            <p className='text-lg leading-3'>2023 - Present</p>
          </div>
        </div>
        <div className='flex relative'>
          <Image
            src='/images/kmitl_campus.jpg'
            width={1440}
            height={720}
            alt="King Mongkut's Institute of Technology Ladkrabang"
            className='w-screen bg-clip-content object-cover h-[500px] object-top'
          />
          <div className='absolute top-12 bg-PURPLE p-3 opacity-80 text-WHITE rounded-br-xl'>
            <h2 className='text-2xl font-semibold'>
              King Mongkut&apos;s Institute of Technology Ladkrabang
            </h2>
            <p className='text-xs leading-3'>Bangkok, Thailand</p>
            <p className='text-lg leading-10'>BEng in Software Engineering</p>
            <p className='text-lg leading-3'>2021 - 2022</p>
          </div>
        </div>
        <div className='flex relative'>
          <Image
            src='/images/sk_school.png'
            width={5622}
            height={3748}
            alt='Suankularb Wittayalai School'
            className='w-screen bg-clip-content object-cover h-[500px]'
          />
          <div className='absolute top-12 bg-PURPLE p-3 opacity-80 text-WHITE rounded-br-xl'>
            <h2 className='text-2xl font-semibold'>
              Suankularb Wittayalai School
            </h2>
            <p className='text-xs leading-3'>Bangkok, Thailand</p>
            <p className='text-lg leading-10'>Science - Mathematics</p>
            <p className='text-lg leading-3'>2018 - 2020</p>
          </div>
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
      <Header />
      <AboutMe />
      <Education />
    </>
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
