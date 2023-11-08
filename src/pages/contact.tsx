import React, { useRef, useState } from 'react';

import { useTheme } from 'next-themes';

import Image from 'next/image';
import { MdEmail } from 'react-icons/md';
import { FaFacebookSquare } from 'react-icons/fa';
import { BsDiscord, BsSteam } from 'react-icons/bs';
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile';

const Contact = () => {
  const { resolvedTheme } = useTheme();
  const [otherErrorMsg, setOtherErrorMsg] = useState('');

  const Header = () => {
    return (
      <div className="flex animate-fade-in flex-col overflow-x-hidden pb-20">
        <div className="relative z-[1] w-screen">
          <div className="absolute left-[-1.5%] top-40 h-14 w-14 animate-shake-vertical rounded-full bg-PURPLE opacity-70 animation-delay-1200"></div>
          <div className="absolute left-[8%] top-40 h-4 w-4 animate-shake-vertical rounded-full bg-RED opacity-70"></div>
          <div className="absolute left-[13%] top-24 h-8 w-8 animate-shake-vertical rounded-full bg-BLUE opacity-70 animation-delay-400"></div>
          <div className="absolute left-[13%] top-64 h-10 w-10 animate-shake-vertical rounded-full bg-RED opacity-70"></div>
          <div className="absolute left-[36%] top-20 h-14 w-14 animate-shake-vertical rounded-full bg-YELLOW opacity-70 animation-delay-800"></div>
          <div className="absolute left-[83%] top-72 h-8 w-8 animate-shake-vertical rounded-full bg-PURPLE opacity-70 animation-delay-1200"></div>
          <div className="absolute left-[89%] top-80 h-8 w-8 animate-shake-vertical rounded-full bg-YELLOW opacity-70 animation-delay-800"></div>
          <div className="absolute left-[98%] top-56 h-14 w-14 animate-shake-vertical rounded-full bg-BLUE opacity-70 animation-delay-400"></div>
        </div>
        <div className="flex flex-col justify-center gap-8 overflow-hidden lg:flex-row lg:justify-around lg:gap-0">
          <h1 className="ml-36 px-32 pt-36 text-5xl font-semibold uppercase tracking-[0.2em] text-BLACK first-letter:text-RED dark:text-WHITE">
            Contact
          </h1>
          <div className="flex grow">
            <Image
              src="/images/bg_contact.jpg"
              width={1781}
              height={1000}
              alt="University of Glasgow"
              className="h-[330px] w-screen rounded-bl-3xl bg-clip-content object-cover opacity-50"
            />
            <div className="absolute h-[330px] w-full rounded-bl-3xl bg-BLUE/10"></div>
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
            <div className="flex flex-col items-center gap-4 text-lg font-medium text-BLACK dark:text-WHITE">
              <p>Failed to verify. Click here to try again</p>
              <button
                className="btn bg-neutral-300"
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
            <div className="flex flex-col items-center gap-4 text-lg font-medium text-BLACK dark:text-WHITE">
              <p>Your session has expired. Click here to try again</p>
              <button
                className="btn bg-neutral-300"
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
            <div className="flex flex-col items-center gap-4 text-lg font-medium text-BLACK dark:text-WHITE">
              <p>Invalid token. Click here to try again</p>
              <button
                className="btn bg-neutral-300"
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
            <div className="flex flex-col items-center gap-4 text-lg font-medium text-BLACK dark:text-WHITE">
              <p>Something went wrong, please try again later</p>
              {otherErrorMsg && <p>({otherErrorMsg})</p>}
              <button
                className="btn bg-neutral-300"
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
            <div className="flex flex-col items-center gap-4 text-lg font-medium text-BLACK dark:text-WHITE">
              <p>Checking that you are not a robot...</p>
              <span className="loading loading-dots loading-lg"></span>
            </div>
          );
      }
    };

    return (
      <div className="relative">
        <div className="flex justify-center">
          <div
            className="flex animate-slide-in-fwd-bottom flex-col items-center"
            ref={captchaRef}
          >
            <div className="pb-4">
              <Msg />
            </div>
            <Turnstile
              siteKey="0x4AAAAAAACYFWWcTzhCNWz4" // 0x4AAAAAAACYFWWcTzhCNWz4 1x00000000000000000000AA
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
          <div className="hidden" ref={msgRef}>
            <div className="grid grid-cols-2 gap-x-6 gap-y-12">
              <div className="flex w-96 animate-slide-in-fwd-bottom rounded-2xl bg-neutral-200 dark:bg-neutral-700">
                <div className="absolute -top-8 w-full">
                  <div className="flex w-full justify-center">
                    <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-RED">
                      <MdEmail className="text-4xl text-WHITE" />
                    </div>
                  </div>
                </div>
                <div className="card-body mt-4 items-center gap-2 text-center text-WHITE">
                  <h2 className="card-title text-RED">Email</h2>
                  <p className="text-BLACK dark:text-WHITE">
                    {msg.email.label}
                  </p>
                  <div className="card-actions mt-2 justify-end">
                    <a
                      href={msg.email.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className='btn h-10 min-h-0 border-none bg-RED text-WHITE after:content-["_↗"] hover:bg-RED/90'>
                        Contact
                      </button>
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex w-96 animate-slide-in-fwd-bottom rounded-2xl bg-neutral-200 animation-delay-100 dark:bg-neutral-700">
                <div className="absolute -top-8 w-full">
                  <div className="flex w-full justify-center">
                    <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-BLUE">
                      <BsDiscord className="text-3xl text-WHITE" />
                    </div>
                  </div>
                </div>
                <div className="card-body mt-4 items-center gap-2 text-center text-WHITE">
                  <h2 className="card-title text-BLUE">Discord</h2>
                  <p className="text-BLACK dark:text-WHITE">
                    {msg.discord.label}
                  </p>
                  <div className="card-actions mt-2 justify-end">
                    <a
                      href={msg.discord.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className='btn h-10 min-h-0 border-none bg-BLUE text-WHITE after:content-["_↗"] hover:bg-BLUE/90'>
                        Contact
                      </button>
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex w-96 animate-slide-in-fwd-bottom rounded-2xl bg-neutral-200 animation-delay-200 dark:bg-neutral-700">
                <div className="absolute -top-8 w-full">
                  <div className="flex w-full justify-center">
                    <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-YELLOW">
                      <FaFacebookSquare className="text-3xl text-WHITE" />
                    </div>
                  </div>
                </div>
                <div className="card-body mt-4 items-center gap-2 text-center text-WHITE">
                  <h2 className="card-title text-YELLOW">Facebook</h2>
                  <p className="text-BLACK dark:text-WHITE">
                    {msg.facebook.label}
                  </p>
                  <div className="card-actions mt-2 justify-end">
                    <a
                      href={msg.facebook.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className='btn h-10 min-h-0 border-none bg-YELLOW text-WHITE after:content-["_↗"] hover:bg-YELLOW/90'>
                        Contact
                      </button>
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex w-96 animate-slide-in-fwd-bottom rounded-2xl bg-neutral-200 animation-delay-300 dark:bg-neutral-700">
                <div className="absolute -top-8 w-full">
                  <div className="flex w-full justify-center">
                    <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-PURPLE">
                      <BsSteam className="text-3xl text-WHITE" />
                    </div>
                  </div>
                </div>
                <div className="card-body mt-4 items-center gap-2 text-center text-WHITE">
                  <h2 className="card-title text-PURPLE">Steam</h2>
                  <p className="text-BLACK dark:text-WHITE">
                    {msg.steam.label}
                  </p>
                  <div className="card-actions mt-2 justify-end">
                    <a
                      href={msg.steam.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className='btn h-10 min-h-0 border-none bg-PURPLE text-WHITE after:content-["_↗"] hover:bg-PURPLE/90'>
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
        className="fixed z-0 h-screen w-[15rem] overflow-hidden bg-repeat [background-size:105%] dark:bg-black/60 dark:bg-blend-multiply sm:w-[20rem] sm:[background-size:79%] md:w-[30rem] md:[background-size:53%] lg:w-[40rem] lg:[background-size:40%]"
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
