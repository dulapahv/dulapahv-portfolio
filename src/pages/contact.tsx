import React, { useRef, useState } from 'react';

import { useTheme } from 'next-themes';
import { useTranslation } from 'next-i18next';

import Image from 'next/image';
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Contact = () => {
  const { t } = useTranslation();
  const { resolvedTheme } = useTheme();
  const [otherErrorMsg, setOtherErrorMsg] = useState('');

  const Header = () => {
    return (
      <div className='flex flex-col animate-fade-in overflow-x-hidden pb-44'>
        <div className='w-screen relative z-[1]'>
          <div className='absolute rounded-full w-14 h-14 bg-PURPLE animate-shake-vertical animation-delay-1200 opacity-70 left-[-1.5%] top-40'></div>
          <div className='absolute rounded-full w-4 h-4 bg-RED animate-shake-vertical opacity-70 left-[8%] top-40'></div>
          <div className='absolute rounded-full w-8 h-8 bg-BLUE animate-shake-vertical animation-delay-400 opacity-70 left-[13%] top-24'></div>
          <div className='absolute rounded-full w-10 h-10 bg-RED animate-shake-vertical opacity-70 left-[13%] top-64'></div>
          <div className='absolute rounded-full w-14 h-14 bg-YELLOW animate-shake-vertical animation-delay-800 opacity-70 left-[36%] top-20'></div>
          <div className='absolute rounded-full w-8 h-8 bg-PURPLE animate-shake-vertical animation-delay-1200 opacity-70 left-[83%] top-80'></div>
          <div className='absolute rounded-full w-8 h-8 bg-YELLOW animate-shake-vertical animation-delay-800 opacity-70 left-[89%] top-96'></div>
          <div className='absolute rounded-full w-14 h-14 bg-BLUE animate-shake-vertical animation-delay-400 opacity-70 left-[98%] top-56'></div>
        </div>
        <div className='flex flex-col lg:flex-row justify-center gap-8 lg:gap-0 lg:justify-around overflow-hidden'>
          <h1 className='text-BLACK dark:text-WHITE text-5xl uppercase tracking-[0.2em] font-semibold first-letter:text-RED px-32 pt-36 ml-36'>
            Contact
          </h1>
          <div className='grow'>
            <Image
              src='/images/bg_contact.jpeg'
              width={1500}
              height={1001}
              alt='University of Glasgow'
              className='w-screen bg-clip-content object-cover h-[330px] rounded-bl-3xl opacity-50'
            />
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
    });

    const captchaInstance = useRef<TurnstileInstance>(null);
    const captchaRef = useRef<HTMLDivElement>(null);
    const msgRef = useRef<HTMLDivElement>(null);

    const handleCaptchaSuccess = async (token: string) => {
      try {
        const response = await fetch(
          `https://ict11.ce.kmitl.ac.th/dulapahv/verify/validate-captcha?token=${token}`,
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
              <p>{t('Invalid token. Click here to try again')}</p>
              <button
                className='btn bg-neutral-300'
                onClick={() => {
                  captchaInstance.current!.render();
                  setCaptchaStatus('');
                }}
              >
                {t('Try again')}
              </button>
            </div>
          );
        case 'success':
          setTimeout(() => {
            captchaInstance.current!.remove();
            captchaRef.current!.classList.add('hidden');
            msgRef.current!.classList.toggle('hidden');
          }, 1200);
          break;
        case 'other':
          captchaInstance.current!.remove();
          return (
            <div className='text-BLACK dark:text-WHITE text-lg font-medium flex flex-col gap-4 items-center'>
              <p>{t('Something went wrong, please try again later')}</p>
              {otherErrorMsg && <p>({otherErrorMsg})</p>}
              <button
                className='btn bg-neutral-300'
                onClick={() => {
                  captchaInstance.current!.render();
                  setCaptchaStatus('');
                }}
              >
                {t('Try again')}
              </button>
            </div>
          );
        default:
          return (
            <div className='text-BLACK dark:text-WHITE text-lg font-medium flex flex-col gap-4 items-center'>
              <p>{t('Checking that you are not a robot...')}</p>
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
            <div className='flex gap-4'>
              <div className='card w-96 bg-[#c5231c] shadow-xl animate-slide-in-fwd-bottom'>
                <div className='card-body text-WHITE'>
                  <h2 className='card-title'>Email</h2>
                  <p>{msg.email.label}</p>
                  <div className='card-actions justify-end'>
                    <a
                      href={msg.email.link}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <button className='btn bg-WHITE border-none text-BLACK'>
                        {t('Contact')}
                      </button>
                    </a>
                  </div>
                </div>
              </div>
              <div className='card w-96 bg-[#6062f0] shadow-xl animate-slide-in-fwd-bottom animation-delay-100'>
                <div className='card-body text-WHITE'>
                  <h2 className='card-title'>
                    Discord
                    <div className='badge badge-warning'>{t('Preferred')}</div>
                  </h2>
                  <p>{msg.discord.label}</p>
                  <div className='card-actions justify-end'>
                    <a
                      href={msg.discord.link}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <button className='btn bg-WHITE border-none text-BLACK'>
                        {t('Contact')}
                      </button>
                    </a>
                  </div>
                </div>
              </div>
              <div className='card w-96 bg-[#3474f0] shadow-xl animate-slide-in-fwd-bottom animation-delay-200'>
                <div className='card-body text-WHITE'>
                  <h2 className='card-title'>Facebook</h2>
                  <p>{msg.facebook.label}</p>
                  <div className='card-actions justify-end'>
                    <a
                      href={msg.facebook.link}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <button className='btn bg-WHITE border-none text-BLACK'>
                        {t('Contact')}
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

export default Contact;
