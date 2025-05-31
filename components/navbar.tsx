'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Atom,
  BriefcaseBusiness,
  House,
  NotebookPen,
  UserRound,
} from 'lucide-react';
import { motion } from 'motion/react';

import { cn } from '@/lib/utils';

const navbarItems = [
  {
    name: 'Home',
    icon: <House className="size-4" />,
    link: '/',
  },
  {
    name: 'Work',
    icon: <BriefcaseBusiness className="size-4" />,
    link: '/work',
  },
  {
    name: 'Project',
    icon: <Atom className="size-4" />,
    link: '/project',
  },
  {
    name: 'Blog',
    icon: <NotebookPen className="size-4" />,
    link: '/blog',
  },
  {
    name: 'Contact',
    icon: <UserRound className="size-4" />,
    link: '/contact',
  },
];

export function Navbar() {
  const pathname = usePathname();

  const isActive = (link: string) => {
    if (link === '/') return pathname === '/';

    return pathname.startsWith(link);
  };

  const containerVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20,
      },
    },
  };

  return (
    <motion.div
      className="bg-background-elevated/80 border-border text-foreground-subtle fixed right-1/2
        bottom-4 z-50 flex translate-x-1/2 items-center gap-x-6 rounded-full border px-3
        py-2 shadow-lg backdrop-blur-xl sm:px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {navbarItems.map((item, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href={item.link}
            className={cn(
              'relative -mb-1 flex items-center gap-2 pb-1',
              isActive(item.link)
                ? 'text-mirai-red border-mirai-red border-b-2'
                : 'hover:text-foreground-muted transition-colors',
            )}
          >
            {item.icon}
            <span className="hidden text-sm font-semibold sm:block">
              {item.name}
            </span>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
