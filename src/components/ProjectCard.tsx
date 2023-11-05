import React from 'react';

import Image from 'next/image';
import { FiExternalLink } from 'react-icons/fi';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  path: string;
  size: number;
  url: string;
  text: string[];
  new?: boolean;
  badge?: string[];
}

const ProjectCard = ({
  id,
  title,
  description,
  path,
  size,
  text,
  url,
  new: isNew = false,
  badge,
}: ProjectCardProps) => {
  return (
    <div className='card card-compact md:card-normal w-96 bg-base-100 rounded-md shadow-lg shadow-BLUE/30 dark:shadow-BLUE/20 dark:bg-neutral-700'>
      <figure
        onClick={() => {
          const modal = document.getElementById(id) as HTMLDialogElement;
          modal?.showModal();
        }}
        className='cursor-pointer after:content-["View_more_images"] after:pt-[2px] after:pl-2 after:pr-2 after:top-[226px] after:bg-BLACK/60 after:w-fit hover:after:w-full after:h-6 after:left-0 after:absolute after:rounded-tr-lg hover:after:rounded-none after:text-WHITE after:text-sm after:pointer-events-none'
      >
        <Image
          src={`/images/proj/${path}/1.png`}
          width={1541}
          height={1063}
          alt={path + ' cover'}
          className='w-screen bg-clip-content object-cover h-[250px] hover:brightness-[.85]'
        />
      </figure>
      <dialog id={id} className='modal'>
        <div className='modal-box bg-WHITE dark:bg-BLACK cursor-default max-w-7xl p-0 w-fit rounded-md'>
          <form method='dialog'>
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-1 text-RED hover:text-WHITE hover:bg-RED  focus:outline-none'>
              ✕
            </button>
          </form>
          <ul className='flex flex-col items-center'>
            {Array.from(Array(size).keys()).map((item, index) => (
              <li key={index}>
                <h1 className='text-BLACK dark:text-WHITE m-2'>
                  {index + 1}. {text[index]}
                </h1>
                <Image
                  src={`/images/proj/${path}/${index + 1}.png`}
                  width={750}
                  height={500}
                  alt={path + ' ' + index + 1}
                />
              </li>
            ))}
          </ul>
        </div>
        <form method='dialog' className='modal-backdrop !cursor-default'>
          <button aria-label='Close' className='focus:outline-none'></button>
        </form>
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
