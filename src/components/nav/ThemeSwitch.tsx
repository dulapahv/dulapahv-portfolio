import { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';

import { MdDarkMode, MdLightMode } from 'react-icons/md';

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  return (
    <>
      <button
        className="btn absolute bottom-[172px] right-[50px] size-20 rotate-45 animate-none bg-YELLOW text-WHITE ring-YELLOW-300 hover:bg-YELLOW hover:ring-2 hover:ring-offset-[3px] hover:ring-offset-black/60 active:!rotate-45 active:scale-95 sm:bottom-[196px] sm:right-16 sm:size-[88px]"
        onClick={() =>
          setTheme(
            theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark'
          )
        }
      >
        <div>
          {mounted && (theme === 'dark' || resolvedTheme === 'dark') ? (
            <MdDarkMode className="my-1 h-auto w-8 animate-scale-up-center-fast" />
          ) : (
            <MdLightMode className="my-1 h-auto w-8 animate-scale-up-center-fast" />
          )}
          <p className="capitalize">Theme</p>
        </div>
      </button>
    </>
  );
};

export default ThemeSwitch;
