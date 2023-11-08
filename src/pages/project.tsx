import React from 'react';

import { ProjectCard } from '@/components';

const Project = () => {
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
        <ProjectCard
          id="proj-portfolio"
          title="Portfolio Website"
          description="A revamped portfolio website from previous React.js, JavaScript, and pure CSS to Next.js, TypeScript, Tailwind CSS and DaisyUI. This website is a personal project to showcase my skills and experience, as well as to share my knowledge and experience with others."
          path="portfolio"
          size={7}
          text={[
            'Header',
            'Navigation panel',
            'About me',
            'Education',
            'Experience',
            'Skill',
            'Project',
          ]}
          url="https://github.com/dulapahv/dulapahv-portfolio"
          new
          badge={['Next.js', 'TypeScript', 'Tailwind CSS', 'DaisyUI']}
        />
        <ProjectCard
          id="proj-kanbaru"
          title="Kanbaru"
          description="A kanban-style project management application provides customizable task organization with visual intuitiveness, date and time options, and detailed descriptions. Users can refine project planning and management with ease."
          path="kanbaru"
          size={10}
          text={[
            'Overview page',
            'Overview page (empty)',
            'Add panel',
            'Add card',
            'Add board',
            'Rearrange cards',
            'Card description',
            'Board settings',
            'App settings',
            'About page',
          ]}
          url="https://github.com/dulapahv/Kanbaru"
          badge={['Python', 'Qt', 'Firebase', 'Pickle']}
        />
        <ProjectCard
          id="proj-mystudyplan"
          title="MyStudyPlan"
          description="A comprehensive academic tracking application offers a centralized dashboard for efficient viewing of class assignments, tasks, and exams. Users can access a calendar view option, streamlining academic planning and management."
          path="mystudyplan"
          size={15}
          text={[
            'Project cover image',
            'Login/Register page',
            'Overview page',
            'Calendar page',
            'Tasks page',
            'Add task',
            'Exams page',
            'Add exam',
            'Schedule page',
            'Add class',
            'Manage subjects',
            'Color palette',
            'View class',
            'View task',
            'View exam',
          ]}
          url="https://github.com/dulapahv/MyStudyPlan"
          badge={['Java', 'Java Swing', 'Firebase']}
        />
        <ProjectCard
          id="proj-calclab"
          title="CalcLab"
          description="An all-encompassing application combines a scientific calculator with graph plotting capabilities, a date comparator, a real-time currency converter, and 12 more converter tools, offering efficient mathematical calculations and conversions."
          path="calclab"
          size={20}
          text={[
            'Calculator and graph page',
            'Calculator (scientific)',
            'Graph plotter',
            'History (empty)',
            'History (with entries)',
            'Tools selection menu',
            'Date comparator',
            'Currency converter',
            'Volume converter',
            'Length converter',
            'Weight and mass converter',
            'Temperature converter',
            'Energy converter',
            'Area converter',
            'Speed converter',
            'Time converter',
            'Power converter',
            'Data converter',
            'Pressure converter',
            'Angle converter',
          ]}
          url="https://github.com/dulapahv/CalcLab"
          badge={['Python', 'Tkinter', 'Turtle Graphics']}
        />
        <ProjectCard
          id="proj-matrix"
          title="Matrix-Arithmetic"
          description="A feature-packed matrix arithmetic program that operates within the terminal. This tool encompasses addition, subtraction, multiplication, scalar multiplication, exponentiation, determinant computation, transposition, inversion, and adjoint matrix operations."
          path="matrix"
          size={12}
          text={[
            'Define matrix',
            'Select a matrix to define',
            'Input matrix through the terminal/command line',
            'Suppose we have a file containing comma-separated values',
            'We just specify the delimiter as a , and simply press enter',
            'View stored matrix',
            'Select a matrix to view',
            'Perform arithmetic',
            'Select operation',
            'Answer',
            'output.txt',
            'output.csv',
          ]}
          url="https://github.com/dulapahv/Matrix-Arithmetic"
          badge={['C']}
        />
        <ProjectCard
          id="proj-nekoparaiten"
          title="Nekoparaiten"
          description="An (April Fool's) online speed-clicking game written in Python. Click as fast as possible while also competing with other people around the world! Nekoparaiten is an anime Neko romance simulation mobile game originally created by Sayori (NEKO WORKs) and developed by Yostar Games."
          path="nekoparaiten"
          size={12}
          text={[
            'Main menu',
            'Sync page',
            'Firebase realtime database hierarchy',
            'Story',
            'Instruction page',
            'Countdown page',
            'Game page',
            'Pause page',
            'Result page (without login)',
            'Result page - new record (with login)',
            'Result page (with login)',
            'Leaderboard page',
          ]}
          url="https://github.com/dulapahv/Nekoparaiten"
          badge={['Python', 'Tkinter', 'Firebase', 'Bootstrap']}
        />
        <ProjectCard
          id="proj-acemath"
          title="AceMath"
          description="An online speed mathematics game. Solve math problems as fast as you can while also competing with other people around the world!"
          path="acemath"
          size={13}
          text={[
            'Main menu page',
            'Create account prompt',
            'Create account page',
            'Create account successful',
            'Firebase realtime database hierarchy',
            'Login page',
            'Login successful page',
            'Select difficulty page',
            'Countdown page',
            'Game page',
            'Result page',
            'Profile page',
            'Leaderboard page',
          ]}
          url="https://github.com/dulapahv/AceMath"
          badge={['Python', 'Tkinter', 'Firebase']}
        />
      </div>
    </div>
  );
};

export default Project;
