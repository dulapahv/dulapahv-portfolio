import { forwardRef, RefObject, useImperativeHandle, useRef } from 'react';

import { FaLightbulb } from 'react-icons/fa';
import { LiaAtomSolid } from 'react-icons/lia';
import { MdSchool, MdWork } from 'react-icons/md';

import { ThemeSwitch } from '.';

export interface NavMenuRef {
  closeNavMenu: () => void;
}

interface NavMenuProps {
  callback: () => void;
  sectionRef: {
    education: RefObject<HTMLDivElement>;
    experience: RefObject<HTMLDivElement>;
    skill: RefObject<HTMLDivElement>;
    project: RefObject<HTMLDivElement>;
  };
}

const NavMenu = forwardRef<NavMenuRef, NavMenuProps>(
  ({ callback: closeNav, sectionRef }, ref) => {
    const navItemRef1 = useRef<HTMLLIElement>(null);
    const navItemRef2 = useRef<HTMLLIElement>(null);
    const navItemRef3 = useRef<HTMLLIElement>(null);
    const navItemRef4 = useRef<HTMLLIElement>(null);
    const navItemRef5 = useRef<HTMLLIElement>(null);

    const handleCloseNavMenu = () => {
      navItemRef1.current!.classList.add('animate-fade-out');
      navItemRef2.current!.classList.add('animate-fade-out');
      navItemRef3.current!.classList.add('animate-fade-out');
      navItemRef4.current!.classList.add('animate-fade-out');
      navItemRef5.current!.classList.add('animate-fade-out');
    };

    useImperativeHandle(ref, () => ({
      closeNavMenu: () => handleCloseNavMenu(),
    }));

    return (
      <ul className="relative z-[2147483647] [&>li>button>div]:flex [&>li>button>div]:w-fit [&>li>button>div]:-rotate-45 [&>li>button>div]:flex-col [&>li>button>div]:items-center">
        <li className="animate-fade-in" ref={navItemRef1}>
          <button
            className="btn absolute bottom-20 right-5 size-20 rotate-45 animate-none bg-PURPLE text-WHITE ring-PURPLE-300 hover:bg-PURPLE hover:ring-2 hover:ring-offset-[3px] hover:ring-offset-black/60 active:!rotate-45 active:scale-95 sm:bottom-24 sm:right-7 sm:size-[88px]"
            onClick={() => {
              closeNav();
              sectionRef.education.current!.scrollIntoView();
            }}
          >
            <div>
              <MdSchool className="my-1 size-8" />
              <p className="capitalize">Education</p>
            </div>
          </button>
        </li>
        <li className="animate-fade-in animation-delay-75" ref={navItemRef2}>
          <button
            className="btn absolute bottom-5 right-20 size-20 rotate-45 animate-none bg-RED text-WHITE ring-RED-300 hover:bg-RED hover:ring-2 hover:ring-offset-[3px] hover:ring-offset-black/60 active:!rotate-45 active:scale-95 sm:bottom-7 sm:right-24 sm:size-[88px]"
            onClick={() => {
              closeNav();
              sectionRef.experience.current!.scrollIntoView();
            }}
          >
            <div>
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
            className="btn absolute bottom-28 right-[110px] size-20 rotate-45 animate-none bg-BLUE text-WHITE ring-BLUE-300 hover:bg-BLUE hover:ring-2 hover:ring-offset-[3px] hover:ring-offset-black/60 active:!rotate-45 active:scale-95 sm:bottom-32 sm:right-[132px] sm:size-[88px]"
            onClick={() => {
              closeNav();
              sectionRef.skill.current!.scrollIntoView();
            }}
          >
            <div>
              <LiaAtomSolid className="my-1 size-8" />
              <p className="capitalize">Skill</p>
            </div>
          </button>
        </li>
        <li className="animate-fade-in animation-delay-200" ref={navItemRef5}>
          <button
            className="btn absolute bottom-[52px] right-[170px] size-20 rotate-45 animate-none bg-YELLOW text-WHITE ring-YELLOW-300 hover:bg-YELLOW hover:ring-2 hover:ring-offset-[3px] hover:ring-offset-black/60 active:!rotate-45 active:scale-95 sm:bottom-[60px] sm:right-[200px] sm:size-[88px]"
            onClick={() => {
              closeNav();
              sectionRef.project.current!.scrollIntoView();
            }}
          >
            <div>
              <FaLightbulb className="my-1 size-8" />
              <p className="capitalize">Project</p>
            </div>
          </button>
        </li>
      </ul>
    );
  }
);

NavMenu.displayName = 'NavMenu';

export default NavMenu;
