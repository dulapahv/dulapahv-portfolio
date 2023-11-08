import React from 'react';

import Image from 'next/image';

const Education = () => {
  return (
    <div
      className='relative flex h-fit flex-col items-center gap-8 py-8'
      id='education'
    >
      <div className='flex flex-col items-center gap-6 py-8'>
        <h1 className='text-2xl font-semibold uppercase tracking-[0.2em] text-BLACK first-letter:text-RED dark:text-WHITE min-[375px]:text-3xl sm:text-4xl'>
          Education
        </h1>
        <div className='flex h-[2px] w-14 flex-col bg-gradient-to-r from-BLUE to-BLUE-400'></div>
      </div>
      <div className='relative flex'>
        <Image
          src='/images/edu/uofg.png'
          width={1915}
          height={632}
          alt='University of Glasgow'
          className='h-[500px] w-screen bg-clip-content object-cover'
        />
        <div className='absolute top-12 rounded-br-xl bg-[#003865] p-3 text-WHITE opacity-80'>
          <h2 className='text-lg font-semibold leading-6 sm:text-xl md:text-2xl'>
            University of Glasgow
          </h2>
          <p className='text-xs'>Scotland, United Kingdom</p>
          <p className='mt-2 text-sm leading-4 sm:text-base md:text-lg'>
            BSc Honours in Software Engineering {'('}Double Degree{')'}
          </p>
          <p className='mt-1 text-sm italic leading-4 sm:mt-0 sm:text-base'>
            Specialized in Parallel and Distributed Systems
          </p>
          <p className='mt-2 text-sm sm:text-base md:text-lg'>
            Sep 2023 - May 2025
          </p>
          <p className='text-sm sm:text-base md:text-lg'>GPA: Expected 1st</p>
        </div>
      </div>
      <div className='relative flex'>
        <Image
          src='/images/edu/kmitl.png'
          width={1440}
          height={720}
          alt="King Mongkut's Institute of Technology Ladkrabang"
          className='h-[500px] w-screen bg-clip-content object-cover object-top'
        />
        <div className='absolute top-12 rounded-br-xl bg-[#e35205] p-3 text-WHITE opacity-80'>
          <h2 className='text-lg font-semibold leading-6 sm:text-xl md:text-2xl'>
            King Mongkut&apos;s Institute of Technology Ladkrabang
          </h2>
          <p className='text-xs'>Bangkok, Thailand</p>
          <p className='mt-2 text-sm leading-4 sm:text-base md:text-lg'>
            BEng in Software Engineering {'('}Double Degree{')'}
          </p>
          <p className='mt-2 text-sm sm:text-base md:text-lg'>
            Aug 2021 - Aug 2023
          </p>
          <p className='text-sm sm:text-base md:text-lg'>GPA: 3.36</p>
        </div>
      </div>
      <div className='relative flex'>
        <Image
          src='/images/edu/sk.png'
          width={5622}
          height={3748}
          alt='Suankularb Wittayalai School'
          className='h-[500px] w-screen bg-clip-content object-cover'
        />
        <div className='absolute top-12 rounded-br-xl bg-[#fb6ab3] p-3 text-WHITE opacity-80'>
          <h2 className='text-lg font-semibold leading-6 sm:text-xl md:text-2xl'>
            Suankularb Wittayalai School
          </h2>
          <p className='text-xs'>Bangkok, Thailand</p>
          <p className='mt-2 text-sm leading-4 sm:text-base md:text-lg'>
            Science - Mathematics
          </p>
          <p className='mt-2 text-sm sm:text-base md:text-lg'>
            May 2018 - May 2021
          </p>
          <p className='text-sm sm:text-base md:text-lg'>GPA: 3.61</p>
        </div>
      </div>
    </div>
  );
};

export default Education;
