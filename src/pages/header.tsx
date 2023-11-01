import React from 'react';
import Image from 'next/image';
import { TbMinusVertical } from 'react-icons/tb';
import { BsArrowDownCircleFill } from 'react-icons/bs';

const Header = () => {
  return (
    <div className='flex flex-col animate-fade-in overflow-x-hidden'>
      <div className='w-screen relative'>
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
      <div className='flex flex-col lg:flex-row h-screen items-center gap-8 lg:gap-0 lg:justify-around z-[1] overflow-hidden'>
        <div className='w-fit flex flex-col gap-10 lg:gap-20 mx-8'>
          <div className='animate-clip-in-left animation-delay-100'>
            <h1
              className={`bg-BLUE text-3xl md:text-4xl lg:text-5xl text-WHITE uppercase font-bold p-3 pl-6 tracking-[0.2em] [text-shadow:0_0_5px_#54f1ff]`}
            >
              Dulapah Vibulsanti
            </h1>
            <h2 className='bg-WHITE text-BLACK flex flex-wrap items-center px-3 w-fit text-sm md:text-base'>
              NEXT.JS <TbMinusVertical /> TAILWINDCSS <TbMinusVertical />{' '}
              TYPESCRIPT <TbMinusVertical /> FIGMA <TbMinusVertical /> REST APIs{' '}
              <TbMinusVertical /> OOP
            </h2>
          </div>
          <div className='flex flex-col gap-4'>
            <h3 className='bg-RED text-WHITE items-center uppercase px-3 py-1 w-fit font-medium text-base md:text-lg animate-clip-in-left animation-delay-100 -rotate-6 [text-shadow:0_0_5px_#c3456d]'>
              Software Engineer
            </h3>
            <h3 className='bg-YELLOW text-WHITE items-center uppercase px-3 py-1 w-fit font-medium text-base md:text-lg animate-clip-in-left animation-delay-200 -rotate-6 [text-shadow:0_0_5px_#917833]'>
              Frontend Developer
            </h3>
            <h3 className='bg-PURPLE text-WHITE items-center uppercase px-3 py-1 w-fit font-medium text-base md:text-lg animate-clip-in-left animation-delay-300 -rotate-6 [text-shadow:0_0_5px_#7948c7]'>
              Pursuing Fullstack Developer
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
              const education = document.getElementById('aboutme');
              education?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
          <button className='absolute btn btn-sm btn-circle pointer-events-none animate-ping z-0 drop-shadow-md'></button>
        </div>
        <p className='text-xs'>Scroll to see more</p>
      </div>
    </div>
  );
};

export default Header;
