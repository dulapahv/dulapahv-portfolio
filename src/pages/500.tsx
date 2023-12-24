import React from 'react';

import { LuServerOff } from 'react-icons/lu';

const Error500 = () => {
  return (
    <div className="relative">
      <div className="flex h-screen flex-col items-center justify-center gap-y-8 p-4 sm:p-12">
        <LuServerOff className="h-24 w-24 sm:h-32 sm:w-32" />
        <h1 className="text-center text-3xl font-bold text-RED sm:text-4xl">
          500 - Internal Server Error
        </h1>
        <p className="text-center text-lg">
          Sorry, there is an internal server error. Please refresh this page or
          try again later.
        </p>
      </div>
    </div>
  );
};

export default Error500;
