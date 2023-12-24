import React, { useLayoutEffect } from 'react';

import { useRouter } from 'next/router';
import { LuServerOff } from 'react-icons/lu';

const Error500 = () => {
  const router = useRouter();

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname === '/500') {
        router.replace('/');
      }
    }
  });

  return (
    <div className="relative">
      <div className="flex h-screen flex-col items-center justify-center gap-y-8 p-4 sm:p-12">
        <LuServerOff className="size-24 sm:size-32" />
        <h1 className="text-center text-3xl font-bold text-RED selection:bg-fuchsia-300 selection:text-fuchsia-900 sm:text-4xl">
          500 - Internal Server Error
        </h1>
        <p className="text-center text-lg selection:bg-fuchsia-300 selection:text-fuchsia-900">
          Sorry, there is an internal server error. Please refresh this page or
          try again later.
        </p>
      </div>
    </div>
  );
};

export default Error500;
