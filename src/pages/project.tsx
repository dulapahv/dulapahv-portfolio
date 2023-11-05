import React from 'react';

import { ProjectCard } from '@/components';

const Project = () => {
  return (
    <div
      className='relative flex flex-col gap-8 py-8 justify-center'
      id='project'
    >
      <div className='flex flex-col items-center gap-6 py-8'>
        <h1 className='text-BLACK dark:text-WHITE text-4xl uppercase tracking-[0.2em] font-semibold first-letter:text-RED'>
          Project
        </h1>
        <div className='w-14 h-[2px] bg-gradient-to-r from-BLUE to-BLUE-400 flex flex-col'></div>
      </div>
      <div className='flex flex-wrap justify-center gap-x-6 gap-y-16'>
        <ProjectCard
          id='proj-portfolio'
          title='Portfolio Website'
          description='A revamped portfolio website from previous React.js, JavaScript, and pure CSS to Next.js, TypeScript, Tailwind CSS and DaisyUI. This website is a personal project to showcase my skills and experience, as well as to share my knowledge and experience with others.'
          path='test'
          size={10}
          text={[
            'test1',
            'test2',
            'test3',
            'test4',
            'test5',
            'test6',
            'test7',
            'test8',
            'test9',
            'test10',
          ]}
          url='https://github.com/dulapahv/dulapahv-portfolio'
          new
          badge={['Next.js', 'TypeScript', 'Tailwind CSS', 'DaisyUI']}
        />
        <ProjectCard
          id='proj-kanbaru'
          title='Kanbaru'
          description='A kanban-style project management application provides customizable task organization with visual intuitiveness, date and time options, and detailed descriptions. Users can refine project planning and management with ease.'
          path='kanbaru'
          size={10}
          text={[
            'Main Menu',
            'test2',
            'test3',
            'test4',
            'test5',
            'test6',
            'test7',
            'test8',
            'test9',
            'test10',
          ]}
          url='https://github.com/dulapahv/Kanbaru'
          badge={['Python', 'Qt', 'Firebase', 'Pickle']}
        />
        <ProjectCard
          id='proj-mystudyplan'
          title='MyStudyPlan'
          description='A comprehensive academic tracking application offers a centralized dashboard for efficient viewing of class assignments, tasks, and exams. Users can access a calendar view option, streamlining academic planning and management.'
          path='mystudyplan'
          size={15}
          text={[
            'test1',
            'test2',
            'test3',
            'test4',
            'test5',
            'test6',
            'test7',
            'test8',
            'test9',
            'test10',
            'test11',
            'test12',
            'test13',
            'test14',
            'test15',
          ]}
          url='https://github.com/dulapahv/MyStudyPlan'
          badge={['Java', 'Java Swing', 'Firebase']}
        />
        <ProjectCard
          id='proj-calclab'
          title='CalcLab'
          description='An all-encompassing application combines a scientific calculator with graph plotting capabilities, a date comparator, a real-time currency converter, and 12 more converter tools, offering efficient mathematical calculations and conversions.'
          path='calclab'
          size={20}
          text={[
            'test1',
            'test2',
            'test3',
            'test4',
            'test5',
            'test6',
            'test7',
            'test8',
            'test9',
            'test10',
            'test11',
            'test12',
            'test13',
            'test14',
            'test15',
            'test16',
            'test17',
            'test18',
            'test19',
            'test20',
          ]}
          url='https://github.com/dulapahv/CalcLab'
          badge={['Python', 'Tkinter', 'Turtle Graphics']}
        />
        <ProjectCard
          id='proj-matrix'
          title='Matrix-Arithmetic'
          description='A feature-packed matrix arithmetic program that operates within the terminal. This tool encompasses addition, subtraction, multiplication, scalar multiplication, exponentiation, determinant computation, transposition, inversion, and adjoint matrix operations.'
          path='matrix'
          size={12}
          text={[
            'test1',
            'test2',
            'test3',
            'test4',
            'test5',
            'test6',
            'test7',
            'test8',
            'test9',
            'test10',
            'test11',
            'test12',
          ]}
          url='https://github.com/dulapahv/Matrix-Arithmetic'
          badge={['C']}
        />
        <ProjectCard
          id='proj-nekoparaiten'
          title='Nekoparaiten'
          description="An (April Fool's) online speed-clicking game written in Python. Click as fast as possible while also competing with other people around the world! Nekoparaiten is an anime Neko romance simulation mobile game originally created by Sayori (NEKO WORKs) and developed by Yostar Games."
          path='nekoparaiten'
          size={12}
          text={[
            'test1',
            'test2',
            'test3',
            'test4',
            'test5',
            'test6',
            'test7',
            'test8',
            'test9',
            'test10',
            'test11',
            'test12',
          ]}
          url='https://github.com/dulapahv/Nekoparaiten'
          badge={['Python', 'Tkinter', 'Firebase', 'Bootstrap']}
        />
        <ProjectCard
          id='proj-acemath'
          title='AceMath'
          description='An online speed mathematics game. Solve math problems as fast as you can while also competing with other people around the world!'
          path='acemath'
          size={13}
          text={[
            'test1',
            'test2',
            'test3',
            'test4',
            'test5',
            'test6',
            'test7',
            'test8',
            'test9',
            'test10',
            'test11',
            'test12',
            'test13',
          ]}
          url='https://github.com/dulapahv/AceMath'
          badge={['Python', 'Tkinter', 'Firebase']}
        />
      </div>
    </div>
  );
};

export default Project;
