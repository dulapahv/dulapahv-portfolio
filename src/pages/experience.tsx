import React from 'react';

import { ExpCard } from '@/components';

const Experience = () => {
  return (
    <div
      className='flex flex-col gap-8 py-8 justify-center animate-fade-in overflow-hidden'
      id='experience'
    >
      <div className='flex flex-col items-center gap-16 py-8'>
        <h1 className='text-BLACK dark:text-WHITE text-2xl min-[375px]:text-3xl sm:text-4xl uppercase tracking-[0.2em] font-semibold first-letter:text-RED'>
          Work Experience
        </h1>
        <div className='w-14 h-[2px] bg-gradient-to-r from-BLUE to-BLUE-400 flex flex-col'></div>
      </div>
      <div className='flex flex-col gap-8 lg:gap-16 -mt-8 lg:-mt-16'>
        <ExpCard
          title="King Mongkut's Institute of Technology Ladkrabang (KMITL)"
          location='Bangkok, Thailand'
          date='Feb 2023 - Present'
          position='Front End Developer'
          tech='Next.js, Tailwind CSS, TypeScript, DaisyUI, Material UI, Figma'
          detail={[
            'Developed a university website, enabling high school, undergraduate, and graduate students to pre-register for KMITL courses, which helps streamline future credit transfers.',
            'Designed admin console dashboard with Chart.js for efficient platform management for the administrator.',
            'Implemented authentication system with email verification, integrated Cloudflare Turnstile CAPTCHA for bot management, and introduced token-based user sessions to eliminate the need for repetitive logins.',
            "Improved website performance by introducing reusable components, resulting in reduced load times and enhancing the codebase's efficiency and maintainability, ensuring a seamless user experience and long-term stability.",
          ]}
        />
        <ExpCard
          title='Geo-Informatics and Space Technology Development Agency (GISTDA)'
          location='Bangkok, Thailand'
          date='Jun 2023 - Aug 2023'
          position='Full stack Developer Intern'
          tech='React.js, Tailwind CSS, PostgreSQL, Express.js, Python'
          detail={[
            'Developed a Full Stack website facilitating spatial correlation analysis between crop cultivation and crop residue burning incidents, empowering government and authorities to make decisions in fire prevention and mitigation.',
            "Pioneered the integration of GISTDA's proprietary Sphere API Map into a React.js application as a reusable component, offering the public access to example implementations and demos.",
            'Designed and developed API capable of executing dynamic URL queries, all while ensuring robust protection against SQL injection vulnerabilities.',
            'Leveraged NGINX reverse proxy deployment to enable external URL connections to an internal server, seamlessly serving the website and its associated API for an optimized user experience.',
          ]}
          reversed
        />
        <ExpCard
          title="King Mongkut's Institute of Technology Ladkrabang (KMITL)"
          location='Bangkok, Thailand'
          date='Jan 2023 - Jun 2023'
          position='Teaching Assistant'
          tech='C, C++'
          detail={[
            'Supervised and facilitated lab sessions for 50-60 first-year students, delivering tailored technical assistance and guidance to address their queries, both in the laboratory setting and via additional support.',
            "Assessed and provided comprehensive feedback on homework assignments, and lab exercises, contributing to the refinement of students' technical proficiency and academic achievement.",
          ]}
        />
        <ExpCard
          title="King Mongkut's Institute of Technology Ladkrabang (KMITL)"
          location='Bangkok, Thailand'
          date='Aug 2022 - Dec 2022'
          position='Teaching Assistant'
          tech='Rust'
          detail={[
            'Supervised and facilitated lab sessions for 50-60 first-year students, delivering tailored technical assistance and guidance to address their queries, both in the laboratory setting and via additional support.',
            "Assessed and provided comprehensive feedback on homework assignments, and lab exercises, contributing to the refinement of students' technical proficiency and academic achievement.",
          ]}
          reversed
        />
      </div>
    </div>
  );
};

export default Experience;
