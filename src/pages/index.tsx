import React from 'react';

import { Nav } from '@/components';

import Skill from './skill';
import Header from './header';
import AboutMe from './aboutme';
import Project from './project';
import Education from './education';
import Experience from './experience';

const Index = () => {
  return (
    <>
      <div
        className="fixed z-0 min-h-screen w-[15rem] overflow-hidden bg-repeat [background-size:105%] sm:w-[20rem] sm:[background-size:79%] md:w-[30rem] md:[background-size:53%] lg:w-[40rem] lg:[background-size:40%] dark:bg-black/40 dark:brightness-[.33]"
        style={{
          backgroundImage: `url(/images/bg_pattern.png)`,
        }}
      ></div>
      <Header />
      <AboutMe />
      <Education />
      <Experience />
      <Skill />
      <Project />
      <div className="fixed bottom-0 right-0 z-[2147483647]">
        <Nav />
      </div>
    </>
  );
};

export default Index;
