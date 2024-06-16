import {
  Atom,
  BriefcaseBusiness,
  CircleUserRound,
  Copy,
  Home,
  Layers,
  LogIn,
  Monitor,
  Moon,
  NotebookPen,
  Sun,
} from "lucide-react";

const commands = [
  {
    key: "dark",
    label: "Change Theme to Dark",
    section: "Theme",
    icon: <Moon size={20} />,
  },
  {
    key: "light",
    label: "Change Theme to Light",
    section: "Theme",
    icon: <Sun size={20} />,
  },
  {
    key: "system",
    label: "Change Theme to System",
    section: "Theme",
    icon: <Monitor size={20} />,
  },
  {
    key: "copy_url",
    label: "Copy Current URL",
    section: "General",
    icon: <Copy size={20} />,
  },
  {
    key: "copy_short_url",
    label: "Copy Current URL (Shortened)",
    section: "General",
    icon: <Copy size={20} />,
  },
  {
    key: "home",
    label: "Home",
    section: "Navigation",
    icon: <Home size={20} />,
    href: "/",
  },
  {
    key: "experience",
    label: "Experience",
    section: "Navigation",
    icon: <BriefcaseBusiness size={20} />,
    href: "/experience",
  },
  {
    key: "project",
    label: "Project",
    section: "Navigation",
    icon: <Atom size={20} />,
    href: "/project",
  },
  {
    key: "blog",
    label: "Blog",
    section: "Navigation",
    icon: <NotebookPen size={20} />,
    href: "/blog",
  },
  {
    key: "stack",
    label: "Stack",
    section: "Navigation",
    icon: <Layers size={20} />,
    href: "/stack",
  },
  {
    key: "contact",
    label: "Contact",
    section: "Navigation",
    icon: <CircleUserRound size={20} />,
    href: "/contact",
  },
  {
    key: "login",
    label: "Admin Login",
    section: "Developer",
    icon: <LogIn size={20} />,
  },
];

export default commands;
