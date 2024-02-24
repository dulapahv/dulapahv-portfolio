import { RefObject, useRef, useState } from 'react';

import { Tooltip } from '@nextui-org/react';
import { RiSparkling2Fill, RiSparkling2Line } from 'react-icons/ri';

import { NavMenu, NavMenuRef } from '.';

interface NavProps {
  sectionRef: {
    education: RefObject<HTMLDivElement>;
    experience: RefObject<HTMLDivElement>;
    skill: RefObject<HTMLDivElement>;
    project: RefObject<HTMLDivElement>;
  };
}

const Nav = ({ sectionRef }: NavProps) => {
  const navBackdropRef = useRef<HTMLDivElement>(null);
  const navMenuRef = useRef<NavMenuRef>(null);

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isIconFilled, setIsIconFilled] = useState(false);

  const handleOpenNav = () => {
    setIsNavOpen(true);
    setIsIconFilled(true);
  };

  const handleCloseNav = () => {
    navMenuRef.current!.closeNavMenu();
    navBackdropRef.current!.classList.add('animate-fade-out');
    setIsIconFilled(false);
    setTimeout(() => {
      setIsNavOpen(false);
    }, 375);
  };

  return (
    <nav className="fixed bottom-0 right-0 z-[2147483647]">
      <Tooltip
        content="Open Navigation"
        delay={400}
        closeDelay={75}
        placement="left-end"
      >
        <button
          className={`btn relative z-[2147483647] size-28 rounded-none bg-BLUE drop-shadow-lg duration-200 [clip-path:polygon(100%_0,_0_100%,_100%_100%)] *:relative *:left-6 *:top-6 *:size-10 *:animate-scale-up-center hover:bg-BLUE hover:text-YELLOW active:!translate-x-1 active:!translate-y-1 sm:size-32 ${
            isIconFilled ? 'text-YELLOW' : 'text-WHITE'
          }`}
          onClick={() => (isNavOpen ? handleCloseNav() : handleOpenNav())}
          aria-label="Toggle Navigation Menu"
        >
          {isIconFilled ? <RiSparkling2Fill /> : <RiSparkling2Line />}
        </button>
      </Tooltip>
      {isNavOpen && (
        <>
          <NavMenu
            callback={handleCloseNav}
            ref={navMenuRef}
            sectionRef={sectionRef}
          />
          <div
            className="fixed left-0 top-0 z-[2147483646] h-screen w-screen animate-fade-in bg-black/30"
            onClick={handleCloseNav}
            ref={navBackdropRef}
          />
        </>
      )}
    </nav>
  );
};

export default Nav;
