import React from 'react';

import Image from 'next/image';
import { FiExternalLink } from 'react-icons/fi';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  url: string;
  text: string[];
  new?: boolean;
  badge?: string[];
}

const ProjectCard = ({
  id,
  title,
  description,
  text,
  url,
  new: isNew = false,
  badge,
}: ProjectCardProps) => {
  return (
    <div className="card card-compact w-96 rounded-md bg-base-100 shadow-lg shadow-BLUE/30 md:card-normal dark:bg-neutral-700 dark:shadow-BLUE/20">
      <figure
        onClick={() => {
          const modal = document.getElementById(id) as HTMLDialogElement;
          modal?.showModal();
        }}
        className='cursor-pointer after:pointer-events-none after:absolute after:left-0 after:top-[226px] after:h-6 after:w-fit after:rounded-tr-lg after:bg-BLACK/60 after:pl-2 after:pr-2 after:pt-[2px] after:text-sm after:text-WHITE after:content-["View_more_images"] hover:after:w-full hover:after:rounded-none'
      >
        <Image
          src={`/images/proj/${id}/1.png`}
          width={1541}
          height={1063}
          alt={id + ' cover'}
          className="h-[250px] w-screen bg-clip-content object-cover hover:brightness-[.85]"
        />
      </figure>
      <dialog id={id} className="modal">
        <div className="modal-box w-fit max-w-7xl cursor-default rounded-md bg-WHITE p-0 dark:bg-BLACK">
          <form method="dialog">
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-1 text-RED hover:bg-RED hover:text-WHITE  focus:outline-none">
              ✕
            </button>
          </form>
          <ul className="flex flex-col items-center">
            {text?.map((item, index) => (
              <li key={index}>
                <h1 className="m-2 text-BLACK dark:text-WHITE">
                  {index + 1}. {item}
                </h1>
                <Image
                  src={`/images/proj/${id}/${index + 1}.png`}
                  width={750}
                  height={500}
                  alt={id + ' ' + index + 1}
                />
              </li>
            ))}
          </ul>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button
            aria-label="Close"
            className="!cursor-default focus:outline-none"
          ></button>
        </form>
      </dialog>
      <div className="card-body relative">
        <div className="absolute left-0 top-0 w-full">
          <div className="grid grid-cols-4 *:h-[2px]">
            <div className="bg-RED"></div>
            <div className="bg-BLUE"></div>
            <div className="bg-YELLOW"></div>
            <div className="bg-PURPLE"></div>
          </div>
        </div>
        <div className="card-title relative !mb-0">
          <div className="absolute -top-1 h-[2px] w-8 bg-BLUE"></div>
          <h1 className="text-BLACK dark:text-WHITE">{title}</h1>
          {isNew && <div className="badge bg-RED text-WHITE/90">NEW</div>}
        </div>
        {badge && (
          <div className="card-actions">
            {badge.map((item, index) => (
              <div
                key={index}
                className="badge badge-outline border-BLACK text-BLACK dark:border-WHITE dark:text-WHITE"
              >
                {item}
              </div>
            ))}
          </div>
        )}
        <p className="text-justify text-BLACK dark:text-WHITE">{description}</p>
        <div className="card-actions justify-end">
          <a href={url} target="_blank" rel="noopener noreferrer">
            <button className="btn select-text border-[1.5px] border-b-PURPLE border-l-RED border-r-BLUE border-t-YELLOW bg-transparent text-BLACK ring-BLUE ring-offset-2 hover:border-transparent hover:bg-BLUE hover:ring-[1.5px] dark:text-WHITE dark:ring-offset-neutral-700">
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
