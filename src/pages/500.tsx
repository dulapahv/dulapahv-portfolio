import { useEffect } from 'react';

import { useRouter } from 'next/router';
import { TbReload } from 'react-icons/tb';
import { LuServerOff } from 'react-icons/lu';

const Error500 = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.pathname === '/500') {
      router.replace('/');
    }
  }, [router]);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-y-8 p-4 sm:p-12">
      <LuServerOff className="size-24 sm:size-32" />
      <h1 className="text-center text-3xl font-bold text-RED sm:text-4xl">
        500 - Internal Server Error
      </h1>
      <p className="text-center text-lg">
        Sorry, there is an internal server error. Please refresh this page or
        try again later.
      </p>
      <button
        className="btn border-1.5 border-b-PURPLE border-l-RED border-r-BLUE border-t-YELLOW bg-transparent text-BLACK ring-BLUE ring-offset-2 hover:border-transparent hover:bg-BLUE hover:ring-[1.5px] dark:text-WHITE dark:ring-offset-neutral-700"
        onClick={() => router.reload()}
      >
        <TbReload className="text-xl" />
        Try Again
      </button>
    </div>
  );
};

export default Error500;
