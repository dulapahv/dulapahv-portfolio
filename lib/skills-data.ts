export const skillsData = [
  {
    category: "Languages",
    skills: [
      "TypeScript",
      "JavaScript",
      "Python",
      "Java",
      "C",
      "C++",
      "SQL",
      "Bash",
    ],
  },
  {
    category: "Frontend",
    skills: [
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Figma",
      "Electron.js",
      "shadcn/ui",
      "Radix UI",
      "HeroUI",
      "MUI",
    ],
  },
  {
    category: "Backend & Data",
    skills: [
      "Node.js",
      "Express.js",
      "Spring Boot",
      "Prisma",
      "WebSocket",
      "PostgreSQL",
      "MongoDB",
      "Snowflake",
    ],
  },
  {
    category: "DevOps & Testing",
    skills: [
      "Docker",
      "GitHub Actions",
      "GitLab CI/CD",
      "Vitest",
      "Playwright",
      "Jest",
      "Turborepo",
    ],
  },
];

export const getAllSkillsForSchema = (): string[] => {
  const allSkills: string[] = [];

  for (const category of skillsData) {
    allSkills.push(category.category);
  }

  for (const category of skillsData) {
    allSkills.push(...category.skills);
  }

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
    "Web Accessibility",
    "Tech Leadership",
    "Scrum",
    "Open Source",
    "Mentoring",
    "Localization"
  );

  return allSkills;
};
