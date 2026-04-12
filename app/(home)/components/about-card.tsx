import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { Link } from "@/components/link";
import { ThemeAwareImage } from "@/components/theme-aware-image";
import { GITHUB_URL, LINKEDIN_URL, SPOTIFY_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Card } from "./card";

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
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAn0lEQVR4AQyNOw8BQRgAZ7+zRPxtdLQqjYuIhMaroDgREqJRrFeIaCQeR3Ea5+LWNTPJNCNe17Vex7XzYdMuR7XEdTsbNKzXr9lxz7WilCYhojW305noHaAySbMaHI0gArFia9a0BhOqbpv97sA3DHn4F+QXfbjffYrlCuPFlunSkC+UePpXXoGP5FIxa2MIYwfJKmJHkkWa83GD2az4AwAA///wsHGXAAAABklEQVQDAMYbUF+0WIcUAAAAAElFTkSuQmCC"
          className="cursor-crosshair rounded-lg transition-transform duration-300 group-hover:rotate-1 group-hover:scale-105"
          height={1861}
          loading="eager"
          placeholder="blur"
          src="/about.jpg"
          width={2791}
        />
      </div>

      <p className="mt-4 text-foreground leading-7">
        I&apos;m a Thai Graduate Software Engineer at NatWest Group in
        Edinburgh, UK, focused on thoughtful design and building reliable,
        maintainable software in production. I occasionally write on my{" "}
        <Link
          className={cn(
            "text-mirai-red underline underline-offset-2",
            "hover:decoration-2"
          )}
          href="/blog"
        >
          personal blog
        </Link>{" "}
        and contribute to open-source projects. Outside of work, I study
        Japanese, listen to music, play relaxing games, and spy on my pet rabbit
        back home via a camera.
      </p>

      <span className="mt-auto flex flex-col flex-wrap justify-between sm:flex-row sm:items-center">
        <p className="mt-4 flex flex-wrap items-center gap-x-3 text-foreground leading-7">
          See what I&apos;ve been doing on{" "}
          <Link
            className={cn(
              "inline-flex items-center text-foreground-muted text-sm",
              "hover:text-foreground"
            )}
            href={GITHUB_URL}
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
              "inline-flex items-center text-foreground-muted text-sm",
              "hover:text-foreground"
            )}
            href={LINKEDIN_URL}
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
              "inline-flex items-center text-foreground-muted text-sm",
              "hover:text-foreground"
            )}
            href={SPOTIFY_URL}
          >
            <Image alt="Spotify" height={16} src="/spotify.svg" width={16} />
          </Link>
        </p>
        <Link
          className={cn(
            "group mt-4 inline-flex w-fit items-center rounded-full bg-border-subtle px-4 py-2 text-foreground text-sm",
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
