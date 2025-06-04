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
    gradient: 'from-mirai-blue to-mirai-blue/60',
    bgColor: 'bg-mirai-blue/5 hover:bg-mirai-blue/10',
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
    gradient: 'from-mirai-red to-mirai-red/60',
    bgColor: 'bg-mirai-red/5 hover:bg-mirai-red/10',
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
    gradient: 'from-success to-success/60',
    bgColor: 'bg-success/5 hover:bg-success/10',
    skills: ['Express.js', 'Prisma', 'WebSocket', 'WebRTC', 'Firebase'],
  },
  {
    category: 'Databases',
    icon: Database,
    size: 'medium',
    gradient: 'from-warning to-warning/60',
    bgColor: 'bg-warning/5 hover:bg-warning/10',
    skills: ['PostgreSQL', 'MongoDB', 'SQLite', 'MySQL', 'Snowflake'],
  },
  {
    category: 'DevOps & CI/CD',
    icon: Settings,
    size: 'medium',
    gradient: 'from-error to-error/60',
    bgColor: 'bg-error/5 hover:bg-error/10',
    skills: ['Turborepo', 'GitHub Actions', 'GitLab CI/CD', 'Sentry', 'Docker'],
  },
  {
    category: 'Cloud & Infrastructure',
    icon: Cloud,
    size: 'medium',
    gradient: 'from-purple-500 to-purple-400',
    bgColor: 'bg-purple-500/5 hover:bg-purple-500/10',
    skills: ['Vercel', 'Cloudflare', 'Render', 'GCP', 'Nginx', 'Firebase'],
  },
  {
    category: 'Desktop/Cross-Platform',
    icon: Monitor,
    size: 'small',
    gradient: 'from-teal-600 to-teal-500',
    bgColor: 'bg-teal-600/5 hover:bg-teal-600/10',
    skills: ['Electron.js', 'Qt'],
  },
  {
    category: 'Development Tools',
    icon: Wrench,
    size: 'medium',
    gradient: 'from-mirai-yellow to-mirai-yellow/60',
    bgColor: 'bg-mirai-yellow/5 hover:bg-mirai-yellow/10',
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
                  `absolute inset-0 rounded-xl bg-gradient-to-br opacity-5 transition-opacity
                  group-hover:opacity-10`,
                  category.gradient,
                )}
              />

              {/* Main Card */}
              <div
                className={cn(
                  'border-border bg-background/80 relative h-full rounded-xl border p-3',
                  'backdrop-blur-xl transition-all hover:-translate-y-1 hover:scale-[1.02]',
                  'hover:shadow-2xl',
                  category.bgColor,
                )}
              >
                {/* Header */}
                <div
                  className={`flex items-center gap-3 ${isLarge ? 'mb-4' : 'mb-3'}`}
                >
                  <div
                    className={cn(
                      `text-foreground rounded-lg bg-gradient-to-br p-2 shadow-lg transition-transform
                      group-hover:scale-110`,
                      category.bgColor,
                    )}
                  >
                    <IconComponent
                      className={`${isLarge ? 'size-5' : 'size-4'}`}
                    />
                  </div>
                  <div className="flex-1">
                    <h2
                      className={`text-foreground ${isLarge ? 'text-base' : 'text-sm'} leading-tight font-bold`}
                    >
                      {category.category}
                    </h2>
                    <div
                      className={`h-1 bg-gradient-to-r ${category.gradient} mt-1 rounded-full
                      ${isLarge ? 'w-10' : 'w-8'}`}
                    />
                  </div>
                </div>

                {/* Skills */}
                <div
                  className={`flex flex-wrap gap-1.5 ${isLarge ? 'gap-2' : ''}`}
                >
                  {category.skills.map((skill, index) => (
                    <span
                      key={index}
                      className={cn(
                        'bg-background-subtle hover:bg-background-muted text-foreground',
                        'hover:text-foreground cursor-default rounded-full',
                        isLarge ? 'px-3 py-1.5 text-xs' : 'px-2.5 py-1 text-xs',
                        'border-border-subtle',
                        'hover:border-border border font-medium backdrop-blur-sm transition-all',
                        'hover:scale-105 hover:shadow-lg',
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
