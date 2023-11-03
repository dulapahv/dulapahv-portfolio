import React, { useRef, useState } from 'react';

import { CgProfile } from 'react-icons/cg';
import { LiaAtomSolid } from 'react-icons/lia';
import { BiSolidContact } from 'react-icons/bi';
import { RiSparkling2Fill, RiSparkling2Line } from 'react-icons/ri';

import ThemeSwitch from './ThemeSwitch';

const Nav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const navItemRef1 = useRef<HTMLDivElement>(null);
  const navItemRef2 = useRef<HTMLDivElement>(null);
  const navItemRef3 = useRef<HTMLDivElement>(null);
  const navItemRef4 = useRef<HTMLDivElement>(null);
  const navItemRef5 = useRef<HTMLDivElement>(null);
  const navBackdropRef = useRef<HTMLDivElement>(null);

  const handleCloseNav = () => {
    navItemRef1.current!.classList.add('animate-fade-out');
    navItemRef2.current!.classList.add('animate-fade-out');
    navItemRef3.current!.classList.add('animate-fade-out');
    navItemRef4.current!.classList.add('animate-fade-out');
    navItemRef5.current!.classList.add('animate-fade-out');
    navBackdropRef.current!.classList.add('animate-fade-out');
    setTimeout(() => {
      setIsNavOpen(false);
    }, 375);
  };

  const NavMenu = () => {
    return (
      <div className='relative z-50'>
        <div className='animate-fade-in' ref={navItemRef1}>
          <button
            className='btn absolute bottom-24 right-8 sm:right-[28px] bg-PURPLE hover:bg-PURPLE w-20 h-20 sm:w-[88px] sm:h-[88px] rotate-45 hover:ring-offset-[3px] hover:ring-offset-black/60 hover:ring-2 ring-PURPLE-300 active:!rotate-45 text-WHITE animate-none active:scale-95'
            onClick={() => {
              handleCloseNav();
              const section = document.getElementById('education');
              section?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className='-rotate-45 w-fit flex flex-col items-center'>
              <CgProfile className='w-8 h-auto my-1' />
              <p className='capitalize'>Education</p>
            </div>
          </button>
        </div>
        <div className='animate-fade-in animation-delay-75' ref={navItemRef2}>
          <button
            className='btn absolute bottom-8 right-24 sm:bottom-7 sm:right-[96px] bg-RED hover:bg-RED w-20 h-20 sm:w-[88px] sm:h-[88px] rotate-45 hover:ring-offset-[3px] hover:ring-offset-black/60 hover:ring-2 ring-RED-300 active:!rotate-45 text-WHITE animate-none active:scale-95'
            onClick={() => {
              handleCloseNav();
              const section = document.getElementById('experience');
              section?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className='-rotate-45 w-fit flex flex-col items-center'>
              <LiaAtomSolid className='w-8 h-auto' />
              <p className='capitalize'>Experience</p>
            </div>
          </button>
        </div>
        <div className='animate-fade-in animation-delay-100' ref={navItemRef3}>
          <ThemeSwitch />
        </div>
        <div className='animate-fade-in animation-delay-150' ref={navItemRef4}>
          <button
            className='btn absolute bottom-32 right-32 sm:bottom-[128px] sm:right-[132px] bg-BLUE hover:bg-BLUE w-20 h-20 sm:w-[88px] sm:h-[88px] rotate-45 hover:ring-offset-[3px] hover:ring-offset-black/60 hover:ring-2 ring-BLUE-300 active:!rotate-45 text-WHITE animate-none active:scale-95'
            onClick={() => {
              handleCloseNav();
              const section = document.getElementById('skill');
              section?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className='-rotate-45 w-fit flex flex-col items-center'>
              <CgProfile className='w-8 h-auto my-1' />
              <p className='capitalize'>Skill</p>
            </div>
          </button>
        </div>
        <div className='animate-fade-in animation-delay-200' ref={navItemRef5}>
          <button
            className='btn absolute bottom-16 right-48 sm:bottom-[60px] sm:right-[200px] bg-YELLOW hover:bg-YELLOW w-20 h-20 sm:w-[88px] sm:h-[88px] rotate-45 hover:ring-offset-[3px] hover:ring-offset-black/60 hover:ring-2 ring-YELLOW-300 active:!rotate-45 text-WHITE animate-none active:scale-95'
            onClick={() => {
              handleCloseNav();
              const section = document.getElementById('project');
              section?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className='-rotate-45 w-fit flex flex-col items-center'>
              <BiSolidContact className='w-8 h-auto my-1' />
              <p className='capitalize'>Project</p>
            </div>
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <button
        className={`btn relative w-32 h-32 bg-BLUE hover:bg-BLUE active:!translate-x-1 active:!translate-y-1 z-50 ${
          isNavOpen ? 'text-YELLOW' : 'text-WHITE'
        } hover:text-YELLOW [clip-path:polygon(100%_0,_0_100%,_100%_100%)] rounded-none drop-shadow-lg`}
        onClick={() => {
          isNavOpen ? handleCloseNav() : setIsNavOpen(true);
        }}
      >
        {isNavOpen ? (
          <RiSparkling2Fill className='relative left-6 top-6 w-10 h-auto animate-scale-up-center' />
        ) : (
          <RiSparkling2Line className='relative left-6 top-6 w-10 h-auto animate-scale-up-center' />
        )}
      </button>
      {isNavOpen && (
        <>
          <NavMenu />
          <div
            className='fixed top-0 left-0 w-screen h-screen bg-black/30 animate-fade-in z-40'
            onClick={handleCloseNav}
            ref={navBackdropRef}
          ></div>
        </>
      )}
    </>
  );
};

export default Nav;
