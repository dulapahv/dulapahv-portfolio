import { unstable_ViewTransition as ViewTransition } from 'react';
import type { Metadata } from 'next';
import { Merriweather } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import {
  DESCRIPTION,
  EDUCATION_LOCATION,
  GITHUB_URL,
  LINKEDIN_URL,
} from '@/lib/constants';
import { profilePageSchema } from '@/lib/json-ld';
import { createMetadata } from '@/lib/metadata';
import { cn } from '@/lib/utils';
import { Globe } from '@/components/globe';
import { JsonLd } from '@/components/json-ld';
import SkillsSection from '@/components/skills-section';
import SocialLinks from '@/components/social-links';
import { ThemeAwareImage } from '@/components/theme-aware-image';
import { getGitHubFollowers } from '@/app/actions/gh-follower';
import { getTime } from '@/app/actions/time';

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: '700',
});

export const metadata: Metadata = createMetadata({
  title: 'Home',
  description: DESCRIPTION,
  ogText: 'Dulapah Vibulsanti\nSoftware Engineer',
});

export default async function Home() {
  const followers = await getGitHubFollowers();
  const time = await getTime();

  return (
    <>
      <JsonLd schemas={[profilePageSchema]} />
      <header className="flex flex-col gap-x-16 gap-y-2 tracking-wide text-balance sm:flex-row">
        <h1
          className={cn(
            'order-2 mr-auto max-w-[525px] text-2xl font-semibold sm:order-1 sm:text-3xl/11',
            merriweather.className,
          )}
        >
          <span className="text-mirai-red">
            Hello{' '}
            <Link
              href="https://en.wiktionary.org/wiki/%E0%B8%AA%E0%B8%A7%E0%B8%B1%E0%B8%AA%E0%B8%94%E0%B8%B5"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hello in Thai"
            >
              <Image
                src="/wave.svg"
                alt="Wave"
                className={cn(
                  'inline-block cursor-grab align-baseline',
                  'hover:animate-wave',
                  'active:cursor-grabbing',
                )}
                width={24}
                height={24}
              />{' '}
            </Link>
            I&apos;m Dulapah Vibulsanti{' '}
            <Link
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect with me on LinkedIn"
              className={cn(
                'border-border bg-background inline-flex rounded-md border p-1 transition-colors',
                'hover:bg-background-subtle hover:border-border-strong',
              )}
            >
              <Image
                src="/linkedin.svg"
                alt="LinkedIn"
                width={24}
                height={24}
              />
            </Link>
            .
          </span>
          <br />
          Thai{' '}
          <Link
            href="https://maps.app.goo.gl/uqHyX4aokhjnNn9Z7"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Thailand on map"
            className={cn(
              'inline-block align-middle transition-transform',
              'hover:scale-105',
            )}
          >
            <Image src="/thailand.svg" alt="Thailand" width={28} height={28} />
          </Link>{' '}
          Software Engineer{' '}
          <Link
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`GitHub profile with ${followers} followers`}
            className={cn(
              `border-border bg-background inline-flex rounded-md border px-2 py-1 align-middle
              transition-colors`,
              'hover:bg-background-subtle hover:border-border-strong',
            )}
          >
            <ThemeAwareImage
              lightSrc="/octocat-black.svg"
              darkSrc="/octocat-white.svg"
              alt="GitHub"
              width={24}
              height={24}
              className="align-middle"
            />
            <p
              className="border-border-subtle text-foreground-muted ml-2 border-l pl-2 text-base
                font-medium"
            >
              {followers}
            </p>
          </Link>{' '}
          based in Edinburgh,
          <br />
          United Kingdom{' '}
          <Link
            href="https://www.timeanddate.com/time/zone/uk"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Current time in Edinburgh: ${time}`}
            className={cn(
              `border-border bg-background text-foreground-muted inline-flex rounded-md border
              p-1 pr-1.5 align-middle text-base font-medium transition-colors`,
              'hover:bg-background-subtle hover:border-border-strong',
            )}
          >
            {time}
          </Link>
          .
        </h1>
        <Image
          src="/avatar.jpg"
          alt="Dulapah Vibulsanti"
          className="ring-border-subtle bg-background-muted/50 order-1 size-24 rounded-full ring-2
            sm:size-32 md:order-2"
          width={128}
          height={128}
          priority
        />
      </header>

      <ViewTransition enter="none">
        <blockquote
          className="border-l-mirai-red border-border bg-background text-foreground rounded-md border
            border-l-8 py-2 pr-2.5 pl-3 italic shadow-sm"
        >
          &quot;I want to make technology accessible and delightful to everyone
          as I believe it has the power to transform lives, and that&apos;s what
          I&apos;ve been doing since the very beginning.&quot;
        </blockquote>

        <SocialLinks />
      </ViewTransition>

      <article className="text-foreground">
        I am an upcoming{' '}
        <b className="text-foreground font-semibold">
          Software Engineer Graduate
        </b>{' '}
        at{' '}
        <Link
          href="https://www.natwestgroup.com/"
          className={cn('text-mirai-red', 'hover:underline')}
          target="_blank"
          rel="noopener noreferrer"
        >
          NatWest Group
        </Link>
        , one of the United Kingdom&apos;s Big Four banks, serving over 19
        million customers across retail, commercial, and private banking.
        <br />
        <br />
        In 2024, I completed an internship at NatWest Group as a{' '}
        <b className="text-foreground font-semibold">
          Software Engineer Intern
        </b>
        , where I honed my skills across frontend, backend, and cloud
        technologies. Following the internship, I was thrilled to receive a{' '}
        <b className="text-foreground font-semibold">return offer</b> to join as
        a Software Engineer Graduate, starting in September 2025.
        <br />
        <Globe
          width={384}
          height={320}
          markers={[...EDUCATION_LOCATION]}
          className="float-left -ml-8 h-72 w-screen cursor-grab overflow-hidden rounded-lg
            min-[425px]:ml-0 min-[425px]:w-full sm:w-96"
        />
        <br />
        In 2025, I completed a double degree program in Software Engineering,
        earning a{' '}
        <b className="text-foreground font-semibold">
          Bachelor of Science with Honours (BSc Hons) with First Class Honours
          and Specialism in Parallel and Distributed Systems
        </b>{' '}
        from{' '}
        <Link
          href="https://www.gla.ac.uk/"
          className={cn('text-mirai-red', 'hover:underline')}
          target="_blank"
          rel="noopener noreferrer"
        >
          University of Glasgow
        </Link>
        , a Russell Group university in the United Kingdom, and a{' '}
        <b className="text-foreground font-semibold">
          Bachelor of Engineering (B.Eng.)
        </b>{' '}
        from{' '}
        <Link
          href="https://www.kmitl.ac.th/"
          className={cn('text-mirai-red', 'hover:underline')}
          target="_blank"
          rel="noopener noreferrer"
        >
          King Mongkut&apos;s Institute of Technology Ladkrabang (KMITL)
        </Link>
        , Thailand. I completed the first two years of the program in Thailand
        and the final two years in the United Kingdom.
        <br />
        <br />
        Driven by a passion for making technology accessible and delightful, I
        believe in its ability to transform lives, and that&apos;s what
        I&apos;ve been working toward since the very beginning.
      </article>
      <SkillsSection />
    </>
  );
}
