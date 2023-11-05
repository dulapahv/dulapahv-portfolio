import React from 'react';

import Image from 'next/image';

const Education = () => {
  return (
    <div
      className='relative flex flex-col items-center h-fit gap-8 py-8'
      id='education'
    >
      <div className='flex flex-col items-center gap-6 py-8'>
        <h1 className='text-BLACK dark:text-WHITE text-2xl min-[375px]:text-3xl sm:text-4xl uppercase tracking-[0.2em] font-semibold first-letter:text-RED'>
          Education
        </h1>
        <div className='w-14 h-[2px] bg-gradient-to-r from-BLUE to-BLUE-400 flex flex-col'></div>
      </div>
      <div className='flex relative'>
        <Image
          src='/images/edu/uofg.png'
          width={1915}
          height={632}
          alt='University of Glasgow'
          className='w-screen bg-clip-content object-cover h-[500px]'
        />
        <div className='absolute top-12 bg-[#003865] p-3 opacity-80 text-WHITE rounded-br-xl'>
          <h2 className='text-lg sm:text-xl md:text-2xl font-semibold leading-6'>
            University of Glasgow
          </h2>
          <p className='text-xs'>Scotland, United Kingdom</p>
          <p className='text-sm sm:text-base md:text-lg mt-2 leading-4'>
            BSc Honours in Software Engineering {'('}Double Degree{')'}
          </p>
          <p className='text-sm sm:text-base italic leading-4 mt-1 sm:mt-0'>
            Specialized in Parallel and Distributed Systems
          </p>
          <p className='text-sm sm:text-base md:text-lg mt-2'>
            Sep 2023 - May 2025
          </p>
          <p className='text-sm sm:text-base md:text-lg'>GPA: Expected 1st</p>
        </div>
      </div>
      <div className='flex relative'>
        <Image
          src='/images/edu/kmitl.png'
          width={1440}
          height={720}
          alt="King Mongkut's Institute of Technology Ladkrabang"
          className='w-screen bg-clip-content object-cover h-[500px] object-top'
        />
        <div className='absolute top-12 bg-[#e35205] p-3 opacity-80 text-WHITE rounded-br-xl'>
          <h2 className='text-lg sm:text-xl md:text-2xl font-semibold leading-6'>
            King Mongkut&apos;s Institute of Technology Ladkrabang
          </h2>
          <p className='text-xs'>Bangkok, Thailand</p>
          <p className='text-sm sm:text-base md:text-lg mt-2 leading-4'>
            BEng in Software Engineering {'('}Double Degree{')'}
          </p>
          <p className='text-sm sm:text-base md:text-lg mt-2'>
            Aug 2021 - Aug 2023
          </p>
          <p className='text-sm sm:text-base md:text-lg'>GPA: 3.36</p>
        </div>
      </div>
      <div className='flex relative'>
        <Image
          src='/images/edu/sk.png'
          width={5622}
          height={3748}
          alt='Suankularb Wittayalai School'
          className='w-screen bg-clip-content object-cover h-[500px]'
        />
        <div className='absolute top-12 bg-[#fb6ab3] p-3 opacity-80 text-WHITE rounded-br-xl'>
          <h2 className='text-lg sm:text-xl md:text-2xl font-semibold leading-6'>
            Suankularb Wittayalai School
          </h2>
          <p className='text-xs'>Bangkok, Thailand</p>
          <p className='text-sm sm:text-base md:text-lg mt-2 leading-4'>
            Science - Mathematics
          </p>
          <p className='text-sm sm:text-base md:text-lg mt-2'>
            May 2018 - May 2021
          </p>
          <p className='text-sm sm:text-base md:text-lg'>GPA: 3.61</p>
        </div>
      </div>
    </div>
  );
};

export default Education;
