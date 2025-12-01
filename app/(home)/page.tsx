import type { Metadata } from 'next';

import { DESCRIPTION } from '@/lib/constants';
import { profilePageSchema } from '@/lib/json-ld';
import { createMetadata } from '@/lib/metadata';
import { cn } from '@/lib/utils';
import { AboutCard } from '@/components/about-card';
import { CameraRollCard } from '@/components/camera-roll-card';
import { Footer } from '@/components/footer';
import { GitHubContributionsCard } from '@/components/github-contributions-card';
import { GlobeCard } from '@/components/globe-card';
import { HeaderText } from '@/components/header-text';
import { JsonLd } from '@/components/json-ld';
import { OpenSourceCard } from '@/components/open-source-card';
import { ProjectsCard } from '@/components/projects-card';
import { RecentBlogsCard } from '@/components/recent-blogs-card';
import { ResumeCard } from '@/components/resume-card';
import { SpotifyCard } from '@/components/spotify-card';
import { WorkCard } from '@/components/work-card';

export const metadata: Metadata = createMetadata({
  title: 'Home',
  description: DESCRIPTION,
  ogText: 'Dulapah Vibulsanti\nSoftware Engineer'
});

export default function Home() {
  return (
    <>
      <JsonLd schemas={[profilePageSchema]} />
      <header className="animate-tilt-scale-up mb-12">
        <HeaderText />
        <div className="mt-12 max-w-4xl">
          <h2 className="text-foreground-muted mb-4 text-sm font-semibold tracking-wider uppercase">
            What I do
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Frontend Development', gradient: 'from-pink-500/20 to-rose-500/20' },
              { label: 'Full-Stack Development', gradient: 'from-blue-500/20 to-cyan-500/20' },
              { label: 'UI/UX Design', gradient: 'from-blue-600/20 to-purple-500/20' },
              { label: 'Accessibility', gradient: 'from-amber-500/20 to-orange-500/20' }
            ].map(skill => (
              <span
                key={skill.label}
                className={cn(
                  `ring-border-subtle group relative inline-flex cursor-crosshair items-center gap-2 rounded-full
                  bg-linear-to-br px-4 py-2 text-sm font-medium ring-1 backdrop-blur-sm`,
                  skill.gradient
                )}
              >
                <span
                  className="bg-linear-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-white/90
                    dark:to-white/70"
                >
                  {skill.label}
                </span>
              </span>
            ))}
          </div>
        </div>
      </header>
      <main className="home-grid animate-tilt-scale-up grid gap-5">
        <article className="min-w-0" style={{ gridArea: '👋' }}>
          <AboutCard />
        </article>
        <article className="min-w-0" style={{ gridArea: '👔' }}>
          <WorkCard />
        </article>
        <article className="min-w-0" style={{ gridArea: '📝' }}>
          <RecentBlogsCard />
        </article>
        <article className="min-w-0" style={{ gridArea: '📊' }}>
          <GitHubContributionsCard username="dulapahv" />
        </article>
        <article className="min-w-0" style={{ gridArea: '🎨' }}>
          <ProjectsCard />
        </article>
        <article className="min-w-0" style={{ gridArea: '📄' }}>
          <ResumeCard />
        </article>
        <article className="min-w-0" style={{ gridArea: '🌟' }}>
          <OpenSourceCard />
        </article>
        <article className="min-w-0" style={{ gridArea: '🌏' }}>
          <GlobeCard />
        </article>
        <article className="min-w-0" style={{ gridArea: '📸' }}>
          <CameraRollCard
            images={['jp1.jpeg', 'jp2.jpeg', 'jp3.jpeg', 'edi1.jpeg', 'edi2.jpeg', 'edi3.jpeg']}
          />
        </article>
        <article className="min-w-0" style={{ gridArea: '🎵' }}>
          <SpotifyCard />
        </article>
      </main>
      <Footer />
    </>
  );
}
