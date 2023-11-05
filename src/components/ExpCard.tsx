import React from 'react';

import Image from 'next/image';
import { TbMinusVertical } from 'react-icons/tb';

interface ExpCardProps {
  title: string;
  location: string;
  date: string;
  position: string;
  tech: string;
  detail: string[];
  reversed?: boolean;
}

const ExpCard = ({
  title,
  location,
  date,
  position,
  tech,
  detail,
  reversed: isReversed = false,
}: ExpCardProps) => {
  return (
    <>
      <div className='w-screen relative'>
        <div
          className={`absolute rounded-full w-4 h-4 bg-PURPLE animate-shake-vertical animation-delay-1200 opacity-70 ${
            isReversed ? 'left-[96%]' : 'left-[3%]'
          } top-[13rem]`}
        ></div>
        <div
          className={`absolute rounded-full w-8 h-8 bg-RED animate-shake-vertical opacity-70 ${
            isReversed ? 'left-[93.5%]' : 'left-[5%]'
          } top-[19rem]`}
        ></div>
        <div
          className={`absolute rounded-full w-14 h-14 bg-BLUE animate-shake-vertical animation-delay-400 opacity-70 ${
            isReversed ? 'left-[95%]' : 'left-[2%]'
          } top-[25rem]`}
        ></div>
        <div
          className={`absolute rounded-full w-10 h-10 bg-YELLOW animate-shake-vertical animation-delay-800 opacity-70 ${
            isReversed ? 'left-[90%]' : 'left-[8%]'
          } top-[30rem]`}
        ></div>
      </div>
      <div className='flex flex-col lg:flex-row rounded-md px-4 sm:px-8 md:px-16 lg:px-24 h-full min-h-[28rem] z-10'>
        <div
          className={`mt-3 lg:mt-0 mx-0 lg:mx-4 lg:w-1/2 ${
            isReversed ? 'order-2' : 'order-2 lg:order-1'
          }`}
        >
          <h1 className='text-WHITE bg-RED font-bold text-lg py-1 px-2'>
            {title}
          </h1>
          <h2 className='text-YELLOW-800 dark:text-YELLOW font-light flex flex-wrap items-center'>
            {location}{' '}
            <TbMinusVertical className='text-BLACK dark:text-WHITE' /> {date}
          </h2>
          <h3 className='text-BLACK dark:text-WHITE flex flex-wrap items-center'>
            <span className='italic bg-gradient-to-r from-BLUE from-10% via-PURPLE via-30% to-RED bg-clip-text text-transparent font-semibold'>
              {position}
            </span>
            <TbMinusVertical />
            <span className='text-BLACK dark:text-WHITE'>{tech} </span>
          </h3>
          <div className='w-14 h-[2px] bg-gradient-to-r from-RED to-RED-400 flex flex-col mt-4 mb-7'></div>
          <ul className='list-disc list-outside ml-5'>
            {detail?.map((item, index) => (
              <li
                key={index}
                className='text-BLACK dark:text-WHITE text-justify'
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div
          className={`lg:w-1/2 ${
            isReversed ? 'order-1' : 'order-1 lg:order-2'
          } relative cursor-pointer after:content-["View_more_images"] after:pt-2 after:pl-4 after:bottom-0 after:bg-BLACK/70 after:w-full after:h-10 after:absolute after:text-WHITE after:pointer-events-none`}
          onClick={() => {
            const modal = document.getElementById(
              'projectModal'
            ) as HTMLDialogElement;
            modal?.showModal();
          }}
        >
          <Image
            src='/images/uofg_campus.png'
            alt='KMITL'
            width={1915}
            height={632}
            className={`${
              isReversed ? 'rounded-br-3xl' : 'rounded-bl-3xl'
            } w-full h-80 lg:h-full object-cover lg:shadow-xl`}
          />
          {isReversed ? (
            <div className='absolute bg-BLUE w-screen h-36 -bottom-16 right-32 opacity-50 animate-clip-in-left -z-10'></div>
          ) : (
            <div className='absolute bg-BLUE w-screen h-36 -bottom-16 left-32 opacity-50 animate-clip-in-right -z-10'></div>
          )}
        </div>
      </div>
    </>
  );
};

export default ExpCard;
