import {
  Cloud,
  Code2,
  Database,
  Globe,
  Monitor,
  Server,
  Settings,
  Wrench,
} from 'lucide-react';

import { cn } from '@/lib/utils';

const skillsData = [
  {
    category: 'Programming Languages',
    icon: Code2,
    size: 'large',
    gradient: 'from-blue-500 to-blue-400',
    bgColor: 'bg-blue-500/10 hover:bg-blue-500/15',
    skills: [
      'TypeScript',
      'JavaScript',
      'Python',
      'C',
      'C++',
      'Java',
      'Bash',
      'Haskell',
      'R',
      'Rust',
    ],
  },
  {
    category: 'Frontend Development',
    icon: Globe,
    size: 'large',
    gradient: 'from-pink-500 to-pink-400',
    bgColor: 'bg-pink-500/10 hover:bg-pink-500/15',
    skills: [
      'React.js',
      'Next.js',
      'Tailwind CSS',
      'shadcn/ui',
      'HeroUI',
      'Tremor',
      'daisyUI',
      'MUI',
    ],
  },
  {
    category: 'Backend Development',
    icon: Server,
    size: 'medium',
    gradient: 'from-green-500 to-green-400',
    bgColor: 'bg-green-500/10 hover:bg-green-500/15',
    skills: ['Express.js', 'Prisma', 'WebSocket', 'WebRTC', 'Firebase'],
  },
  {
    category: 'Databases',
    icon: Database,
    size: 'medium',
    gradient: 'from-amber-500 to-amber-400',
    bgColor: 'bg-amber-500/10 hover:bg-amber-500/15',
    skills: ['PostgreSQL', 'MongoDB', 'SQLite', 'MySQL', 'Snowflake'],
  },
  {
    category: 'DevOps & CI/CD',
    icon: Settings,
    size: 'medium',
    gradient: 'from-red-500 to-red-400',
    bgColor: 'bg-red-500/10 hover:bg-red-500/15',
    skills: ['Turborepo', 'GitHub Actions', 'GitLab CI/CD', 'Sentry', 'Docker'],
  },
  {
    category: 'Cloud & Infrastructure',
    icon: Cloud,
    size: 'medium',
    gradient: 'from-purple-500 to-purple-400',
    bgColor: 'bg-purple-600/10 hover:bg-purple-600/15',
    skills: ['Vercel', 'Cloudflare', 'Render', 'GCP', 'Nginx', 'Firebase'],
  },
  {
    category: 'Desktop/Cross-Platform',
    icon: Monitor,
    size: 'small',
    gradient: 'from-teal-500 to-teal-400',
    bgColor: 'bg-teal-600/10 hover:bg-teal-600/15',
    skills: ['Electron.js', 'Qt'],
  },
  {
    category: 'Development Tools',
    icon: Wrench,
    size: 'medium',
    gradient: 'from-yellow-500 to-yellow-400',
    bgColor: 'bg-yellow-600/10 hover:bg-yellow-600/15',
    skills: ['Playwright', 'Jest', 'Postman', 'Insomnia', 'Figma'],
  },
];

const getSizeClasses = (size: string) => {
  switch (size) {
    case 'large':
      return 'md:col-span-2 row-span-1';
    case 'medium':
      return 'md:col-span-2 row-span-1';
    case 'small':
      return 'md:col-span-1 row-span-1';
    default:
      return 'md:col-span-1 row-span-1';
  }
};

export default function SkillsSection() {
  return (
    <section className="mt-8">
      <h1 className="text-foreground mb-6 text-2xl font-semibold">Skills</h1>

      <div className="grid auto-rows-min grid-cols-1 gap-3 md:grid-cols-4">
        {skillsData.map((category, index) => {
          const IconComponent = category.icon;
          const sizeClasses = getSizeClasses(category.size);
          const isLarge = category.size === 'large';

          return (
            <div key={index} className={cn('group relative', sizeClasses)}>
              {/* Background Gradient */}
              <div
                className={cn(
                  'absolute inset-0 rounded-xl bg-gradient-to-br opacity-5 transition-opacity',
                  'group-hover:opacity-10',
                  category.gradient,
                )}
              />

              {/* Main Card */}
              <div
                className={cn(
                  `border-border bg-background/80 relative h-full rounded-xl border p-3
                  backdrop-blur-xl transition-all`,
                  'hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl',
                  category.bgColor,
                )}
              >
                {/* Header */}
                <div
                  className={cn(
                    'flex items-center gap-3',
                    isLarge ? 'mb-4' : 'mb-3',
                  )}
                >
                  <div
                    className={cn(
                      'text-foreground rounded-lg bg-gradient-to-br p-2 shadow-lg transition-transform',
                      'group-hover:scale-110',
                      category.bgColor,
                    )}
                  >
                    <IconComponent
                      className={cn(
                        'flex-shrink-0',
                        isLarge ? 'size-5' : 'size-4',
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <h2
                      className={cn(
                        'text-foreground leading-tight font-bold',
                        isLarge ? 'text-base' : 'text-sm',
                      )}
                    >
                      {category.category}
                    </h2>
                    <div
                      className={cn(
                        'mt-1 h-1 rounded-full bg-gradient-to-r',
                        category.gradient,
                        isLarge ? 'w-10' : 'w-8',
                      )}
                    />
                  </div>
                </div>

                {/* Skills */}
                <div
                  className={cn('flex flex-wrap gap-1.5', isLarge && 'gap-2')}
                >
                  {category.skills.map((skill, index) => (
                    <span
                      key={index}
                      className={cn(
                        `text-foreground border-foreground/10 cursor-default rounded-full border
                        bg-white/10 font-medium backdrop-blur-sm transition-all`,
                        isLarge ? 'px-3 py-1.5 text-xs' : 'px-2.5 py-1 text-xs',
                        'hover:border-foreground/20 hover:scale-105 hover:bg-white/20 hover:shadow-lg',
                      )}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
