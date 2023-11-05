import React, { useRef, useState } from 'react';

import { useTheme } from 'next-themes';

import Image from 'next/image';
import { FiExternalLink } from 'react-icons/fi';
import { TbMinusVertical } from 'react-icons/tb';
import { BsArrowDownCircleFill } from 'react-icons/bs';
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile';

const Header = () => {
  const captchaInstance = useRef<TurnstileInstance>(null);
  const { resolvedTheme } = useTheme();
  const [isRevealEmail, setIsRevealEmail] = useState(false);
  const [email, setEmail] = useState('' as string);
  const [isFetchingEmail, setIsFetchingEmail] = useState(false);

  const handleCaptchaSuccess = async (token: string) => {
    const modal = document!.getElementById(
      'turnstileModal'
    ) as HTMLDialogElement;
    modal.close();
    setIsFetchingEmail(true);
    try {
      const response = await fetch(
        `https://verify.dulapahv.dev/validate-captcha?token=${token}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const result = await response.json();
      if (result.success) {
        setIsFetchingEmail(false);
        console.log(result.message);
        setEmail(result.message.email.label);
      } else {
        setIsFetchingEmail(false);
        setEmail(result.message);
      }
    } catch (error) {
      setIsFetchingEmail(false);
      setEmail('Cannot connect to server!');
    }
  };

  return (
    <div className='flex flex-col animate-fade-in overflow-hidden'>
      <div className='w-screen relative'>
        <div className='absolute rounded-full w-4 h-4 bg-RED animate-shake-vertical opacity-70 left-[8%] top-[256px]'></div>
        <div className='absolute rounded-full w-8 h-8 bg-BLUE animate-shake-vertical animation-delay-400 opacity-70 left-[13%] top-[176px]'></div>
        <div className='absolute rounded-full w-16 h-16 bg-YELLOW animate-shake-vertical animation-delay-800 opacity-70 left-[36%] top-[128px]'></div>
        <div className='absolute rounded-full w-12 h-12 bg-PURPLE animate-shake-vertical animation-delay-1200 opacity-70 left-[68%] top-[128px]'></div>
        <div className='absolute rounded-full w-8 h-8 bg-YELLOW animate-shake-vertical animation-delay-800 opacity-70 left-[4%] top-[640px]'></div>
        <div className='absolute rounded-full w-12 h-12 bg-PURPLE animate-shake-vertical animation-delay-1200 opacity-70 -left-[1%] top-[704px]'></div>
        <div className='absolute rounded-full w-12 h-12 bg-RED animate-shake-vertical opacity-70 left-[26%] top-[768px]'></div>
        <div className='absolute rounded-full w-8 h-8 bg-YELLOW animate-shake-vertical animation-delay-800 opacity-70 left-[84%] top-[848px]'></div>
        <div className='absolute rounded-full w-16 h-16 bg-BLUE animate-shake-vertical animation-delay-400 opacity-70 left-[97%] top-[512px]'></div>
      </div>
      <div className='flex flex-col pt-4 md:pt-8 lg:pt-0 lg:flex-row min-h-screen h-fit items-center gap-8 lg:gap-0 lg:justify-around z-[1] overflow-hidden'>
        <div className='w-fit flex flex-col gap-10 lg:gap-20 mx-4 md:mx-8'>
          <div className='animate-clip-in-left animation-delay-100'>
            <h1
              className={`bg-BLUE text-3xl md:text-4xl lg:text-5xl text-WHITE uppercase font-bold p-3 pl-3 lg:pl-6 tracking-[0.2em] [text-shadow:0_0_5px_#54f1ff]`}
            >
              Dulapah Vibulsanti
            </h1>
            <h2 className='bg-BLACK/50 dark:bg-WHITE/50 text-WHITE flex flex-wrap items-center px-3 w-fit text-sm md:text-base'>
              NEXT.JS <TbMinusVertical /> TAILWIND CSS <TbMinusVertical />{' '}
              TYPESCRIPT <TbMinusVertical /> FIGMA <TbMinusVertical /> PYTHON{' '}
              <TbMinusVertical /> C/C++
            </h2>
            <h3 className='bg-BLACK/10 dark:bg-WHITE text-BLACK flex flex-wrap items-center px-3 w-fit text-sm md:text-base'>
              <a
                href='https://www.linkedin.com/in/dulapahv/'
                target='_blank'
                rel='noopener noreferrer'
              >
                LinkedIn
                <FiExternalLink className='ml-1 text-BLACK/80 inline mb-1' />
              </a>
              <span className='select-none'>&nbsp;&nbsp;&nbsp;</span>
              <a
                href='https://github.com/dulapahv/'
                target='_blank'
                rel='noopener noreferrer'
              >
                GitHub
                <FiExternalLink className='ml-1 text-BLACK/80 inline mb-1' />
              </a>
              <span className='select-none'>&nbsp;&nbsp;&nbsp;</span>
              {email ? (
                email
              ) : (
                <>
                  {isFetchingEmail ? (
                    <span className='loading loading-bars loading-sm align-middle'></span>
                  ) : (
                    <button
                      className='btn btn-ghost min-h-0 h-[24px] p-0 leading-3 hover:bg-transparent capitalize font-normal text-base underline'
                      onClick={() => {
                        setIsRevealEmail(true);
                        const modal = document!.getElementById(
                          'turnstileModal'
                        ) as HTMLDialogElement;
                        modal.showModal();
                      }}
                    >
                      Reveal Email
                    </button>
                  )}
                </>
              )}
            </h3>
          </div>
          <dialog id='turnstileModal' className='modal'>
            {isRevealEmail && (
              <>
                <div className='modal-box w-fit p-0 bg-WHITE dark:bg-BLACK rounded-none'>
                  <h1 className='text-BLACK dark:text-WHITE text-center'>
                    <span className='loading loading-bars loading-sm mr-2 align-middle'></span>
                    Verifying...
                  </h1>
                  <Turnstile
                    siteKey='0x4AAAAAAACYFWWcTzhCNWz4' // 0x4AAAAAAACYFWWcTzhCNWz4 1x00000000000000000000AA
                    onError={() => console.log('Error!')}
                    onExpire={() => {
                      console.log('Expired!');
                      // captchaInstance.current?.reset();
                    }}
                    onSuccess={handleCaptchaSuccess}
                    options={{
                      theme: resolvedTheme === 'dark' ? 'dark' : 'light',
                    }}
                    ref={captchaInstance}
                  />
                </div>
                <form method='dialog' className='modal-backdrop'>
                  <button>close</button>
                </form>
              </>
            )}
          </dialog>
          <div className='flex flex-col gap-4'>
            <h3 className='bg-RED text-WHITE items-center uppercase px-3 py-1 w-fit font-medium text-sm sm:text-base md:text-lg animate-clip-in-left animation-delay-100 -rotate-6 [text-shadow:0_0_5px_#c3456d]'>
              Software Engineer
            </h3>
            <h3 className='bg-YELLOW text-WHITE items-center uppercase px-3 py-1 w-fit font-medium text-sm sm:text-base md:text-lg animate-clip-in-left animation-delay-200 -rotate-6 [text-shadow:0_0_5px_#917833]'>
              Frontend Developer
            </h3>
            <h3 className='bg-PURPLE text-WHITE items-center uppercase px-3 py-1 w-fit font-medium text-sm sm:text-base md:text-lg animate-clip-in-left animation-delay-300 -rotate-6 [text-shadow:0_0_5px_#7948c7]'>
              Pursuing Fullstack Developer
            </h3>
          </div>
        </div>
        <div className='relative mt-4 lg:mt-0'>
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
      <div className='relative bottom-32 text-RED z-[1] text-2xl text-center flex flex-col items-center gap-1'>
        <div className='animate-bounce flex flex-col items-center'>
          <BsArrowDownCircleFill
            className='btn btn-sm btn-circle text-RED cursor-pointer z-[1] drop-shadow-md'
            onClick={() => {
              const education = document.getElementById('aboutme');
              education?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
          <button
            className='absolute btn btn-sm btn-circle pointer-events-none animate-ping z-0 drop-shadow-md'
            aria-label='Scroll to see more'
          ></button>
        </div>
        <p className='text-xs'>Scroll to see more</p>
      </div>
    </div>
  );
};

export default Header;
