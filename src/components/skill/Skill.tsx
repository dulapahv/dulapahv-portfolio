import { forwardRef, useImperativeHandle, useRef } from 'react';

import { cubicBezier, motion } from 'framer-motion';

import { Floaties, SkillHeader, SkillIcon } from '.';

const Skill = forwardRef((props, ref) => {
  const skillRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    scrollIntoView: () => skillRef.current!.scrollIntoView(),
  }));

  return (
    <section
      className="flex flex-col justify-center gap-8 overflow-hidden py-8"
      ref={skillRef}
      id="skill"
    >
      <Floaties />
      <div className="relative flex flex-col items-center gap-6 py-8">
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
          Skill
        </motion.h1>
        <div className="flex h-[2px] w-14 flex-col bg-gradient-to-r from-BLUE to-BLUE-400" />
      </div>
      <div className="relative grid grid-cols-1 justify-items-center lg:justify-items-stretch">
        <div className="mx-4 flex flex-col gap-4 lg:flex-row lg:justify-around">
          <div className="flex flex-col gap-y-4">
            <motion.div
              className="flex flex-col gap-y-6"
              initial={{ transform: 'translateY(50px)', opacity: 0 }}
              whileInView={{
                transform: 'translateY(0)',
                opacity: 1,
              }}
              transition={{ ease: 'easeOut', duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <SkillHeader text="Programming Language" />
              <div className="flex flex-wrap items-center gap-3">
                <SkillIcon src="lang/ts.svg" alt="TypeScript" />
                <SkillIcon src="lang/js.svg" alt="JavaScript" />
                <SkillIcon
                  src="lang/py.svg"
                  width={60}
                  height={60}
                  alt="Python"
                  tooltip="Python"
                />
                <SkillIcon src="lang/c.svg" alt="C" tooltip="C" />
                <SkillIcon src="lang/cpp.svg" alt="C++" tooltip="C++" />
                <SkillIcon
                  src="lang/java.svg"
                  width={40}
                  height={40}
                  alt="Java"
                />
                <SkillIcon src="lang/r.svg" alt="R" />
                <SkillIcon src="lang/rs.svg" alt="Rust" />
              </div>
            </motion.div>
            <motion.div
              className="flex flex-col gap-y-6"
              initial={{ transform: 'translateY(50px)', opacity: 0 }}
              whileInView={{
                transform: 'translateY(0)',
                opacity: 1,
              }}
              transition={{ ease: 'easeOut', duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <SkillHeader text="Web Development (Front End)" />
              <div className="flex flex-wrap items-center gap-3">
                <SkillIcon
                  src="web_front/nextjs.svg"
                  width={128}
                  height={128}
                  alt="Next.js"
                />
                <SkillIcon src="web_front/reactjs.svg" alt="React.js" />
                <SkillIcon src="web_front/tailwindcss.svg" alt="Tailwind CSS" />
                <SkillIcon
                  src="web_front/nextui.svg"
                  width={112}
                  height={112}
                  alt="NextUI"
                />
                <SkillIcon src="web_front/daisyui.svg" alt="DaisyUI" />
                <SkillIcon src="web_front/mui.svg" alt="MUI" />
                <SkillIcon src="web_front/figma.svg" alt="Figma" />
              </div>
            </motion.div>
            <motion.div
              className="flex flex-col gap-y-6"
              initial={{ transform: 'translateY(50px)', opacity: 0 }}
              whileInView={{
                transform: 'translateY(0)',
                opacity: 1,
              }}
              transition={{ ease: 'easeOut', duration: 0.7, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <SkillHeader text="Web Development (Back End)" />
              <div className="flex flex-wrap items-center gap-3">
                <SkillIcon
                  src="web_back/expressjs.svg"
                  width={132}
                  height={132}
                  alt="Express.js"
                />
                <SkillIcon
                  src="web_back/axios.svg"
                  width={180}
                  height={180}
                  alt="Axios"
                />
                <SkillIcon
                  src="web_back/nginx.svg"
                  width={123}
                  height={123}
                  alt="NGINX"
                />
                <SkillIcon
                  src="web_back/firebase.svg"
                  width={132}
                  height={132}
                  alt="Firebase"
                />
              </div>
            </motion.div>
            <motion.div
              className="flex flex-col gap-y-6"
              initial={{ transform: 'translateY(50px)', opacity: 0 }}
              whileInView={{
                transform: 'translateY(0)',
                opacity: 1,
              }}
              transition={{ ease: 'easeOut', duration: 0.7, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <SkillHeader text="Testing" />
              <div className="flex flex-wrap items-center gap-3">
                <SkillIcon
                  src="testing/postman.svg"
                  width={172}
                  height={172}
                  alt="Postman"
                />
                <SkillIcon src="testing/insomnia.svg" alt="Insomnia" />
              </div>
            </motion.div>
          </div>
          <div className="flex flex-col gap-4">
            <motion.div
              className="flex flex-col gap-y-6"
              initial={{ transform: 'translateY(50px)', opacity: 0 }}
              whileInView={{
                transform: 'translateY(0)',
                opacity: 1,
              }}
              transition={{ ease: 'easeOut', duration: 0.7, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <SkillHeader text="Database Management System" />
              <div className="flex flex-wrap items-center gap-3">
                <SkillIcon src="dbms/postgresql.svg" alt="PostgreSQL" />
                <SkillIcon
                  src="dbms/sqlite.svg"
                  alt="SQLite"
                  tooltip="SQLite"
                />
              </div>
            </motion.div>
            <motion.div
              className="flex flex-col gap-y-6"
              initial={{ transform: 'translateY(50px)', opacity: 0 }}
              whileInView={{
                transform: 'translateY(0)',
                opacity: 1,
              }}
              transition={{ ease: 'easeOut', duration: 0.7, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <SkillHeader text="DevOps" />
              <div className="flex flex-wrap items-center gap-3">
                <SkillIcon
                  src="devops/docker.svg"
                  width={72}
                  height={72}
                  alt="Docker"
                />
              </div>
            </motion.div>
            <motion.div
              className="flex flex-col gap-y-6"
              initial={{ transform: 'translateY(50px)', opacity: 0 }}
              whileInView={{
                transform: 'translateY(0)',
                opacity: 1,
              }}
              transition={{ ease: 'easeOut', duration: 0.7, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <SkillHeader text="Others" />
              <div className="flex flex-wrap items-center gap-3">
                <SkillIcon src="other/electron.svg" alt="Electron.js" />
                <SkillIcon
                  src="other/cloudflare.svg"
                  alt="Cloudflare"
                  width={144}
                  height={144}
                />
                <SkillIcon
                  src="other/vercel.svg"
                  width={144}
                  height={144}
                  alt="Vercel"
                />
                <SkillIcon src="other/qt.svg" alt="Qt" />
                <SkillIcon src="other/bash.svg" alt="Bash" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
});

Skill.displayName = 'Skill';

export default Skill;
