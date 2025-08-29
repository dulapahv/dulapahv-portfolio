export const skillsData = [
  {
    category: 'Programming Languages',
    icon: 'CodeIcon',
    size: 'large',
    gradient: 'from-blue-500 to-blue-400',
    bgColor: 'bg-blue-500/10 hover:bg-blue-500/15',
    skills: ['TypeScript', 'JavaScript', 'Python', 'C', 'C++', 'Java', 'Bash'],
  },
  {
    category: 'Frontend Development',
    icon: 'MonitorIcon',
    size: 'large',
    gradient: 'from-pink-500 to-pink-400',
    bgColor: 'bg-pink-500/10 hover:bg-pink-500/15',
    skills: [
      'Next.js',
      'React.js',
      'Tailwind CSS',
      'shadcn/ui',
      'Radix UI',
      'HeroUI',
      'daisyUI',
      'MUI',
    ],
  },
  {
    category: 'Backend Development',
    icon: 'HardDrivesIcon',
    size: 'medium',
    gradient: 'from-green-500 to-green-400',
    bgColor: 'bg-green-500/10 hover:bg-green-500/15',
    skills: ['Express.js', 'Prisma', 'WebSocket'],
  },
  {
    category: 'Databases',
    icon: 'DatabaseIcon',
    size: 'medium',
    gradient: 'from-amber-500 to-amber-400',
    bgColor: 'bg-amber-500/10 hover:bg-amber-500/15',
    skills: ['PostgreSQL', 'MongoDB', 'SQLite', 'MySQL', 'Snowflake'],
  },
  {
    category: 'DevOps & CI/CD',
    icon: 'GearIcon',
    size: 'medium',
    gradient: 'from-red-500 to-red-400',
    bgColor: 'bg-red-500/10 hover:bg-red-500/15',
    skills: ['Turborepo', 'GitHub Actions', 'GitLab CI/CD', 'Sentry', 'Docker'],
  },
  {
    category: 'Cloud & Infrastructure',
    icon: 'CloudIcon',
    size: 'medium',
    gradient: 'from-purple-500 to-purple-400',
    bgColor: 'bg-purple-600/10 hover:bg-purple-600/15',
    skills: ['Vercel', 'Cloudflare', 'Render', 'GCP', 'Nginx', 'Firebase'],
  },
  {
    category: 'Desktop/Cross-Platform',
    icon: 'DevicesIcon',
    size: 'small',
    gradient: 'from-teal-500 to-teal-400',
    bgColor: 'bg-teal-600/10 hover:bg-teal-600/15',
    skills: ['Electron.js', 'Qt'],
  },
  {
    category: 'Development Tools',
    icon: 'ToolboxIcon',
    size: 'medium',
    gradient: 'from-yellow-500 to-yellow-400',
    bgColor: 'bg-yellow-600/10 hover:bg-yellow-600/15',
    skills: ['Playwright', 'Jest', 'Postman', 'Insomnia', 'Figma'],
  },
];

// Helper function to get all skills for schema
export const getAllSkillsForSchema = (): string[] => {
  const allSkills: string[] = [];

  // Add categories first
  skillsData.forEach((category) => {
    allSkills.push(category.category);
  });

  // Then add individual skills
  skillsData.forEach((category) => {
    allSkills.push(...category.skills);
  });

  // Add any additional high-level skills not in the UI
  allSkills.push(
    'Software Engineering',
    'Full Stack Development',
    'Parallel and Distributed Systems',
    'Web Development',
    'API Development',
    'Version Control (Git)',
    'Agile Methodologies',
    'Test-Driven Development',
    'Continuous Integration/Continuous Deployment',
    'Web Accessibility',
  );

  return allSkills;
};
