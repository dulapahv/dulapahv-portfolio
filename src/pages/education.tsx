import React from 'react';
import Image from 'next/image';

const Education = () => {
  return (
    <div className='flex flex-col items-center h-fit gap-8 py-8' id='education'>
      <div className='flex flex-col items-center gap-6 py-8'>
        <h1 className='text-BLACK dark:text-WHITE text-4xl uppercase tracking-[0.2em] font-semibold first-letter:text-RED'>
          Education
        </h1>
        <div className='w-14 h-[2px] bg-BLUE flex flex-col'></div>
      </div>
      <div className='flex relative'>
        <Image
          src='/images/uofg_campus.png'
          width={1915}
          height={632}
          alt='University of Glasgow'
          className='w-screen bg-clip-content object-cover h-[500px]'
        />
        <div className='absolute top-12 bg-[#003865] p-3 opacity-80 text-WHITE rounded-br-xl'>
          <h2 className='text-2xl font-semibold'>University of Glasgow</h2>
          <p className='text-xs leading-3'>Scotland, United Kingdom</p>
          <p className='text-lg leading-8'>
            BSc Honours in Software Engineering {'('}Double Degree{')'}
          </p>
          <p className='text-lg'>Sep 2023 - May 2025</p>
          <p className='text-lg leading-5'>GPA: Expected 1st</p>
        </div>
      </div>
      <div className='flex relative'>
        <Image
          src='/images/kmitl_campus.jpg'
          width={1440}
          height={720}
          alt="King Mongkut's Institute of Technology Ladkrabang"
          className='w-screen bg-clip-content object-cover h-[500px] object-top'
        />
        <div className='absolute top-12 bg-[#e35205] p-3 opacity-80 text-WHITE rounded-br-xl'>
          <h2 className='text-2xl font-semibold'>
            King Mongkut&apos;s Institute of Technology Ladkrabang
          </h2>
          <p className='text-xs leading-3'>Bangkok, Thailand</p>
          <p className='text-lg leading-8'>
            BEng in Software Engineering {'('}Double Degree{')'}
          </p>
          <p className='text-lg'>Aug 2021 - Aug 2023</p>
          <p className='text-lg leading-5'>GPA: 3.36</p>
        </div>
      </div>
      <div className='flex relative'>
        <Image
          src='/images/sk_school.png'
          width={5622}
          height={3748}
          alt='Suankularb Wittayalai School'
          className='w-screen bg-clip-content object-cover h-[500px]'
        />
        <div className='absolute top-12 bg-[#fb6ab3] p-3 opacity-80 text-WHITE rounded-br-xl'>
          <h2 className='text-2xl font-semibold'>
            Suankularb Wittayalai School
          </h2>
          <p className='text-xs leading-3'>Bangkok, Thailand</p>
          <p className='text-lg leading-8'>Science - Mathematics</p>
          <p className='text-lg'>May 2018 - May 2021</p>
          <p className='text-lg leading-5'>GPA: 3.61</p>
        </div>
      </div>
    </div>
  );
};

export default Education;
