import React from 'react';

import Image from 'next/image';
import { TbMinusVertical } from 'react-icons/tb';

interface ExpCardProps {
  id: string;
  title: string;
  location: string;
  date: string;
  position: string;
  tech: string;
  detail: string[];
  text: string[];
  reversed?: boolean;
}

const ExpCard = ({
  id,
  title,
  location,
  date,
  position,
  tech,
  detail,
  text,
  reversed: isReversed = false,
}: ExpCardProps) => {
  return (
    <>
      <div className="relative w-screen *:absolute *:rounded-full *:opacity-70">
        <div
          className={`size-4 animate-shake-vertical bg-PURPLE animation-delay-1200 ${
            isReversed ? 'left-[96%]' : 'left-[3%]'
          } top-[13rem]`}
        ></div>
        <div
          className={`size-8 animate-shake-vertical bg-RED ${
            isReversed ? 'left-[93.5%]' : 'left-[5%]'
          } top-[19rem]`}
        ></div>
        <div
          className={`size-14 animate-shake-vertical bg-BLUE animation-delay-400 ${
            isReversed ? 'left-[95%]' : 'left-[2%]'
          } top-[25rem]`}
        ></div>
        <div
          className={`size-10 animate-shake-vertical bg-YELLOW animation-delay-800 ${
            isReversed ? 'left-[90%]' : 'left-[8%]'
          } top-[30rem]`}
        ></div>
      </div>
      <div className="z-10 mb-8 flex h-full min-h-[28rem] flex-col rounded-md px-4 sm:px-8 md:px-16 lg:flex-row lg:px-24">
        <div
          className={`mx-0 mt-3 lg:mx-4 lg:mt-0 lg:w-1/2 ${
            isReversed ? 'order-2' : 'order-2 lg:order-1'
          }`}
        >
          <h1 className="bg-RED px-2 py-1 text-lg font-bold text-WHITE selection:bg-fuchsia-300 selection:text-fuchsia-900">
            {title}
          </h1>
          <h2 className="flex flex-wrap items-center font-light text-YELLOW-800 selection:bg-fuchsia-300 selection:text-fuchsia-900 dark:text-YELLOW">
            {location}{' '}
            <TbMinusVertical className="text-BLACK dark:text-WHITE" /> {date}
          </h2>
          <h3 className="flex flex-wrap items-center text-BLACK selection:bg-fuchsia-300 selection:text-fuchsia-900 dark:text-WHITE">
            <span className="bg-gradient-to-r from-BLUE from-10% via-PURPLE via-30% to-RED bg-clip-text font-semibold italic text-transparent">
              {position}
            </span>
            <TbMinusVertical />
            <span className="text-BLACK dark:text-WHITE">{tech} </span>
          </h3>
          <div className="mb-7 mt-4 flex h-[2px] w-14 flex-col bg-gradient-to-r from-RED to-RED-400"></div>
          <ul className="ml-5 list-outside list-disc">
            {detail?.map((item, index) => (
              <li
                key={index}
                className="text-justify text-BLACK selection:bg-fuchsia-300 selection:text-fuchsia-900 dark:text-WHITE"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div
          className={`lg:w-1/2 ${
            isReversed
              ? 'order-1 after:rounded-tr-3xl'
              : 'order-1 after:rounded-bl-3xl hover:after:rounded-bl-3xl lg:order-2'
          } relative max-h-[30rem] cursor-pointer after:pointer-events-none after:absolute after:bottom-0 after:h-10 after:w-fit after:rounded-tr-xl after:bg-BLACK/70 after:pl-4 after:pr-4 after:pt-2 after:text-WHITE after:content-["View_more_images"] hover:after:w-full hover:after:rounded-none`}
          onClick={() => {
            const modal = document.getElementById(id) as HTMLDialogElement;
            modal?.showModal();
          }}
        >
          <Image
            src={`/images/exp/${id}/cover.png`}
            width={1915}
            height={632}
            alt={id + ' cover'}
            className={`${
              isReversed ? 'rounded-br-3xl' : 'rounded-bl-3xl'
            } w-full object-cover hover:brightness-[.85] lg:h-full lg:shadow-xl`}
          />
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
                    <h1 className="m-2 text-BLACK selection:bg-fuchsia-300 selection:text-fuchsia-900 dark:text-WHITE">
                      {index + 1}. {item}
                    </h1>
                    <Image
                      src={`/images/exp/${id}/${index + 1}.png`}
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
          {isReversed ? (
            <div className="pointer-events-none absolute -bottom-16 right-32 -z-10 h-36 w-screen animate-clip-in-left bg-BLUE opacity-50"></div>
          ) : (
            <div className="pointer-events-none absolute -bottom-16 left-32 -z-10 h-36 w-screen animate-clip-in-right bg-BLUE opacity-50"></div>
          )}
        </div>
      </div>
    </>
  );
};

export default ExpCard;
