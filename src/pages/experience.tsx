import React from 'react';

import { cubicBezier, motion } from 'framer-motion';

import { experience } from '@/data/';
import { ExpCard } from '@/components';

const Experience = () => {
  const experiences = Object.entries(experience);

  return (
    <div
      className="relative flex animate-fade-in flex-col justify-center gap-8 overflow-hidden py-8"
      id="experience"
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
          Work Experience
        </motion.h1>
        <div className="flex h-[2px] w-14 flex-col bg-gradient-to-r from-BLUE to-BLUE-400"></div>
      </div>
      <div className="-mt-8 flex flex-col gap-8 lg:-mt-16 lg:gap-16">
        {experiences.map(([id, exp], index) => (
          <ExpCard
            key={id}
            id={id}
            title={exp.title}
            location={exp.location}
            date={exp.date}
            position={exp.position}
            tech={exp.tech}
            detail={exp.detail}
            text={exp.text}
            reversed={index % 2 === 1}
          />
        ))}
      </div>
    </div>
  );
};

export default Experience;
