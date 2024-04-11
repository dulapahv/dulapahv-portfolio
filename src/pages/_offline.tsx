import { Button } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { IoCloudOfflineOutline } from 'react-icons/io5';
import { TbReload } from 'react-icons/tb';

const ErrorOffline = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-y-8 p-4 sm:p-12">
      <IoCloudOfflineOutline className="size-24 sm:size-32" />
      <h1 className="text-center text-3xl font-bold text-RED sm:text-4xl">
        No Internet Connection
      </h1>
      <p className="text-center text-lg">
        Sorry, you are not connected to the internet. Please check your internet
        connection and try again.
      </p>
      <Button
        onPress={() => router.reload()}
        className="mt-2 border-1.5 border-b-PURPLE border-l-RED border-r-BLUE border-t-YELLOW bg-transparent text-BLACK ring-BLUE ring-offset-2 hover:border-transparent hover:bg-BLUE hover:!text-white hover:ring-[1.5px] dark:text-WHITE dark:ring-offset-neutral-700"
        radius="sm"
        startContent={<TbReload className="text-xl" />}
      >
        Try Again
      </Button>
    </div>
  );
};

export default ErrorOffline;
