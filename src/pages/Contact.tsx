import React, { useRef, useState } from 'react';

import { useTheme } from 'next-themes';
import { useTranslation } from 'next-i18next';

import Image from 'next/image';
import { Turnstile } from '@marsidev/react-turnstile';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Contact = () => {
  const { t } = useTranslation();
  const { theme, setTheme, resolvedTheme } = useTheme();

  const Header = () => {
    return (
      <div className='flex flex-col animate-fade-in overflow-x-hidden pb-28'>
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

  const Content = () => {
    const [status, setStatus] = useState('');
    const turnstileRef = useRef<HTMLDivElement>(null);

    const handleSuccess = async (token: string) => {
      console.log(token);
      try {
        const response = await fetch(
          'http://ict11.ce.kmitl.ac.th/dulapahv/verify/validate-captcha',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }), // Use object shorthand syntax
          }
        );
        const result = await response.json();
        if (result.success) {
          // Perform any actions you want after successful validation
          console.log('Validation successful');
        } else {
          // Handle validation failure
          console.log('Validation failed');
        }
      } catch (error) {
        // Handle error
        console.error('Error:', error);
      }
    };

    return (
      <div className='h-screen relative'>
        <div className='flex flex-col items-center gap-4' ref={turnstileRef}>
          <h2 className='text-BLACK dark:text-WHITE text-lg'>
            {status === 'expired'
              ? 'Your session has expired. Please refresh the page and try again.'
              : status === 'error'
              ? 'There was an error. Please refresh the page and try again.'
              : 'Checking your browser, please wait...'}
          </h2>
          <Turnstile
            siteKey='1x00000000000000000000AA' // 0x4AAAAAAACYFWWcTzhCNWz4
            onError={() => setStatus('error')}
            onExpire={() => setStatus('expired')}
            onSuccess={handleSuccess}
            options={{
              theme: resolvedTheme === 'dark' ? 'dark' : 'light',
            }}
          />
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
