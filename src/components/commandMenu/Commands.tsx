import { CgNotes, CgProfile } from "react-icons/cg";
import { HiOutlineBriefcase } from "react-icons/hi";
import { LuAtom, LuHome, LuLayers, LuLogIn } from "react-icons/lu";
import {
  MdMonitor,
  MdOutlineDarkMode,
  MdOutlineLightMode,
} from "react-icons/md";
import { RxCopy } from "react-icons/rx";

const commands = [
  {
    key: "dark",
    label: "Change Theme to Dark",
    section: "Theme",
    icon: <MdOutlineDarkMode className="text-xl" />,
  },
  {
    key: "light",
    label: "Change Theme to Light",
    section: "Theme",
    icon: <MdOutlineLightMode className="text-xl" />,
  },
  {
    key: "system",
    label: "Change Theme to System",
    section: "Theme",
    icon: <MdMonitor className="text-xl" />,
  },
  {
    key: "copy_url",
    label: "Copy Current URL",
    section: "General",
    icon: <RxCopy className="text-xl" />,
  },
  {
    key: "copy_short_url",
    label: "Copy Current URL (Shortened)",
    section: "General",
    icon: <RxCopy className="text-xl" />,
  },
  {
    key: "home",
    label: "Home",
    section: "Navigation",
    icon: <LuHome className="text-xl" />,
    href: "/",
  },
  {
    key: "experience",
    label: "Experience",
    section: "Navigation",
    icon: <HiOutlineBriefcase className="text-xl" />,
    href: "/experience",
  },
  {
    key: "project",
    label: "Project",
    section: "Navigation",
    icon: <LuAtom className="text-xl" />,
    href: "/project",
  },
  {
    key: "blog",
    label: "Blog",
    section: "Navigation",
    icon: <CgNotes className="text-xl" />,
    href: "/blog",
  },
  {
    key: "stack",
    label: "Stack",
    section: "Navigation",
    icon: <LuLayers className="text-xl" />,
    href: "/stack",
  },
  {
    key: "contact",
    label: "Contact",
    section: "Navigation",
    icon: <CgProfile className="text-xl" />,
    href: "/contact",
  },
  {
    key: "login",
    label: "Admin Login",
    section: "Developer",
    icon: <LuLogIn className="text-xl" />,
  },
];

export default commands;
