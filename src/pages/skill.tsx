import React from 'react';

import { SkillIcon } from '@/components';

const Skill = () => {
  return (
    <>
      <div
        className="flex -scroll-my-8 flex-col justify-center gap-8 overflow-hidden py-8"
        id="skill"
      >
        <div className="relative w-screen">
          <div className="absolute left-[8%] top-[206px] h-4 w-4 animate-shake-vertical rounded-full bg-RED opacity-70"></div>
          <div className="absolute left-[13%] top-[126px] h-8 w-8 animate-shake-vertical rounded-full bg-BLUE opacity-70 animation-delay-400"></div>
          <div className="absolute left-[36%] top-[78px] h-16 w-16 animate-shake-vertical rounded-full bg-YELLOW opacity-70 animation-delay-800"></div>
          <div className="absolute left-[68%] top-[78px] h-12 w-12 animate-shake-vertical rounded-full bg-PURPLE opacity-70 animation-delay-1200"></div>
          <div className="absolute left-[4%] top-[590px] h-8 w-8 animate-shake-vertical rounded-full bg-YELLOW opacity-70 animation-delay-800"></div>
          <div className="absolute left-[54%] top-[600px] h-12 w-12 animate-shake-vertical rounded-full bg-RED opacity-70 animation-delay-800"></div>
          <div className="absolute -left-[1%] top-[754px] h-12 w-12 animate-shake-vertical rounded-full bg-PURPLE opacity-70 animation-delay-1200"></div>
          <div className="absolute left-[38%] top-[868px] h-8 w-8 animate-shake-vertical rounded-full bg-RED opacity-70"></div>
          <div className="absolute left-[84%] top-[940px] h-10 w-10 animate-shake-vertical rounded-full bg-YELLOW opacity-70 animation-delay-800"></div>
          <div className="absolute left-[97%] top-[462px] h-16 w-16 animate-shake-vertical rounded-full bg-BLUE opacity-70 animation-delay-400"></div>
        </div>
        <div className="relative flex flex-col items-center gap-6 py-8">
          <h1 className="text-4xl font-semibold uppercase tracking-[0.2em] text-BLACK first-letter:text-RED dark:text-WHITE">
            Skill
          </h1>
          <div className="flex h-[2px] w-14 flex-col bg-gradient-to-r from-BLUE to-BLUE-400"></div>
        </div>
        <div className="relative grid grid-cols-1 justify-items-center lg:justify-items-stretch">
          <div className="mx-4 flex flex-col gap-4 lg:flex-row lg:justify-around">
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-6">
                <h1 className='relative flex items-center gap-x-2 text-base text-BLACK [text-shadow:0_0_5px_#f7f7f7] before:content-["<"] after:content-[">"] dark:text-WHITE sm:text-lg'>
                  Programming Languages
                  <div className="absolute -bottom-2 left-0 w-32">
                    <div className="grid grid-cols-4">
                      <div className="h-[2px] bg-RED"></div>
                      <div className="h-[2px] bg-BLUE"></div>
                      <div className="h-[2px] bg-YELLOW"></div>
                      <div className="h-[2px] bg-PURPLE"></div>
                    </div>
                  </div>
                </h1>
                <div className="flex flex-wrap items-center gap-3">
                  <SkillIcon src="/lang/ts.svg" alt="TypeScript" />
                  <SkillIcon src="/lang/js.svg" alt="JavaScript" />
                  <SkillIcon
                    src="/lang/py.svg"
                    width={60}
                    height={60}
                    alt="Python"
                    tooltip="Python"
                  />
                  <SkillIcon src="/lang/c.svg" alt="C" tooltip="C" />
                  <SkillIcon src="/lang/cpp.svg" alt="C++" tooltip="C++" />
                  <SkillIcon
                    src="/lang/java.svg"
                    width={40}
                    height={40}
                    alt="Java"
                  />
                  <SkillIcon src="/lang/r.svg" alt="R" />
                  <SkillIcon src="/lang/rs.svg" alt="Rust" />
                </div>
              </div>
              <div className="flex flex-col gap-y-6">
                <h1 className='relative flex items-center gap-x-2 text-base text-BLACK [text-shadow:0_0_5px_#f7f7f7] before:content-["<"] after:content-[">"] dark:text-WHITE sm:text-lg'>
                  Web Development {'('}Front End{')'}
                  <div className="absolute -bottom-2 left-0 w-32">
                    <div className="grid grid-cols-4">
                      <div className="h-[2px] bg-RED"></div>
                      <div className="h-[2px] bg-BLUE"></div>
                      <div className="h-[2px] bg-YELLOW"></div>
                      <div className="h-[2px] bg-PURPLE"></div>
                    </div>
                  </div>
                </h1>
                <div className="flex flex-wrap items-center gap-3">
                  <SkillIcon
                    src="/web_front/nextjs.svg"
                    width={144}
                    height={144}
                    alt="Next.js"
                  />
                  <SkillIcon src="/web_front/reactjs.svg" alt="React.js" />
                  <SkillIcon
                    src="/web_front/tailwindcss.svg"
                    alt="Tailwind CSS"
                  />
                  <SkillIcon src="/web_front/mui.svg" alt="Material UI" />
                  <SkillIcon src="/web_front/daisyui.svg" alt="DaisyUI" />
                  <SkillIcon src="/web_front/figma.svg" alt="Figma" />
                </div>
              </div>
              <div className="flex flex-col gap-y-6">
                <h1 className='relative flex items-center gap-x-2 text-base text-BLACK [text-shadow:0_0_5px_#f7f7f7] before:content-["<"] after:content-[">"] dark:text-WHITE sm:text-lg'>
                  Web Development {'('}Back End{')'}
                  <div className="absolute -bottom-2 left-0 w-32">
                    <div className="grid grid-cols-4">
                      <div className="h-[2px] bg-RED"></div>
                      <div className="h-[2px] bg-BLUE"></div>
                      <div className="h-[2px] bg-YELLOW"></div>
                      <div className="h-[2px] bg-PURPLE"></div>
                    </div>
                  </div>
                </h1>
                <div className="flex flex-wrap items-center gap-3">
                  <SkillIcon
                    src="/web_back/expressjs.svg"
                    width={132}
                    height={132}
                    alt="Express.js"
                  />
                  <SkillIcon
                    src="/web_back/axios.svg"
                    width={180}
                    height={180}
                    alt="Axios"
                  />
                  <SkillIcon
                    src="/web_back/nginx.svg"
                    width={123}
                    height={123}
                    alt="NGINX"
                  />
                  <SkillIcon
                    src="/web_back/firebase.svg"
                    width={132}
                    height={132}
                    alt="Firebase"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-y-6">
                <h1 className='relative flex items-center gap-x-2 text-base text-BLACK [text-shadow:0_0_5px_#f7f7f7] before:content-["<"] after:content-[">"] dark:text-WHITE sm:text-lg'>
                  Testing
                  <div className="absolute -bottom-2 left-0 w-32">
                    <div className="grid grid-cols-4">
                      <div className="h-[2px] bg-RED"></div>
                      <div className="h-[2px] bg-BLUE"></div>
                      <div className="h-[2px] bg-YELLOW"></div>
                      <div className="h-[2px] bg-PURPLE"></div>
                    </div>
                  </div>
                </h1>
                <div className="flex flex-wrap items-center gap-3">
                  <SkillIcon src="/testing/insomnia.svg" alt="Insomnia" />
                  <SkillIcon
                    src="/testing/postman.svg"
                    width={172}
                    height={172}
                    alt="Postman"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-y-6">
                <h1 className='relative flex items-center gap-x-2 text-base text-BLACK [text-shadow:0_0_5px_#f7f7f7] before:content-["<"] after:content-[">"] dark:text-WHITE sm:text-lg'>
                  Database Management System
                  <div className="absolute -bottom-2 left-0 w-32">
                    <div className="grid grid-cols-4">
                      <div className="h-[2px] bg-RED"></div>
                      <div className="h-[2px] bg-BLUE"></div>
                      <div className="h-[2px] bg-YELLOW"></div>
                      <div className="h-[2px] bg-PURPLE"></div>
                    </div>
                  </div>
                </h1>
                <div className="flex flex-wrap items-center gap-3">
                  <SkillIcon src="/dbms/postgresql.svg" alt="PostgreSQL" />
                  <SkillIcon
                    src="/dbms/sqlite.svg"
                    alt="SQLite"
                    tooltip="SQLite"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-y-6">
                <h1 className='relative flex items-center gap-x-2 text-base text-BLACK [text-shadow:0_0_5px_#f7f7f7] before:content-["<"] after:content-[">"] dark:text-WHITE sm:text-lg'>
                  DevOps
                  <div className="absolute -bottom-2 left-0 w-32">
                    <div className="grid grid-cols-4">
                      <div className="h-[2px] bg-RED"></div>
                      <div className="h-[2px] bg-BLUE"></div>
                      <div className="h-[2px] bg-YELLOW"></div>
                      <div className="h-[2px] bg-PURPLE"></div>
                    </div>
                  </div>
                </h1>
                <div className="flex flex-wrap items-center gap-3">
                  <SkillIcon
                    src="/devops/docker.svg"
                    width={72}
                    height={72}
                    alt="Docker"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-y-6">
                <h1 className='relative flex items-center gap-x-2 text-base text-BLACK [text-shadow:0_0_5px_#f7f7f7] before:content-["<"] after:content-[">"] dark:text-WHITE sm:text-lg'>
                  Others
                  <div className="absolute -bottom-2 left-0 w-32">
                    <div className="grid grid-cols-4">
                      <div className="h-[2px] bg-RED"></div>
                      <div className="h-[2px] bg-BLUE"></div>
                      <div className="h-[2px] bg-YELLOW"></div>
                      <div className="h-[2px] bg-PURPLE"></div>
                    </div>
                  </div>
                </h1>
                <div className="flex flex-wrap items-center gap-3">
                  <SkillIcon src="/other/qt.svg" alt="Qt" />
                  <SkillIcon src="/other/bash.svg" alt="Bash" />
                  <SkillIcon
                    src="/other/vercel.svg"
                    width={144}
                    height={144}
                    alt="Vercel"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Skill;
