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
    <div className="flex flex-col items-center [&>*:not(:first-child)]:max-w-[3840px]">
      <div className="bg_pattern fixed left-0 z-0 min-h-screen w-[15rem] overflow-hidden bg-repeat [background-size:105%] dark:bg-black/40 dark:brightness-[.33] sm:w-[20rem] sm:[background-size:79%] md:w-[30rem] md:[background-size:53%] lg:w-[40rem] lg:[background-size:40%]" />
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
    </div>
  );
};

export default Index;
