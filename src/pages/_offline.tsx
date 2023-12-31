import { useEffect } from 'react';

import { useRouter } from 'next/router';
import { IoCloudOfflineOutline } from 'react-icons/io5';

const _offline = () => {
  const router = useRouter();

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.location.pathname === '/_offline'
    ) {
      router.replace('/');
    }
  }, [router]);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-y-8 p-4 sm:p-12">
      <IoCloudOfflineOutline className="size-24 sm:size-32" />
      <h1 className="text-center text-3xl font-bold text-RED sm:text-4xl">
        No Internet Connection
      </h1>
      <p className="text-center text-lg">
        Sorry, you are not connected to the internet. Please check your
        connection and try again.
      </p>
    </div>
  );
};

export default _offline;
