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

import { skillsData } from '@/lib/skills-data';
import { cn } from '@/lib/utils';

const iconMap = {
  Code2,
  Globe,
  Server,
  Database,
  Settings,
  Cloud,
  Monitor,
  Wrench,
};

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
          const IconComponent = iconMap[category.icon as keyof typeof iconMap];
          const sizeClasses = getSizeClasses(category.size);
          const isLarge = category.size === 'large';

          return (
            <div key={index} className={cn('group relative', sizeClasses)}>
              {/* Background Gradient */}
              <div
                className={cn(
                  'absolute inset-0 rounded-xl bg-gradient-to-br opacity-5',
                  'group-hover:opacity-8',
                  category.gradient,
                )}
              />

              {/* Main Card */}
              <div
                className={cn(
                  `border-border bg-background/80 relative h-full rounded-xl border p-3
                  backdrop-blur-sm transition-transform`,
                  'hover:scale-[1.01]',
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
                      'text-foreground rounded-lg bg-gradient-to-br p-2 shadow-sm',
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
                        bg-white/10 font-medium transition-colors`,
                        isLarge ? 'px-3 py-1.5 text-xs' : 'px-2.5 py-1 text-xs',
                        'hover:border-foreground/20 hover:bg-white/15',
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
