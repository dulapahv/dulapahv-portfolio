import { ViewTransition } from 'react';
import type { Metadata } from 'next';

import { DESCRIPTION } from '@/lib/constants';
import { profilePageSchema } from '@/lib/json-ld';
import { createMetadata } from '@/lib/metadata';
import { cn } from '@/lib/utils';
import { AboutCard } from '@/components/AboutCard';
import { CameraRollCard } from '@/components/CameraRollCard';
import { Footer } from '@/components/Footer';
import { GitHubContributionsCard } from '@/components/GithubContributionsCard';
import { GlobeCard } from '@/components/GlobeCard';
import { HeaderText } from '@/components/HeaderText';
import { JsonLd } from '@/components/JsonLd';
import { OpenSourceCard } from '@/components/OpenSourceCard';
import { ProjectsCard } from '@/components/ProjectsCard';
import { RecentBlogsCard } from '@/components/RecentBlogsCard';
import { ResumeCard } from '@/components/ResumeCard';
import { WorkCard } from '@/components/WorkCard';

export const metadata: Metadata = createMetadata({
  title: 'Home',
  description: DESCRIPTION,
  ogText: 'Dulapah Vibulsanti\nSoftware Engineer'
});

export default function Home() {
  return (
    <>
      <JsonLd schemas={[profilePageSchema]} />
      <ViewTransition>
        <header className="mb-12">
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
              ].map((skill, i) => (
                <span
                  key={skill.label}
                  className={cn(
                    `ring-border-subtle group relative inline-flex cursor-crosshair items-center gap-2 rounded-full
                    bg-linear-to-br px-4 py-2 text-sm font-medium ring-1 backdrop-blur-sm`,
                    skill.gradient
                  )}
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    animation: 'fadeIn 0.5s ease-out forwards',
                    opacity: 0
                  }}
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
        <main className="home-grid grid gap-5">
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
        </main>
      </ViewTransition>
      <Footer />
    </>
  );
}
