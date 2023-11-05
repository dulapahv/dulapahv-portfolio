import React from 'react';

import { SkillIcon } from '@/components';

const Skill = () => {
  return (
    <>
      <div
        className='flex flex-col gap-8 py-8 justify-center overflow-hidden -scroll-my-8'
        id='skill'
      >
        <div className='w-screen relative'>
          <div className='absolute rounded-full w-4 h-4 bg-RED animate-shake-vertical opacity-70 left-[8%] top-[206px]'></div>
          <div className='absolute rounded-full w-8 h-8 bg-BLUE animate-shake-vertical animation-delay-400 opacity-70 left-[13%] top-[126px]'></div>
          <div className='absolute rounded-full w-16 h-16 bg-YELLOW animate-shake-vertical animation-delay-800 opacity-70 left-[36%] top-[78px]'></div>
          <div className='absolute rounded-full w-12 h-12 bg-PURPLE animate-shake-vertical animation-delay-1200 opacity-70 left-[68%] top-[78px]'></div>
          <div className='absolute rounded-full w-8 h-8 bg-YELLOW animate-shake-vertical animation-delay-800 opacity-70 left-[4%] top-[590px]'></div>
          <div className='absolute rounded-full w-12 h-12 bg-RED animate-shake-vertical animation-delay-800 opacity-70 left-[54%] top-[600px]'></div>
          <div className='absolute rounded-full w-12 h-12 bg-PURPLE animate-shake-vertical animation-delay-1200 opacity-70 -left-[1%] top-[754px]'></div>
          <div className='absolute rounded-full w-8 h-8 bg-RED animate-shake-vertical opacity-70 left-[38%] top-[868px]'></div>
          <div className='absolute rounded-full w-10 h-10 bg-YELLOW animate-shake-vertical animation-delay-800 opacity-70 left-[84%] top-[940px]'></div>
          <div className='absolute rounded-full w-16 h-16 bg-BLUE animate-shake-vertical animation-delay-400 opacity-70 left-[97%] top-[462px]'></div>
        </div>
        <div className='relative flex flex-col items-center gap-6 py-8'>
          <h1 className='text-BLACK dark:text-WHITE text-4xl uppercase tracking-[0.2em] font-semibold first-letter:text-RED'>
            Skill
          </h1>
          <div className='w-14 h-[2px] bg-gradient-to-r from-BLUE to-BLUE-400 flex flex-col'></div>
        </div>
        <div className='relative grid grid-cols-1 justify-items-center lg:justify-items-stretch'>
          <div className='flex flex-col lg:flex-row lg:justify-around gap-4 mx-4'>
            <div className='flex flex-col gap-y-4'>
              <div className='flex flex-col gap-y-6'>
                <h1 className='relative text-BLACK dark:text-WHITE flex items-center gap-x-2 text-base sm:text-lg [text-shadow:0_0_5px_#f7f7f7] before:content-["<"] after:content-[">"]'>
                  Programming Languages
                  <div className='absolute left-0 -bottom-2 w-32'>
                    <div className='grid grid-cols-4'>
                      <div className='h-[2px] bg-RED'></div>
                      <div className='h-[2px] bg-BLUE'></div>
                      <div className='h-[2px] bg-YELLOW'></div>
                      <div className='h-[2px] bg-PURPLE'></div>
                    </div>
                  </div>
                </h1>
                <div className='flex gap-3 items-center flex-wrap'>
                  <SkillIcon src='/lang/ts.svg' alt='TypeScript' />
                  <SkillIcon src='/lang/js.svg' alt='JavaScript' />
                  <SkillIcon
                    src='/lang/py.svg'
                    width={60}
                    height={60}
                    alt='Python'
                    tooltip='Python'
                  />
                  <SkillIcon src='/lang/c.svg' alt='C' tooltip='C' />
                  <SkillIcon src='/lang/cpp.svg' alt='C++' tooltip='C++' />
                  <SkillIcon
                    src='/lang/java.svg'
                    width={40}
                    height={40}
                    alt='Java'
                  />
                  <SkillIcon src='/lang/r.svg' alt='R' />
                  <SkillIcon src='/lang/rs.svg' alt='Rust' />
                </div>
              </div>
              <div className='flex flex-col gap-y-6'>
                <h1 className='relative text-BLACK dark:text-WHITE flex items-center gap-x-2 text-base sm:text-lg [text-shadow:0_0_5px_#f7f7f7] before:content-["<"] after:content-[">"]'>
                  Database Management System
                  <div className='absolute left-0 -bottom-2 w-32'>
                    <div className='grid grid-cols-4'>
                      <div className='h-[2px] bg-RED'></div>
                      <div className='h-[2px] bg-BLUE'></div>
                      <div className='h-[2px] bg-YELLOW'></div>
                      <div className='h-[2px] bg-PURPLE'></div>
                    </div>
                  </div>
                </h1>
                <div className='flex gap-3 items-center flex-wrap'>
                  <SkillIcon src='/dbms/postgresql.svg' alt='PostgreSQL' />
                  <SkillIcon
                    src='/dbms/sqlite.svg'
                    alt='SQLite'
                    tooltip='SQLite'
                  />
                </div>
              </div>
              <div className='flex flex-col gap-y-6'>
                <h1 className='relative text-BLACK dark:text-WHITE flex items-center gap-x-2 text-base sm:text-lg [text-shadow:0_0_5px_#f7f7f7] before:content-["<"] after:content-[">"]'>
                  DevOps
                  <div className='absolute left-0 -bottom-2 w-32'>
                    <div className='grid grid-cols-4'>
                      <div className='h-[2px] bg-RED'></div>
                      <div className='h-[2px] bg-BLUE'></div>
                      <div className='h-[2px] bg-YELLOW'></div>
                      <div className='h-[2px] bg-PURPLE'></div>
                    </div>
                  </div>
                </h1>
                <div className='flex gap-3 items-center flex-wrap'>
                  <SkillIcon
                    src='/devops/docker.svg'
                    width={72}
                    height={72}
                    alt='Docker'
                  />
                </div>
                <div className='flex flex-col gap-y-6'>
                  <h1 className='relative text-BLACK dark:text-WHITE flex items-center gap-x-2 text-base sm:text-lg [text-shadow:0_0_5px_#f7f7f7] before:content-["<"] after:content-[">"]'>
                    Others
                    <div className='absolute left-0 -bottom-2 w-32'>
                      <div className='grid grid-cols-4'>
                        <div className='h-[2px] bg-RED'></div>
                        <div className='h-[2px] bg-BLUE'></div>
                        <div className='h-[2px] bg-YELLOW'></div>
                        <div className='h-[2px] bg-PURPLE'></div>
                      </div>
                    </div>
                  </h1>
                  <div className='flex gap-3 items-center flex-wrap'>
                    <SkillIcon
                      src='/other/qt.svg'
                      alt='Qt'
                    />
                    <SkillIcon
                      src='/other/bash.svg'
                      alt='Bash'
                    />
                    <SkillIcon
                      src='/other/vercel.svg'
                      width={144}
                      height={144}
                      alt='Vercel'
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-y-6'>
                <h1 className='relative text-BLACK dark:text-WHITE flex items-center gap-x-2 text-base sm:text-lg [text-shadow:0_0_5px_#f7f7f7] before:content-["<"] after:content-[">"]'>
                  Web Development {'('}Front End{')'}
                  <div className='absolute left-0 -bottom-2 w-32'>
                    <div className='grid grid-cols-4'>
                      <div className='h-[2px] bg-RED'></div>
                      <div className='h-[2px] bg-BLUE'></div>
                      <div className='h-[2px] bg-YELLOW'></div>
                      <div className='h-[2px] bg-PURPLE'></div>
                    </div>
                  </div>
                </h1>
                <div className='flex gap-3 items-center flex-wrap'>
                  <SkillIcon
                    src='/web_front/nextjs.svg'
                    width={144}
                    height={144}
                    alt='Next.js'
                  />
                  <SkillIcon src='/web_front/reactjs.svg' alt='React.js' />
                  <SkillIcon
                    src='/web_front/tailwindcss.svg'
                    alt='Tailwind CSS'
                  />
                  <SkillIcon src='/web_front/mui.svg' alt='Material UI' />
                  <SkillIcon src='/web_front/daisyui.svg' alt='DaisyUI' />
                  <SkillIcon src='/web_front/figma.svg' alt='Figma' />
                </div>
              </div>
              <div className='flex flex-col gap-y-6'>
                <h1 className='relative text-BLACK dark:text-WHITE flex items-center gap-x-2 text-base sm:text-lg [text-shadow:0_0_5px_#f7f7f7] before:content-["<"] after:content-[">"]'>
                  Web Development {'('}Back End{')'}
                  <div className='absolute left-0 -bottom-2 w-32'>
                    <div className='grid grid-cols-4'>
                      <div className='h-[2px] bg-RED'></div>
                      <div className='h-[2px] bg-BLUE'></div>
                      <div className='h-[2px] bg-YELLOW'></div>
                      <div className='h-[2px] bg-PURPLE'></div>
                    </div>
                  </div>
                </h1>
                <div className='flex gap-3 flex-wrap items-center'>
                  <SkillIcon
                    src='/web_back/expressjs.svg'
                    width={132}
                    height={132}
                    alt='Express.js'
                  />
                  <SkillIcon
                    src='/web_back/axios.svg'
                    width={180}
                    height={180}
                    alt='Axios'
                  />
                  <SkillIcon
                    src='/web_back/nginx.svg'
                    width={123}
                    height={123}
                    alt='NGINX'
                  />
                  <SkillIcon
                    src='/web_back/firebase.svg'
                    width={132}
                    height={132}
                    alt='Firebase'
                  />
                </div>
              </div>
              <div className='flex flex-col gap-y-6'>
                <h1 className='relative text-BLACK dark:text-WHITE flex items-center gap-x-2 text-base sm:text-lg [text-shadow:0_0_5px_#f7f7f7] before:content-["<"] after:content-[">"]'>
                  Testing
                  <div className='absolute left-0 -bottom-2 w-32'>
                    <div className='grid grid-cols-4'>
                      <div className='h-[2px] bg-RED'></div>
                      <div className='h-[2px] bg-BLUE'></div>
                      <div className='h-[2px] bg-YELLOW'></div>
                      <div className='h-[2px] bg-PURPLE'></div>
                    </div>
                  </div>
                </h1>
                <div className='flex gap-3 items-center flex-wrap'>
                  <SkillIcon src='/testing/insomnia.svg' alt='Insomnia' />
                  <SkillIcon
                    src='/testing/postman.svg'
                    width={172}
                    height={172}
                    alt='Postman'
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
