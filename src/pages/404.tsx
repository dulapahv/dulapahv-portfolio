import { useEffect } from 'react';

import { useRouter } from 'next/router';
import { LuUnlink } from 'react-icons/lu';
import { TiHome } from 'react-icons/ti';

const Error404 = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.pathname === '/404') {
      router.replace('/');
    }
  }, [router]);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-y-8 p-4 sm:p-12">
      <LuUnlink className="size-24 sm:size-32" />
      <h1 className="text-center text-3xl font-bold text-RED sm:text-4xl">
        404 - Page Not Found
      </h1>
      <p className="text-center text-lg">
        Sorry, the page you are looking for does not exist. Please check the URL
        and try again.
      </p>
      <a href="https://dulapahv.dev/" rel="noopener noreferrer">
        <button className="btn border-1.5 border-b-PURPLE border-l-RED border-r-BLUE border-t-YELLOW bg-transparent text-BLACK ring-BLUE ring-offset-2 hover:border-transparent hover:bg-BLUE hover:ring-[1.5px] dark:text-WHITE dark:ring-offset-neutral-700">
          <TiHome className="text-xl" />
          Go to Homepage
        </button>
      </a>
    </div>
  );
};

export default Error404;
