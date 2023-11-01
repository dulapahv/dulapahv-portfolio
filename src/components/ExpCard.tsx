import React from 'react';
import Image from 'next/image';

const ExpCard = () => {
  return (
    <div className='flex justify-around bg-white/90 rounded-md shadow'>
      <div className='m-4 w-full'>
        <h1 className='text-BLACK dark:text-WHITE font-bold'>
          King Mongkut&apos;s Institute of Technology Ladkrabang
        </h1>
        <h2 className='text-BLACK dark:text-WHITE'>Front End Developer</h2>
        <h3 className='text-BLACK dark:text-WHITE'>
          Next.js, Tailwind CSS, TypeScript, DaisyUI, Material UI, Figma
        </h3>
        <p>
          <ul>
            • Developed a university website, enabling high school,
            undergraduate, and graduate students to pre-register for KMITL
            courses, which helps streamline future credit transfers.
          </ul>
          <ul>
            • Designed admin console dashboard with Chart.js for efficient
            platform management for the administrator.
          </ul>
          <ul>
            • Implemented authentication system with email verification,
            integrated Cloudflare Turnstile CAPTCHA for bot management, and
            introduced token-based user sessions to eliminate the need for
            repetitive logins.
          </ul>
          <ul>
            • Improved website performance by introducing reusable components,
            resulting in reduced load times and enhancing the codebase&apos;s
            efficiency and maintainability, ensuring a seamless user experience
            and long-term stability.
          </ul>
        </p>
      </div>
      <div>
        <div className='carousel carousel-center p-4 space-x-4 bg-neutral rounded-box max-w-4xl'>
          <div className='carousel-item'>
            <Image
              src='/images/stock/photo-1559703248-dcaaec9fab78.jpg'
              className='rounded-box'
              alt='carousel'
              width={500}
              height={500}
            />
          </div>
          <div className='carousel-item'>
            <Image
              src='/images/stock/photo-1565098772267-60af42b81ef2.jpg'
              className='rounded-box'
              alt='carousel'
              width={500}
              height={500}
            />
          </div>
          <div className='carousel-item'>
            <Image
              src='/images/stock/photo-1572635148818-ef6fd45eb394.jpg'
              className='rounded-box'
              alt='carousel'
              width={500}
              height={500}
            />
          </div>
          <div className='carousel-item'>
            <Image
              src='/images/stock/photo-1494253109108-2e30c049369b.jpg'
              className='rounded-box'
              alt='carousel'
              width={500}
              height={500}
            />
          </div>
          <div className='carousel-item'>
            <Image
              src='/images/stock/photo-1550258987-190a2d41a8ba.jpg'
              className='rounded-box'
              alt='carousel'
              width={500}
              height={500}
            />
          </div>
          <div className='carousel-item'>
            <Image
              src='/images/stock/photo-1559181567-c3190ca9959b.jpg'
              className='rounded-box'
              alt='carousel'
              width={500}
              height={500}
            />
          </div>
          <div className='carousel-item'>
            <Image
              src='/images/stock/photo-1601004890684-d8cbf643f5f2.jpg'
              className='rounded-box'
              alt='carousel'
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpCard;
