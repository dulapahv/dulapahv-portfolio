import { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';

import { MdDarkMode, MdLightMode } from 'react-icons/md';

interface Props {
  forceWhite?: boolean;
}

const ThemeSwitch = (props: Props) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  return (
    <>
      <button
        className='btn absolute bottom-48 right-16 sm:bottom-[196px] sm:right-[64px] bg-YELLOW hover:bg-YELLOW w-20 h-20 sm:w-[88px] sm:h-[88px] rotate-45 hover:ring-offset-[3px] hover:ring-offset-black/60 hover:ring-2 ring-YELLOW-300 active:!rotate-45 text-WHITE animate-none active:scale-95'
        onClick={() => {
          setTheme(
            theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark'
          );
        }}
      >
        <div className='-rotate-45 w-fit flex flex-col items-center'>
          <div className='flex flex-row gap-2 justify-center'>
            {mounted && (theme === 'dark' || resolvedTheme === 'dark') ? (
              <MdDarkMode className='w-8 h-auto my-1' />
            ) : (
              <MdLightMode className='w-8 h-auto my-1' />
            )}
          </div>
          <p className='capitalize'>Theme</p>
        </div>
      </button>
    </>
  );
};

export default ThemeSwitch;
