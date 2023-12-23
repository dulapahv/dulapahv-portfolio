import React from 'react';

import { project } from '@/data';
import { ProjectCard } from '@/components';

const Project = () => {
  const projects = Object.entries(project);

  return (
    <div
      className="relative flex flex-col justify-center gap-8 py-8"
      id="project"
    >
      <div className="flex flex-col items-center gap-6 py-8">
        <h1 className="text-4xl font-semibold uppercase tracking-[0.2em] text-BLACK first-letter:text-RED dark:text-WHITE">
          Project
        </h1>
        <div className="flex h-[2px] w-14 flex-col bg-gradient-to-r from-BLUE to-BLUE-400"></div>
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
    </div>
  );
};

export default Project;
