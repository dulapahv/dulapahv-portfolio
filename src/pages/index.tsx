import React from 'react';

import Script from 'next/script';

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
        className='fixed w-[15rem] sm:w-[20rem] md:w-[30rem] lg:w-[40rem] [background-size:105%] sm:[background-size:79%] md:[background-size:53%] lg:[background-size:40%] bg-repeat dark:bg-black/40 min-h-screen overflow-hidden dark:brightness-[.33] z-0'
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
