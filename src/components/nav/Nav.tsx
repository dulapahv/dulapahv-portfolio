import { useRef, useState } from 'react';

import { Tooltip } from '@nextui-org/react';
import { RiSparkling2Fill, RiSparkling2Line } from 'react-icons/ri';

import { NavMenu, NavMenuRef } from '.';

interface NavProps {
  sectionRef: {
    education: React.RefObject<HTMLDivElement>;
    experience: React.RefObject<HTMLDivElement>;
    skill: React.RefObject<HTMLDivElement>;
    project: React.RefObject<HTMLDivElement>;
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
          className={`btn relative z-[2147483647] size-28 bg-BLUE hover:bg-BLUE active:!translate-x-1 active:!translate-y-1 sm:h-32 sm:w-32 ${
            isIconFilled ? 'text-YELLOW' : 'text-WHITE'
          } rounded-none drop-shadow-lg [clip-path:polygon(100%_0,_0_100%,_100%_100%)] hover:text-YELLOW`}
          onClick={() => {
            isNavOpen ? handleCloseNav() : handleOpenNav();
          }}
          aria-label="Open Navigation"
        >
          {isIconFilled ? (
            <RiSparkling2Fill className="relative left-6 top-6 size-10 animate-scale-up-center" />
          ) : (
            <RiSparkling2Line className="relative left-6 top-6 size-10 animate-scale-up-center" />
          )}
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
          ></div>
        </>
      )}
    </nav>
  );
};

export default Nav;
