import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { DESCRIPTION } from "@/lib/constants";
import { allProjects } from "@/lib/content-utils/content-utils";
import { profilePageSchema } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { AboutCard } from "./components/about-card";
import { CameraRollCard } from "./components/camera-roll-card/camera-roll-card";
import { CardSkeleton } from "./components/card-skeleton";
import { GitHubContributionsCard } from "./components/github-contributions-card/github-contributions-card";
import { GlobeCard } from "./components/globe/globe-card";
import { HeaderText } from "./components/header-text";
import { OpenSourceCard } from "./components/open-source-card/open-source-card";
import { ProjectsCard } from "./components/projects-card/projects-card";
import { RecentBlogsCard } from "./components/recent-blogs-card";
import { ResumeCard } from "./components/resume-card/resume-card";
import { SpotifyCard } from "./components/spotify-card/spotify-card";
import { StressReliefCard } from "./components/stress-relief-card/stress-relief-card";
import { WorkCard } from "./components/work-card";

export const metadata: Metadata = createMetadata({
  title: "Home",
  description: DESCRIPTION,
  ogText: "Dulapah Vibulsanti\nSoftware Engineer",
});

const SKILLS = [
  {
    label: "Frontend Development",
    gradient: "from-pink-500/20 to-rose-500/20",
  },
  {
    label: "Full-Stack Development",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    label: "UI/UX Design",
    gradient: "from-blue-600/20 to-purple-500/20",
  },
  {
    label: "Accessibility",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
] as const;

const CAMERA_IMAGES = [
  "jp1.jpeg",
  "jp2.jpeg",
  "jp3.jpeg",
  "edi1.jpeg",
  "edi2.jpeg",
  "edi3.jpeg",
] as const;

const recentProjects = [...allProjects]
  .sort((a, b) => b.sortDate.getTime() - a.sortDate.getTime())
  .slice(0, 5)
  .map(
    ({
      slug,
      title,
      description,
      image,
      formattedStartDate,
      formattedEndDate,
      isOngoing,
    }) => ({
      slug,
      title,
      description,
      image,
      formattedStartDate,
      formattedEndDate,
      isOngoing,
    })
  );

function GridCell({ area, children }: { area: string; children: ReactNode }) {
  return (
    <article className="min-w-0" data-destructible style={{ gridArea: area }}>
      {children}
    </article>
  );
}

export default function Home() {
  return (
    <>
      <JsonLd schemas={[profilePageSchema]} />

      <header className="mb-12 animate-tilt-scale-up">
        <HeaderText />
        <div className="mt-12 w-fit max-w-4xl" data-destructible>
          <h2 className="mb-4 font-semibold text-foreground-muted text-sm uppercase tracking-wider">
            What I do
          </h2>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <span
                className={cn(
                  "group relative inline-flex cursor-crosshair items-center gap-2 rounded-full bg-linear-to-br px-4 py-2 font-medium text-sm ring-1 ring-border-subtle backdrop-blur-sm",
                  skill.gradient
                )}
                key={skill.label}
              >
                <span className="bg-linear-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-white/90 dark:to-white/70">
                  {skill.label}
                </span>
              </span>
            ))}
          </div>
        </div>
      </header>

      <main className="home-grid grid animate-tilt-scale-up gap-5">
        <GridCell area="👋">
          <AboutCard />
        </GridCell>
        <GridCell area="👔">
          <WorkCard />
        </GridCell>
        <GridCell area="📄">
          <ResumeCard />
        </GridCell>
        <GridCell area="📝">
          <RecentBlogsCard />
        </GridCell>
        <GridCell area="🎨">
          <ProjectsCard projects={recentProjects} />
        </GridCell>
        <GridCell area="📊">
          <Suspense fallback={<CardSkeleton />}>
            <GitHubContributionsCard username="dulapahv" />
          </Suspense>
        </GridCell>
        <GridCell area="🌟">
          <Suspense fallback={<CardSkeleton minHeight="min-h-96" />}>
            <OpenSourceCard />
          </Suspense>
        </GridCell>
        <GridCell area="🌏">
          <GlobeCard />
        </GridCell>
        <GridCell area="📸">
          <CameraRollCard images={[...CAMERA_IMAGES]} />
        </GridCell>
        <GridCell area="🎵">
          <Suspense fallback={<CardSkeleton minHeight="min-h-96" />}>
            <SpotifyCard />
          </Suspense>
        </GridCell>
        <GridCell area="🎮">
          <StressReliefCard />
        </GridCell>
      </main>

      <Footer />
    </>
  );
}
