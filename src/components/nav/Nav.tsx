import { useRef, useState } from 'react';

import { MdWork } from 'react-icons/md';
import { MdSchool } from 'react-icons/md';
import { Tooltip } from '@nextui-org/react';
import { FaLightbulb } from 'react-icons/fa';
import { LiaAtomSolid } from 'react-icons/lia';
import { RiSparkling2Fill, RiSparkling2Line } from 'react-icons/ri';

import { ThemeSwitch } from '.';

const Nav = () => {
  const navItemRef1 = useRef<HTMLLIElement>(null);
  const navItemRef2 = useRef<HTMLLIElement>(null);
  const navItemRef3 = useRef<HTMLLIElement>(null);
  const navItemRef4 = useRef<HTMLLIElement>(null);
  const navItemRef5 = useRef<HTMLLIElement>(null);
  const navBackdropRef = useRef<HTMLDivElement>(null);

  const [isNavOpen, setIsNavOpen] = useState(false);

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
      <ul className="relative z-[2147483647]">
        <li className="animate-fade-in" ref={navItemRef1}>
          <button
            className="btn absolute bottom-[80px] right-[20px] size-20 rotate-45 animate-none bg-PURPLE text-WHITE ring-PURPLE-300 hover:bg-PURPLE hover:ring-2 hover:ring-offset-[3px] hover:ring-offset-black/60 active:!rotate-45 active:scale-95 sm:bottom-[96px] sm:right-[28px] sm:h-[88px] sm:w-[88px]"
            onClick={() => {
              handleCloseNav();
              const section = document.getElementById('education');
              section?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className="flex w-fit -rotate-45 flex-col items-center">
              <MdSchool className="my-1 size-8" />
              <p className="capitalize">Education</p>
            </div>
          </button>
        </li>
        <li className="animate-fade-in animation-delay-75" ref={navItemRef2}>
          <button
            className="btn absolute bottom-[20px] right-[80px] size-20 rotate-45 animate-none bg-RED text-WHITE ring-RED-300 hover:bg-RED hover:ring-2 hover:ring-offset-[3px] hover:ring-offset-black/60 active:!rotate-45 active:scale-95 sm:bottom-[28px] sm:right-[96px] sm:h-[88px] sm:w-[88px]"
            onClick={() => {
              handleCloseNav();
              const section = document.getElementById('experience');
              section?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className="flex w-fit -rotate-45 flex-col items-center">
              <MdWork className="size-8" />
              <p className="capitalize">Experience</p>
            </div>
          </button>
        </li>
        <li className="animate-fade-in animation-delay-100" ref={navItemRef3}>
          <ThemeSwitch />
        </li>
        <li className="animate-fade-in animation-delay-150" ref={navItemRef4}>
          <button
            className="btn absolute bottom-[112px] right-[110px] size-20 rotate-45 animate-none bg-BLUE text-WHITE ring-BLUE-300 hover:bg-BLUE hover:ring-2 hover:ring-offset-[3px] hover:ring-offset-black/60 active:!rotate-45 active:scale-95 sm:bottom-[128px] sm:right-[132px] sm:h-[88px] sm:w-[88px]"
            onClick={() => {
              handleCloseNav();
              const section = document.getElementById('skill');
              section?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className="flex w-fit -rotate-45 flex-col items-center">
              <LiaAtomSolid className="my-1 size-8" />
              <p className="capitalize">Skill</p>
            </div>
          </button>
        </li>
        <li className="animate-fade-in animation-delay-200" ref={navItemRef5}>
          <button
            className="btn absolute bottom-[52px] right-[170px] size-20 rotate-45 animate-none bg-YELLOW text-WHITE ring-YELLOW-300 hover:bg-YELLOW hover:ring-2 hover:ring-offset-[3px] hover:ring-offset-black/60 active:!rotate-45 active:scale-95 sm:bottom-[60px] sm:right-[200px] sm:h-[88px] sm:w-[88px]"
            onClick={() => {
              handleCloseNav();
              const section = document.getElementById('project');
              section?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className="flex w-fit -rotate-45 flex-col items-center">
              <FaLightbulb className="my-1 size-8" />
              <p className="capitalize">Project</p>
            </div>
          </button>
        </li>
      </ul>
    );
  };

  return (
    <nav>
      <Tooltip
        content="Open Navigation"
        delay={400}
        closeDelay={75}
        placement="left-end"
        classNames={{
          content: 'selection:bg-fuchsia-300 selection:text-fuchsia-900',
        }}
      >
        <button
          className={`btn relative z-[2147483647] size-28 bg-BLUE hover:bg-BLUE active:!translate-x-1 active:!translate-y-1 sm:h-32 sm:w-32 ${
            isNavOpen ? 'text-YELLOW' : 'text-WHITE'
          } rounded-none drop-shadow-lg [clip-path:polygon(100%_0,_0_100%,_100%_100%)] hover:text-YELLOW`}
          onClick={() => {
            isNavOpen ? handleCloseNav() : setIsNavOpen(true);
          }}
          aria-label="Open Navigation"
        >
          {isNavOpen ? (
            <RiSparkling2Fill className="relative left-6 top-6 size-10 animate-scale-up-center" />
          ) : (
            <RiSparkling2Line className="relative left-6 top-6 size-10 animate-scale-up-center" />
          )}
        </button>
      </Tooltip>
      {isNavOpen && (
        <>
          <NavMenu />
          <div
            className="fixed left-0 top-0 z-[2147483646] h-screen w-screen animate-fade-in bg-black/30"
            onClick={handleCloseNav}
            ref={navBackdropRef}
          ></div>
        </>
      )}
    </nav>
  );
};

export default Nav;