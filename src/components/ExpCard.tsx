import React from 'react';

import Image from 'next/image';

interface ExpCardProps {
  title: string;
  location: string;
  date: string;
  position: string;
  tech: string;
  detail: string[];
}

const ExpCard = ({
  title,
  location,
  date,
  position,
  tech,
  detail,
}: ExpCardProps) => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-neutral-700 rounded-md shadow'>
      <div className='m-4  order-2 lg:order-1'>
        <h1 className='text-BLACK dark:text-WHITE font-bold'>{title}</h1>
        <h2 className='text-BLACK dark:text-WHITE font-light'>
          {location} | {date}
        </h2>
        <h3 className='text-BLACK dark:text-WHITE'>
          <span className='italic'>{position}</span> |{' '}
          <span className='font-semibold'>{tech} </span>
        </h3>
        <ul className='list-disc list-outside ml-5'>
          {detail?.map((item, index) => (
            <li key={index} className='text-BLACK dark:text-WHITE'>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className='order-1 lg:order-2'>
        <Image
          src='/images/uofg_campus.png'
          alt='KMITL'
          width={1915}
          height={632}
          className='rounded-r-md w-full h-full object-cover'
        />
      </div>
    </div>
  );
};

export default ExpCard;
