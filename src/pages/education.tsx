import React from 'react';

import Image from 'next/image';
import { education } from '@/data';
import { MdSchool } from 'react-icons/md';

const Education = () => {
  const educations = Object.entries(education);

  return (
    <div
      className="relative flex h-fit flex-col items-center gap-8 py-8"
      id="education"
    >
      <div className="flex flex-col items-center gap-6 py-8">
        <h1 className="text-2xl font-semibold uppercase tracking-[0.2em] text-BLACK first-letter:text-RED min-[375px]:text-3xl sm:text-4xl dark:text-WHITE">
          Education
        </h1>
        <div className="flex h-[2px] w-14 flex-col bg-gradient-to-r from-BLUE to-BLUE-400"></div>
      </div>
      <ul className="timeline timeline-vertical timeline-snap-icon px-4 max-md:timeline-compact sm:px-8 md:px-12 lg:px-16">
        {educations.map(([key, value], index) => (
          <li key={key}>
            {index !== 0 && <hr className="rounded-none bg-RED" />}
            <div className="timeline-middle">
              <MdSchool className="h-6 w-6 rounded-full bg-RED p-[3px]" />
            </div>
            <div
              className={`relative mb-10 !self-start ${
                index % 2 === 0 ? 'timeline-start md:text-end' : 'timeline-end'
              }`}
            >
              <time className="text-lg">{value.date}</time>
              <Image
                src={`/images/edu/${key}.png`}
                width={value.width}
                height={value.height}
                alt={value.title}
                className="h-[500px] w-screen rounded bg-clip-content object-cover"
              />
              <div
                className={`absolute top-12 ${
                  index % 2 === 0
                    ? 'left-0 rounded-br-xl md:right-0 md:rounded-none md:rounded-bl-xl'
                    : 'rounded-br-xl'
                } p-3 text-WHITE opacity-80`}
                style={{ backgroundColor: value.color }}
              >
                <h2 className="text-lg font-semibold leading-6 sm:text-xl md:text-2xl">
                  {value.title}
                </h2>
                <p className="text-xs">{value.location}</p>
                <p className="mt-2 text-sm leading-4 sm:text-base md:text-lg">
                  {value.degree}
                </p>
                {value.specialization && (
                  <p className="mt-1 text-sm italic leading-4 sm:mt-0 sm:text-base">
                    Specialized in {value.specialization}
                  </p>
                )}
                {value.gpa && (
                  <p className="text-sm sm:text-base md:text-lg">
                    GPA: {value.gpa}
                  </p>
                )}
              </div>
            </div>
            <div
              className={`${
                index % 2 === 0
                  ? 'timeline-end'
                  : 'timeline-end mt-[34rem] md:timeline-start'
              } !self-start md:mt-12`}
            >
              <ul className="ml-5 list-outside list-disc">
                {value.achievement.map((item, index) => (
                  <li
                    key={index}
                    className="text-justify text-BLACK dark:text-WHITE"
                  >
                    {item}
                  </li>
                ))}
                <div className="hidden md:flex">
                  <div
                    className={`absolute h-4 w-4 animate-shake-vertical rounded-full bg-PURPLE opacity-70 animation-delay-1200 ${
                      index % 2 === 0 ? 'left-[90%]' : 'left-[8%]'
                    } top-[22rem]`}
                  ></div>
                  <div
                    className={`absolute h-8 w-8 animate-shake-vertical rounded-full bg-RED opacity-70 ${
                      index % 2 === 0 ? 'left-[80%]' : 'left-[18%]'
                    } top-[30rem]`}
                  ></div>
                  <div
                    className={`absolute h-14 w-14 animate-shake-vertical rounded-full bg-BLUE opacity-70 animation-delay-400 ${
                      index % 2 === 0 ? 'left-[65%]' : 'left-[33%]'
                    } top-[25rem]`}
                  ></div>
                  <div
                    className={`absolute h-10 w-10 animate-shake-vertical rounded-full bg-YELLOW opacity-70 animation-delay-800 ${
                      index % 2 === 0 ? 'left-[55%]' : 'left-[43%]'
                    } top-[30rem]`}
                  ></div>
                </div>
              </ul>
            </div>
            {index !== educations.length - 1 && (
              <hr className="rounded-none bg-RED" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Education;
