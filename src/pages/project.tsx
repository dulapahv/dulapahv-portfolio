import React from 'react';

const Project = () => {
  return (
    <div className='flex flex-col gap-8 py-8 justify-center' id='project'>
      <div className='flex flex-col items-center gap-6 py-8'>
        <h1 className='text-BLACK dark:text-WHITE text-4xl uppercase tracking-[0.2em] font-semibold first-letter:text-RED'>
          Project
        </h1>
        <div className='w-14 h-[2px] bg-gradient-to-r from-BLUE to-BLUE-400 flex flex-col'></div>
      </div>
    </div>
  );
};

export default Project;
