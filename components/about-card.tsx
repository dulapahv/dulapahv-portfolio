import Image from 'next/image';
import Link from 'next/link';

import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr';

import { LINKEDIN_URL } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Card } from '@/components/card';

import { ThemeAwareImage } from './theme-aware-image';

export function AboutCard() {
  return (
    <Card className="p-4" containerClassName="h-full">
      <div className="group relative overflow-hidden rounded-lg">
        <div
          className={cn(
            'pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300',
            'group-hover:opacity-100'
          )}
        >
          <div className="absolute top-0 left-1/3 h-full w-px bg-white/50" />
          <div className="absolute top-0 left-2/3 h-full w-px bg-white/50" />
          <div className="absolute top-1/3 left-0 h-px w-full bg-white/50" />
          <div className="absolute top-2/3 left-0 h-px w-full bg-white/50" />
        </div>
        <Image
          src="/about.jpeg"
          alt="Dulapah Vibulsanti"
          className="cursor-crosshair rounded-lg transition-transform duration-300 group-hover:scale-105
            group-hover:rotate-1"
          width={1980}
          height={1320}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAsUlEQVR4AQClAFr/Ao99af+NfnL/oYx7/498a/9nY0n/YWJB/1hfPP85Ox3/Av0M9wD6/vEA8Pb0APwO6QAnIiAAAAD+AOnn4QD///oAAuXr3AAEEOwA7u/mANre5wDl3+YABf0MAO7v9wABAQEAAuDb8wDn5wIA8/f7ANve7QC9yeMA0tfyACscMAAaEx8AAvHq+AAG9QIA9fjvAOPf9QAG8fIABPHyADc0NgBIP0gAAAAA//9MjOw2AAAABklEQVQDAH+DUIQ2I2QQAAAAAElFTkSuQmCC"
          priority
        />
      </div>
      <p className="text-foreground mt-4 leading-7">
        I&apos;m a Thai software engineer who believes accessible, delightful technology has the
        power to transform lives. Currently at NatWest Group, I build frontend tools that make
        banking more intuitive—for staff and customers alike. Based in Edinburgh, I code, contribute
        to open source, and check in on my pet rabbit back home via camera.
      </p>
      <span className="mt-auto flex flex-col flex-wrap justify-between sm:flex-row sm:items-center">
        <p className="text-foreground mt-4 flex flex-wrap items-center gap-x-3 leading-7">
          See what I&apos;ve been doing on{' '}
          <Link
            href="https://github.com/dulapahv"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'text-foreground-muted inline-flex items-center text-sm transition-colors',
              'hover:text-foreground'
            )}
          >
            <ThemeAwareImage
              darkSrc="/octocat-white.svg"
              lightSrc="/octocat-black.svg"
              alt="GitHub"
              className=""
              width={16}
              height={16}
            />
          </Link>
          <Link
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'text-foreground-muted inline-flex items-center text-sm transition-colors',
              'hover:text-foreground'
            )}
          >
            <Image src="/linkedin.svg" alt="LinkedIn" className="" width={16} height={16} />
          </Link>
        </p>
        <Link
          href="/contact"
          className={cn(
            `text-foreground bg-border-subtle group mt-4 inline-flex w-fit items-center rounded-full px-4 py-2
            text-sm transition-colors`,
            'hover:text-mirai-red hover:bg-border'
          )}
        >
          Let&apos;s talk!
          <ArrowRightIcon
            className={cn('ml-1 size-4 transition-transform', 'group-hover:translate-x-0.5')}
            weight="bold"
          />
        </Link>
      </span>
    </Card>
  );
}
