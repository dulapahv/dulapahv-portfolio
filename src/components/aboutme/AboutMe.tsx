import { forwardRef, useImperativeHandle, useRef } from 'react';

import { cubicBezier, motion } from 'framer-motion';

import { aboutme } from '@/constants';
import dynamic from 'next/dynamic';

import { Floaties } from '.';

const ScrollingText = dynamic(() => import('./ScrollingText'), { ssr: false });

const AboutMe = forwardRef((props, ref) => {
  const aboutmeRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    scrollIntoView: () => aboutmeRef.current!.scrollIntoView(),
  }));

  return (
    <section
      className="flex flex-col overflow-hidden"
      ref={aboutmeRef}
      id="about"
    >
      <Floaties />
      <div className="relative">
        <ScrollingText />
        <div className="absolute top-0 lg:top-20">
          <div className="lg:md-12 my-2 ml-4 flex h-fit scroll-my-16 flex-col gap-4 rounded-bl-3xl bg-PURPLE/60 p-4 backdrop-blur sm:my-4 sm:ml-8 sm:p-8 md:my-8 md:ml-12 md:gap-8 md:p-6 lg:my-16 lg:ml-16">
            <motion.h1
              className="w-fit bg-PURPLE p-1 px-3 text-xl font-semibold uppercase tracking-[0.2em] text-WHITE first-letter:text-RED sm:text-2xl md:p-3 md:text-3xl lg:text-4xl"
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
              About Me
            </motion.h1>
            {aboutme.map((text, index) => (
              <section className="flex flex-col gap-2" key={index}>
                <div className="flex h-[2px] w-10 flex-col bg-BLUE" />
                <motion.p
                  className="text-pretty text-justify text-xs text-WHITE min-[425px]:text-sm sm:text-base md:text-lg lg:text-xl"
                  initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' }}
                  whileInView={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                  }}
                  transition={{
                    ease: 'easeOut',
                    duration: 1,
                    delay: (index + 1) * 0.1,
                  }}
                  viewport={{ once: true }}
                >
                  {text}
                </motion.p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

AboutMe.displayName = 'AboutMe';

export default AboutMe;
