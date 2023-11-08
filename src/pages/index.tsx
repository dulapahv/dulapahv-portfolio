import React from 'react';

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
        className="fixed z-0 min-h-screen w-[15rem] overflow-hidden bg-repeat [background-size:105%] dark:bg-black/40 dark:brightness-[.33] sm:w-[20rem] sm:[background-size:79%] md:w-[30rem] md:[background-size:53%] lg:w-[40rem] lg:[background-size:40%]"
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
    </>
  );
};

export default Index;
