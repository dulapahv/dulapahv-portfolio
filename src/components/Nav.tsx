import React, { useState } from 'react';

import { useTranslation } from 'next-i18next';

import { CgProfile } from 'react-icons/cg';
import { LiaAtomSolid } from 'react-icons/lia';
import { BiSolidContact } from 'react-icons/bi';
import { RiSparkling2Fill, RiSparkling2Line } from 'react-icons/ri';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import router from 'next/router';

import ThemeSwitch from './ThemeSwitch';

const Nav = () => {
  const { t, i18n } = useTranslation();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const NavMenu = () => {
    return (
      <div className='z-50'>
        <div className='animate-fade-in'>
          <button className='btn absolute bottom-24 right-8 sm:right-[28px] bg-PURPLE hover:bg-PURPLE w-20 h-20 sm:w-[88px] sm:h-[88px] rotate-45 hover:ring-offset-[3px] hover:ring-offset-black/50 hover:ring-2 ring-PURPLE-300 active:!rotate-45 text-WHITE animate-none active:scale-95'>
            <div className='-rotate-45 w-fit flex flex-col items-center'>
              <CgProfile className='w-8 h-auto my-1' />
              <p className='capitalize'>{t('Profile')}</p>
            </div>
          </button>
        </div>
        <div className='animate-fade-in animation-delay-100'>
          <button
            className='btn absolute bottom-8 right-24 sm:bottom-7 sm:right-[96px] bg-YELLOW hover:bg-YELLOW w-20 h-20 sm:w-[88px] sm:h-[88px] rotate-45 hover:ring-offset-[3px] hover:ring-offset-black/50 hover:ring-2 ring-YELLOW-300 active:!rotate-45 text-WHITE animate-none active:scale-95'
            onClick={() => {
              router.replace(router.asPath, router.asPath, {
                locale: i18n.language === 'en' ? 'th' : 'en',
              });
            }}
          >
            <div className='-rotate-45 w-fit flex flex-col items-center'>
              <h1 className='text-2xl font-bold'>
                {i18n.language === 'en' ? 'ENG' : 'ไทย'}
              </h1>
              <p className='capitalize'>TH/EN</p>
            </div>
          </button>
        </div>
        <div className='animate-fade-in animation-delay-200'>
          <ThemeSwitch />
        </div>
        <div className='animate-fade-in animation-delay-300'>
          <button className='btn absolute bottom-32 right-32 sm:bottom-[128px] sm:right-[132px] bg-RED hover:bg-RED w-20 h-20 sm:w-[88px] sm:h-[88px] rotate-45 hover:ring-offset-[3px] hover:ring-offset-black/50 hover:ring-2 ring-RED-300 active:!rotate-45 text-WHITE animate-none active:scale-95'>
            <div className='-rotate-45 w-fit flex flex-col items-center'>
              <LiaAtomSolid className='w-8 h-auto' />
              <p className='capitalize'>{t('Experience')}</p>
            </div>
          </button>
        </div>
        <div className='animate-fade-in animation-delay-400'>
          <button className='btn absolute bottom-16 right-48 sm:bottom-[60px] sm:right-[200px] bg-BLUE hover:bg-BLUE w-20 h-20 sm:w-[88px] sm:h-[88px] rotate-45 hover:ring-offset-[3px] hover:ring-offset-black/50 hover:ring-2 ring-BLUE-300 active:!rotate-45 text-WHITE animate-none active:scale-95'>
            <div className='-rotate-45 w-fit flex flex-col items-center'>
              <BiSolidContact className='w-8 h-auto my-1' />
              <p className='capitalize'>{t('Contact')}</p>
            </div>
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <button
        className={`btn absolute bottom-0 right-0 w-32 h-32 bg-BLUE hover:bg-BLUE active:!translate-x-1 active:!translate-y-1 z-50 ${
          isNavOpen ? 'text-YELLOW' : 'text-WHITE'
        } hover:text-YELLOW [clip-path:polygon(100%_0,_0_100%,_100%_100%)] rounded-none`}
        onClick={() => setIsNavOpen(!isNavOpen)}
      >
        {isNavOpen ? (
          <RiSparkling2Fill className='relative left-6 top-6 w-10 h-auto' />
        ) : (
          <RiSparkling2Line className='relative left-6 top-6 w-10 h-auto' />
        )}
      </button>
      {isNavOpen && (
        <>
          <NavMenu />
          <div
            className='fixed top-0 left-0 w-screen h-screen bg-black/50 dark:bg-black/30 animate-fade-in'
            onClick={() => setIsNavOpen(!isNavOpen)}
          ></div>
        </>
      )}
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

export default Nav;
