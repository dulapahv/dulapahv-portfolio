import { useRef } from 'react';

import {
  AboutMe,
  Education,
  Experience,
  Footer,
  Header,
  Nav,
  Project,
  Skill,
} from '@/components';

const Index = () => {
  const aboutmeRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const skillRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="fixed z-0 min-h-screen w-[15rem] overflow-hidden bg-bg_pattern bg-repeat [background-size:105%] sm:w-[20rem] sm:[background-size:79%] md:w-[30rem] md:[background-size:53%] lg:w-[40rem] lg:[background-size:40%] dark:bg-black/40 dark:brightness-[.33]" />
      <Header sectionRef={aboutmeRef} />
      <AboutMe ref={aboutmeRef} />
      <Education ref={educationRef} />
      <Experience ref={experienceRef} />
      <Skill ref={skillRef} />
      <Project ref={projectRef} />
      <Footer />
      <Nav
        sectionRef={{
          education: educationRef,
          experience: experienceRef,
          skill: skillRef,
          project: projectRef,
        }}
      />
    </>
  );
};

export default Index;
