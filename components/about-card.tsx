import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/card";
import { LINKEDIN_URL, SPOTIFY_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { ThemeAwareImage } from "./theme-aware-image";

export function AboutCard() {
  return (
    <Card className="p-4" containerClassName="h-full">
      <div className="group relative overflow-hidden rounded-lg">
        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300",
            "group-hover:opacity-100"
          )}
        >
          <div className="absolute top-0 left-1/3 h-full w-px bg-white/50" />
          <div className="absolute top-0 left-2/3 h-full w-px bg-white/50" />
          <div className="absolute top-1/3 left-0 h-px w-full bg-white/50" />
          <div className="absolute top-2/3 left-0 h-px w-full bg-white/50" />
        </div>
        <Image
          alt="Dulapah Vibulsanti"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAsUlEQVR4AQClAFr/Ao99af+NfnL/oYx7/498a/9nY0n/YWJB/1hfPP85Ox3/Av0M9wD6/vEA8Pb0APwO6QAnIiAAAAD+AOnn4QD///oAAuXr3AAEEOwA7u/mANre5wDl3+YABf0MAO7v9wABAQEAAuDb8wDn5wIA8/f7ANve7QC9yeMA0tfyACscMAAaEx8AAvHq+AAG9QIA9fjvAOPf9QAG8fIABPHyADc0NgBIP0gAAAAA//9MjOw2AAAABklEQVQDAH+DUIQ2I2QQAAAAAElFTkSuQmCC"
          className="cursor-crosshair rounded-lg transition-transform duration-300 group-hover:rotate-1 group-hover:scale-105"
          height={1320}
          placeholder="blur"
          priority
          src="/about.jpeg"
          width={1980}
        />
      </div>
      <p className="mt-4 text-foreground leading-7">
        I&apos;m a graduate software engineer at NatWest Group, building
        accessible and user-centered frontend tools that make banking more
        intuitive for both customers and staffs. I care about thoughtful design,
        maintainable systems, and reliable software in production. I enjoy
        contributing to open-source projects, studying Japanese, and checking in
        on my pet rabbit back home via a camera.
      </p>
      <span className="mt-auto flex flex-col flex-wrap justify-between sm:flex-row sm:items-center">
        <p className="mt-4 flex flex-wrap items-center gap-x-3 text-foreground leading-7">
          See what I&apos;ve been doing on{" "}
          <Link
            className={cn(
              "inline-flex items-center text-foreground-muted text-sm transition-colors",
              "hover:text-foreground"
            )}
            href="https://github.com/dulapahv"
            rel="noopener noreferrer"
            target="_blank"
          >
            <ThemeAwareImage
              alt="GitHub"
              className=""
              darkSrc="/octocat-white.svg"
              height={16}
              lightSrc="/octocat-black.svg"
              width={16}
            />
          </Link>
          <Link
            className={cn(
              "inline-flex items-center text-foreground-muted text-sm transition-colors",
              "hover:text-foreground"
            )}
            href={LINKEDIN_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Image
              alt="LinkedIn"
              className=""
              height={16}
              src="/linkedin.svg"
              width={16}
            />
          </Link>
          <Link
            className={cn(
              "inline-flex items-center text-foreground-muted text-sm transition-colors",
              "hover:text-foreground"
            )}
            href={SPOTIFY_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Image
              alt="Spotify"
              className=""
              height={16}
              src="/spotify.svg"
              width={16}
            />
          </Link>
        </p>
        <Link
          className={cn(
            "group mt-4 inline-flex w-fit items-center rounded-full bg-border-subtle px-4 py-2 text-foreground text-sm transition-colors",
            "hover:bg-border hover:text-mirai-red"
          )}
          href="/contact"
        >
          Let&apos;s talk!
          <ArrowRightIcon
            className={cn(
              "ml-1 size-4 transition-transform",
              "group-hover:translate-x-0.5"
            )}
            weight="bold"
          />
        </Link>
      </span>
    </Card>
  );
}
