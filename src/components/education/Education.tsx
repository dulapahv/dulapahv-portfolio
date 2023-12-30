import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

import { cubicBezier, motion } from 'framer-motion';

import Image from 'next/image';
import { education } from '@/data';
import { MdSchool } from 'react-icons/md';
import { Skeleton } from '@nextui-org/react';

import { Floaties } from '.';

const Education = forwardRef((props, ref) => {
  const educationRef = useRef<HTMLDivElement>(null);

  const educations = Object.entries(education);

  const [isImgLoaded, setIsImgLoaded] = useState(
    Array(educations.length).fill(false)
  );

  const handleImgLoad = (index: number) => {
    const updatedLoaded = [...isImgLoaded];
    updatedLoaded[index] = true;
    setIsImgLoaded(updatedLoaded);
  };

  useImperativeHandle(ref, () => ({
    scrollIntoView: () => {
      educationRef.current!.scrollIntoView();
    },
  }));

  return (
    <section
      className="relative flex h-fit flex-col items-center gap-8 py-8"
      ref={educationRef}
    >
      <div className="flex flex-col items-center gap-6 py-8">
        <motion.h1
          className="text-2xl font-semibold uppercase tracking-[0.2em] text-BLACK first-letter:text-RED min-[375px]:text-3xl sm:text-4xl dark:text-WHITE"
          initial={{
            transform: 'scale(.5)',
            transformOrigin: '50% 100%',
            opacity: 0,
          }}
          whileInView={{
            transform: 'scale(1)',
            transformOrigin: '50% 100%',
            opacity: 1,
          }}
          transition={{
            ease: cubicBezier(0.19, 1.0, 0.22, 1.0),
            duration: 0.5,
          }}
          viewport={{ once: true }}
        >
          Education
        </motion.h1>
        <div className="flex h-[2px] w-14 flex-col bg-gradient-to-r from-BLUE to-BLUE-400"></div>
      </div>
      <ul className="timeline timeline-vertical timeline-snap-icon px-4 max-md:timeline-compact sm:px-8 md:px-12 lg:px-16">
        {educations.map(([key, value], index) => (
          <li key={key}>
            {index !== 0 && (
              <motion.hr
                className="rounded-none bg-RED"
                initial={{ clipPath: 'polygon(0 0, 100% 0%, 100% 0, 0 0)' }}
                whileInView={{
                  clipPath: 'polygon(0 0, 100% 0%, 100% 100%, 0 100%)',
                }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              />
            )}
            <motion.div
              className="timeline-middle"
              initial={{ opacity: 0 }}
              whileInView={{
                opacity: 1,
              }}
              transition={{ ease: 'easeOut', duration: 0.7 }}
              viewport={{ once: true }}
            >
              <MdSchool className="size-6 rounded-full bg-RED p-[3px] text-WHITE" />
            </motion.div>
            <motion.figure
              className={`relative mb-10 !self-start ${
                index % 2 === 0 ? 'timeline-start md:text-end' : 'timeline-end'
              }`}
              initial={{ transform: 'translateY(100px)', opacity: 0 }}
              whileInView={{
                transform: 'translateY(0)',
                opacity: 1,
              }}
              transition={{ ease: 'easeOut', duration: 0.5 }}
              viewport={{ once: true }}
            >
              <time className="text-lg">{value.date}</time>
              <Skeleton
                isLoaded={isImgLoaded[index]}
                classNames={{
                  base: 'rounded',
                }}
              >
                <Image
                  src={`/images/edu/${key}.png`}
                  width={value.width}
                  height={value.height}
                  alt={value.title}
                  className="h-[500px] w-screen rounded bg-clip-content object-cover"
                  onLoad={() => handleImgLoad(index)}
                />
              </Skeleton>
              <figcaption
                className={`absolute top-12 ${
                  index % 2 === 0
                    ? 'left-0 rounded-br-xl md:left-auto md:right-0 md:rounded-none md:rounded-bl-xl'
                    : 'rounded-br-xl'
                } p-3 text-WHITE opacity-80`}
                style={{ backgroundColor: value.color }}
              >
                <h2 className="text-lg/6 font-semibold sm:text-xl md:text-2xl">
                  {value.title}
                </h2>
                <p className="text-xs">{value.location}</p>
                <p className="mt-2 text-sm/4 sm:text-base md:text-lg">
                  {value.degree}
                </p>
                {value.specialization && (
                  <p className="mt-1 text-sm/4 italic sm:mt-0 sm:text-base">
                    Specialized in {value.specialization}
                  </p>
                )}
                {value.gpa && (
                  <p className="text-sm sm:text-base md:text-lg">
                    GPA: {value.gpa}
                  </p>
                )}
              </figcaption>
            </motion.figure>
            <section
              className={`${
                index % 2 === 0
                  ? 'timeline-end'
                  : 'timeline-end mt-[34rem] md:timeline-start'
              } !self-start md:mt-12`}
            >
              <ul className="ml-5 list-outside list-disc">
                {value.achievement.map((item, index) => (
                  <motion.li
                    key={index}
                    className="text-justify text-BLACK dark:text-WHITE"
                    initial={{ transform: 'translateY(100px)', opacity: 0 }}
                    whileInView={{
                      transform: 'translateY(0)',
                      opacity: 1,
                    }}
                    transition={{
                      ease: 'easeOut',
                      duration: 0.5,
                      delay: index * 0.1,
                    }}
                    viewport={{ once: true }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
              <Floaties isReversed={index % 2 === 1} />
            </section>
            {index !== educations.length - 1 && (
              <motion.hr
                className="rounded-none bg-RED"
                initial={{ clipPath: 'polygon(0 0, 100% 0%, 100% 0, 0 0)' }}
                whileInView={{
                  clipPath: 'polygon(0 0, 100% 0%, 100% 100%, 0 100%)',
                }}
                transition={{ ease: 'easeOut', duration: 2 }}
                viewport={{ once: true }}
              />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
});

Education.displayName = 'Education';

export default Education;
