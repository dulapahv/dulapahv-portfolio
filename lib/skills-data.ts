export const skillsData = [
  {
    category: "General programming",
    icon: "CodeIcon",
    size: "large",
    gradient: "from-red-500 to-red-400",
    bgColor: "bg-red-500/10 hover:bg-red-500/15",
    skills: [
      "TypeScript",
      "JavaScript",
      "Python",
      "Java",
      "SQL",
      "C",
      "C++",
      "Bash",
    ],
  },
  {
    category: "Databases",
    icon: "DatabaseIcon",
    size: "medium",
    gradient: "from-amber-500 to-amber-400",
    bgColor: "bg-amber-500/10 hover:bg-amber-500/15",
    skills: ["PostgreSQL", "MongoDB", "SQLite", "MySQL", "Snowflake"],
  },
  {
    category: "Web frameworks & UI",
    icon: "MonitorIcon",
    size: "large",
    gradient: "from-purple-500 to-purple-400",
    bgColor: "bg-purple-500/10 hover:bg-purple-500/15",
    skills: [
      "Next.js",
      "React.js",
      "Tailwind CSS",
      "Figma",
      "shadcn/ui",
      "Radix UI",
      "HeroUI",
      "daisyUI",
      "MUI",
    ],
  },
  {
    category: "Backend",
    icon: "HardDrivesIcon",
    size: "small",
    gradient: "from-teal-500 to-teal-400",
    bgColor: "bg-teal-500/10 hover:bg-teal-500/15",
    skills: ["Express.js", "Prisma", "WebSocket"],
  },
  {
    category: "Cross-platform & Desktop",
    icon: "DevicesIcon",
    size: "small",
    gradient: "from-pink-500 to-pink-400",
    bgColor: "bg-pink-500/10 hover:bg-pink-500/15",
    skills: ["Electron.js", "Qt"],
  },
  {
    category: "DevOps & Testing",
    icon: "GearIcon",
    size: "medium",
    gradient: "from-green-500 to-green-400",
    bgColor: "bg-green-500/10 hover:bg-green-500/15",
    skills: [
      "GitHub Actions",
      "GitLab CI/CD",
      "Turborepo",
      "Sentry",
      "Vitest",
      "Playwright",
      "Jest",
    ],
  },
  {
    category: "Cloud & Infrastructure",
    icon: "CloudIcon",
    size: "medium",
    gradient: "from-blue-500 to-blue-400",
    bgColor: "bg-blue-500/10 hover:bg-blue-500/15",
    skills: ["Vercel", "Cloudflare", "Docker", "Supabase", "Nginx"],
  },
];

// Helper function to get all skills for schema
export const getAllSkillsForSchema = (): string[] => {
  const allSkills: string[] = [];

  // Add categories first
  for (const category of skillsData) {
    allSkills.push(category.category);
  }

  // Then add individual skills
  for (const category of skillsData) {
    allSkills.push(...category.skills);
  }

  // Add any additional high-level skills not in the UI
  allSkills.push(
    "Software Engineering",
    "Full Stack Development",
    "Parallel and Distributed Systems",
    "Web Development",
    "API Development",
    "Version Control (Git)",
    "Agile Methodologies",
    "Test-Driven Development",
    "Continuous Integration/Continuous Deployment",
    "Web Accessibility"
  );

  return allSkills;
};
