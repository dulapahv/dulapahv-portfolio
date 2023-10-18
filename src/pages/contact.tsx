import React, { useRef, useState } from 'react';

import { useTheme } from 'next-themes';

import Image from 'next/image';
import { BsDiscord, BsSteam } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { FaFacebookSquare } from 'react-icons/fa';
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile';

const Contact = () => {
  const { resolvedTheme } = useTheme();
  const [otherErrorMsg, setOtherErrorMsg] = useState('');

  const Header = () => {
    return (
      <div className='flex flex-col animate-fade-in overflow-x-hidden pb-20'>
        <div className='w-screen relative z-[1]'>
          <div className='absolute rounded-full w-14 h-14 bg-PURPLE animate-shake-vertical animation-delay-1200 opacity-70 left-[-1.5%] top-40'></div>
          <div className='absolute rounded-full w-4 h-4 bg-RED animate-shake-vertical opacity-70 left-[8%] top-40'></div>
          <div className='absolute rounded-full w-8 h-8 bg-BLUE animate-shake-vertical animation-delay-400 opacity-70 left-[13%] top-24'></div>
          <div className='absolute rounded-full w-10 h-10 bg-RED animate-shake-vertical opacity-70 left-[13%] top-64'></div>
          <div className='absolute rounded-full w-14 h-14 bg-YELLOW animate-shake-vertical animation-delay-800 opacity-70 left-[36%] top-20'></div>
          <div className='absolute rounded-full w-8 h-8 bg-PURPLE animate-shake-vertical animation-delay-1200 opacity-70 left-[83%] top-72'></div>
          <div className='absolute rounded-full w-8 h-8 bg-YELLOW animate-shake-vertical animation-delay-800 opacity-70 left-[89%] top-80'></div>
          <div className='absolute rounded-full w-14 h-14 bg-BLUE animate-shake-vertical animation-delay-400 opacity-70 left-[98%] top-56'></div>
        </div>
        <div className='flex flex-col lg:flex-row justify-center gap-8 lg:gap-0 lg:justify-around overflow-hidden'>
          <h1 className='text-BLACK dark:text-WHITE text-5xl uppercase tracking-[0.2em] font-semibold first-letter:text-RED px-32 pt-36 ml-36'>
            Contact
          </h1>
          <div className='flex grow'>
            <Image
              src='/images/bg_contact.jpg'
              width={1781}
              height={1000}
              alt='University of Glasgow'
              className='w-screen bg-clip-content object-cover h-[330px] rounded-bl-3xl opacity-50'
            />
            <div className='w-full h-[330px] absolute bg-BLUE/10 rounded-bl-3xl'></div>
          </div>
        </div>
      </div>
    );
  };

  interface Msg {
    email: {
      label: string;
      link: string;
    };
    discord: {
      label: string;
      link: string;
    };
    facebook: {
      label: string;
      link: string;
    };
    steam: {
      label: string;
      link: string;
    };
  }

  const Content = () => {
    const [captchaStatus, setCaptchaStatus] = useState('');
    const [msg, setMsg] = useState<Msg>({
      email: {
        label: '',
        link: '',
      },
      discord: {
        label: '',
        link: '',
      },
      facebook: {
        label: '',
        link: '',
      },
      steam: {
        label: '',
        link: '',
      },
    });

    const captchaInstance = useRef<TurnstileInstance>(null);
    const captchaRef = useRef<HTMLDivElement>(null);
    const msgRef = useRef<HTMLDivElement>(null);

    const handleCaptchaSuccess = async (token: string) => {
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
          handleTokenSuccess(result);
        } else {
          handleTokenError(result);
        }
      } catch (error) {
        handleTokenError(error);
      }
    };

    const handleTokenSuccess = (result: any) => {
      setCaptchaStatus('success');
      setMsg(result.message);
    };

    const handleTokenError = (result: any) => {
      setCaptchaStatus('other');
      setOtherErrorMsg(result.message);
    };

    const Msg = () => {
      switch (captchaStatus) {
        case 'error':
          return (
            <div className='text-BLACK dark:text-WHITE text-lg font-medium flex flex-col gap-4 items-center'>
              <p>Failed to verify. Click here to try again</p>
              <button
                className='btn bg-neutral-300'
                onClick={() => {
                  captchaInstance.current!.render();
                  setCaptchaStatus('');
                }}
              >
                Try again
              </button>
            </div>
          );
        case 'expired':
          captchaInstance.current!.remove();
          return (
            <div className='text-BLACK dark:text-WHITE text-lg font-medium flex flex-col gap-4 items-center'>
              <p>Your session has expired. Click here to try again</p>
              <button
                className='btn bg-neutral-300'
                onClick={() => {
                  captchaInstance.current!.render();
                  setCaptchaStatus('');
                }}
              >
                Try again
              </button>
            </div>
          );
        case 'invalidToken':
          captchaInstance.current!.remove();
          return (
            <div className='text-BLACK dark:text-WHITE text-lg font-medium flex flex-col gap-4 items-center'>
              <p>Invalid token. Click here to try again</p>
              <button
                className='btn bg-neutral-300'
                onClick={() => {
                  captchaInstance.current!.render();
                  setCaptchaStatus('');
                }}
              >
                Try again
              </button>
            </div>
          );
        case 'success':
          setTimeout(() => {
            captchaInstance.current!.remove();
            captchaRef.current!.classList.add('hidden');
            msgRef.current!.classList.toggle('hidden');
          }, 750);
          break;
        case 'other':
          captchaInstance.current!.remove();
          return (
            <div className='text-BLACK dark:text-WHITE text-lg font-medium flex flex-col gap-4 items-center'>
              <p>Something went wrong, please try again later</p>
              {otherErrorMsg && <p>({otherErrorMsg})</p>}
              <button
                className='btn bg-neutral-300'
                onClick={() => {
                  captchaInstance.current!.render();
                  setCaptchaStatus('');
                }}
              >
                Try again
              </button>
            </div>
          );
        default:
          return (
            <div className='text-BLACK dark:text-WHITE text-lg font-medium flex flex-col gap-4 items-center'>
              <p>Checking that you are not a robot...</p>
              <span className='loading loading-dots loading-lg'></span>
            </div>
          );
      }
    };

    return (
      <div className='relative'>
        <div className='flex justify-center'>
          <div
            className='flex flex-col items-center animate-slide-in-fwd-bottom'
            ref={captchaRef}
          >
            <div className='pb-4'>
              <Msg />
            </div>
            <Turnstile
              siteKey='0x4AAAAAAACYFWWcTzhCNWz4' // 0x4AAAAAAACYFWWcTzhCNWz4 1x00000000000000000000AA
              onError={() => setCaptchaStatus('error')}
              onExpire={() => {
                setCaptchaStatus('expired');
              }}
              onSuccess={handleCaptchaSuccess}
              options={{
                theme: resolvedTheme === 'dark' ? 'dark' : 'light',
              }}
              ref={captchaInstance}
            />
          </div>
          <div className='hidden' ref={msgRef}>
            <div className='grid grid-cols-2 gap-x-6 gap-y-12'>
              <div className='rounded-2xl flex w-96 bg-neutral-200 dark:bg-neutral-700 animate-slide-in-fwd-bottom'>
                <div className='absolute -top-8 w-full'>
                  <div className='w-full flex justify-center'>
                    <div className='flex justify-center items-center rounded-full bg-RED w-[4.5rem] h-[4.5rem]'>
                      <MdEmail className='text-4xl text-WHITE' />
                    </div>
                  </div>
                </div>
                <div className='card-body text-WHITE items-center text-center mt-4 gap-2'>
                  <h2 className='card-title text-RED'>Email</h2>
                  <p className='text-BLACK dark:text-WHITE'>
                    {msg.email.label}
                  </p>
                  <div className='card-actions justify-end mt-2'>
                    <a
                      href={msg.email.link}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <button className='btn min-h-0 h-10 bg-RED hover:bg-RED/90 border-none text-WHITE after:content-["_↗"]'>
                        Contact
                      </button>
                    </a>
                  </div>
                </div>
              </div>
              <div className='rounded-2xl flex w-96 bg-neutral-200 dark:bg-neutral-700 animate-slide-in-fwd-bottom animation-delay-100'>
                <div className='absolute -top-8 w-full'>
                  <div className='w-full flex justify-center'>
                    <div className='flex justify-center items-center rounded-full bg-BLUE w-[4.5rem] h-[4.5rem]'>
                      <BsDiscord className='text-3xl text-WHITE' />
                    </div>
                  </div>
                </div>
                <div className='card-body text-WHITE items-center text-center mt-4 gap-2'>
                  <h2 className='card-title text-BLUE'>Discord</h2>
                  <p className='text-BLACK dark:text-WHITE'>
                    {msg.discord.label}
                  </p>
                  <div className='card-actions justify-end mt-2'>
                    <a
                      href={msg.discord.link}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <button className='btn min-h-0 h-10 bg-BLUE hover:bg-BLUE/90 border-none text-WHITE after:content-["_↗"]'>
                        Contact
                      </button>
                    </a>
                  </div>
                </div>
              </div>
              <div className='rounded-2xl flex w-96 bg-neutral-200 dark:bg-neutral-700 animate-slide-in-fwd-bottom animation-delay-200'>
                <div className='absolute -top-8 w-full'>
                  <div className='w-full flex justify-center'>
                    <div className='flex justify-center items-center rounded-full bg-YELLOW w-[4.5rem] h-[4.5rem]'>
                      <FaFacebookSquare className='text-3xl text-WHITE' />
                    </div>
                  </div>
                </div>
                <div className='card-body text-WHITE items-center text-center mt-4 gap-2'>
                  <h2 className='card-title text-YELLOW'>Facebook</h2>
                  <p className='text-BLACK dark:text-WHITE'>
                    {msg.facebook.label}
                  </p>
                  <div className='card-actions justify-end mt-2'>
                    <a
                      href={msg.facebook.link}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <button className='btn min-h-0 h-10 bg-YELLOW hover:bg-YELLOW/90 border-none text-WHITE after:content-["_↗"]'>
                        Contact
                      </button>
                    </a>
                  </div>
                </div>
              </div>
              <div className='rounded-2xl flex w-96 bg-neutral-200 dark:bg-neutral-700 animate-slide-in-fwd-bottom animation-delay-300'>
                <div className='absolute -top-8 w-full'>
                  <div className='w-full flex justify-center'>
                    <div className='flex justify-center items-center rounded-full bg-PURPLE w-[4.5rem] h-[4.5rem]'>
                      <BsSteam className='text-3xl text-WHITE' />
                    </div>
                  </div>
                </div>
                <div className='card-body text-WHITE items-center text-center mt-4 gap-2'>
                  <h2 className='card-title text-PURPLE'>Steam</h2>
                  <p className='text-BLACK dark:text-WHITE'>
                    {msg.steam.label}
                  </p>
                  <div className='card-actions justify-end mt-2'>
                    <a
                      href={msg.steam.link}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <button className='btn min-h-0 h-10 bg-PURPLE hover:bg-PURPLE/90 border-none text-WHITE after:content-["_↗"]'>
                        Contact
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
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
      <Content />
    </>
  );
};

export default Contact;
