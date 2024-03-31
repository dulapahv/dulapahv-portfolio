import { forwardRef, useImperativeHandle, useRef } from 'react';

import { cubicBezier, motion } from 'framer-motion';

import { project } from '@/constants';

import { ProjectCard } from '.';

const Project = forwardRef((props, ref) => {
  const projectRef = useRef<HTMLDivElement>(null);

  const projects = Object.entries(project);

  useImperativeHandle(ref, () => ({
    scrollIntoView: () => projectRef.current!.scrollIntoView(),
  }));

  return (
    <section
      className="relative flex flex-col justify-center gap-8 py-8"
      ref={projectRef}
      id="project"
    >
      <div className="flex flex-col items-center gap-6 py-8">
        <motion.h1
          className="text-4xl font-semibold uppercase tracking-[0.2em] text-BLACK first-letter:text-RED dark:text-WHITE"
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
          Project
        </motion.h1>
        <div className="flex h-[2px] w-14 flex-col bg-gradient-to-r from-BLUE to-BLUE-400" />
      </div>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-16">
        {projects.map(([id, proj], index) => (
          <ProjectCard
            key={id}
            id={id}
            title={proj.title}
            description={proj.description}
            text={proj.text}
            url={proj.url}
            badge={proj.badge}
            new={index === 0}
          />
        ))}
      </div>
    </section>
  );
});

Project.displayName = 'Project';

export default Project;
