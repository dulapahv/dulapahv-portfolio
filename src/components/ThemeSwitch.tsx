import { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';

import { MdDarkMode, MdLightMode } from 'react-icons/md';

interface Props {
  forceWhite?: boolean;
}

const ThemeSwitch = (props: Props) => {
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  return (
    <>
      <button
        className="btn absolute bottom-[172px] right-[50px] h-20 w-20 rotate-45 animate-none bg-YELLOW text-WHITE ring-YELLOW-300 hover:bg-YELLOW hover:ring-2 hover:ring-offset-[3px] hover:ring-offset-black/60 active:!rotate-45 active:scale-95 sm:bottom-[196px] sm:right-[64px] sm:h-[88px] sm:w-[88px]"
        onClick={() => {
          setTheme(
            theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark'
          );
        }}
      >
        <div className="flex w-fit -rotate-45 flex-col items-center">
          <div className="flex flex-row justify-center gap-2">
            {mounted && (theme === 'dark' || resolvedTheme === 'dark') ? (
              <MdDarkMode className="my-1 h-auto w-8" />
            ) : (
              <MdLightMode className="my-1 h-auto w-8" />
            )}
          </div>
          <p className="capitalize">Theme</p>
        </div>
      </button>
    </>
  );
};

export default ThemeSwitch;
