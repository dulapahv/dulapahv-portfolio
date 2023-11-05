import React from 'react';

import Image from 'next/image';
import { FiExternalLink } from 'react-icons/fi';

interface ProjectCardProps {
  title: string;
  description: string;
  src: string;
  url: string;
  new?: boolean;
  badge?: string[];
}

const ProjectCard = ({
  title,
  description,
  src,
  url,
  new: isNew = false,
  badge,
}: ProjectCardProps) => {
  return (
    <div className='card card-compact md:card-normal w-96 bg-base-100 rounded-md shadow-lg shadow-BLUE/30 dark:shadow-BLUE/20 dark:bg-neutral-700'>
      <figure
        onClick={() => {
          const modal = document.getElementById(
            'projectModal'
          ) as HTMLDialogElement;
          modal?.showModal();
        }}
        className='cursor-pointer after:content-["View_more_images"] after:pt-[2px] after:pl-2 after:top-[226px] after:bg-BLACK/60 after:w-full after:h-6 after:absolute after:text-WHITE after:text-sm after:pointer-events-none'
      >
        <Image
          src='/images/sk_school.png'
          width={5622}
          height={3748}
          alt='Suankularb Wittayalai School'
          className='w-screen bg-clip-content object-cover h-[250px]'
        />
      </figure>
      <dialog id='projectModal' className='modal'>
        <div className='modal-box bg-WHITE dark:bg-BLACK cursor-default'>
          <form method='dialog'>
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-BLACK dark:text-WHITE dark:hover:bg-WHITE/10'>
              ✕
            </button>
          </form>
          <h3 className='font-bold text-lg text-BLACK dark:text-WHITE'>
            Hello!
          </h3>
          <p className='py-4 text-BLACK dark:text-WHITE'>
            Press ESC key or click on ✕ button to close
          </p>
        </div>
        <form method='dialog' className='modal-backdrop !cursor-default'></form>
      </dialog>
      <div className='relative card-body'>
        <div className='absolute left-0 top-0 w-full'>
          <div className='grid grid-cols-4'>
            <div className='h-[2px] bg-RED'></div>
            <div className='h-[2px] bg-BLUE'></div>
            <div className='h-[2px] bg-YELLOW'></div>
            <div className='h-[2px] bg-PURPLE'></div>
          </div>
        </div>
        <div className='relative card-title !mb-0'>
          <div className='absolute -top-1 h-[2px] w-8 bg-BLUE'></div>
          <h1 className='text-BLACK dark:text-WHITE'>{title}</h1>
          {isNew && <div className='badge bg-RED text-WHITE/90'>NEW</div>}
        </div>
        {badge && (
          <div className='card-actions'>
            {badge.map((item, index) => (
              <div
                key={index}
                className='badge badge-outline border-BLACK dark:border-WHITE text-BLACK dark:text-WHITE'
              >
                {item}
              </div>
            ))}
          </div>
        )}
        <p className='text-justify text-BLACK dark:text-WHITE'>{description}</p>
        <div className='card-actions justify-end'>
          <a href={url} target='_blank' rel='noopener noreferrer'>
            <button className='btn bg-transparent border-[1.5px] text-BLACK dark:text-WHITE border-t-YELLOW border-r-BLUE border-b-PURPLE border-l-RED hover:border-transparent hover:bg-BLUE hover:ring-[1.5px] ring-offset-2 ring-BLUE dark:ring-offset-neutral-700'>
              Github
              <FiExternalLink />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
