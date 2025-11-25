'use client';

import { useRef } from 'react';
import type { Route } from 'next';
import { Archivo } from 'next/font/google';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { BookOpenTextIcon, HouseIcon, ShapesIcon, UserIcon } from '@phosphor-icons/react/dist/ssr';
import { motion } from 'motion/react';

import { cn } from '@/lib/utils';

const archivo = Archivo({ subsets: ['latin'], weight: 'variable' });

const navbarItems = [
  {
    name: 'Home',
    icon: <HouseIcon className="size-4.5 sm:size-5" />,
    link: '/'
  },
  {
    name: 'Project',
    icon: <ShapesIcon className="size-4.5 sm:size-5" />,
    link: '/project'
  },
  {
    name: 'Blog',
    icon: <BookOpenTextIcon className="size-4.5 sm:size-5" />,
    link: '/blog'
  },
  {
    name: 'Contact',
    icon: <UserIcon className="size-4.5 sm:size-5" />,
    link: '/contact'
  }
];

export function Navbar() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  const isActive = (link: string) => {
    if (link === '/') return pathname === '/';
    return pathname.startsWith(link);
  };

  // Handle arrow key navigation
  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!navRef.current) return;

    const links = navRef.current.querySelectorAll('a');
    const currentIndex = Array.from(links).findIndex(link => link === document.activeElement);

    let newIndex = currentIndex;

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        newIndex = currentIndex > 0 ? currentIndex - 1 : links.length - 1;
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        newIndex = currentIndex < links.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = links.length - 1;
        break;
      default:
        return;
    }

    links[newIndex]?.focus();
  };

  const containerVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 200,
        damping: 20
      }
    }
  };

  return (
    <motion.nav
      ref={navRef}
      className={cn(
        archivo.className,
        `bg-background-elevated/80 border-border text-foreground-subtle fixed right-1/2 bottom-4 z-50 flex
        translate-x-1/2 items-center gap-x-6 rounded-full border px-3 py-2 shadow-lg backdrop-blur-xl
        *:translate-y-0.5 sm:px-4`
      )}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      role="navigation"
      aria-label="Main navigation"
      onKeyDown={handleKeyDown}
    >
      {navbarItems.map(item => {
        const active = isActive(item.link);

        return (
          <motion.div key={item.link} variants={itemVariants} className="relative">
            <Link
              href={item.link as Route}
              aria-label={`${item.name}${active ? ', current page' : ''}`}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'relative flex gap-2 pb-1',
                active ? 'text-mirai-red' : 'hover:text-foreground-muted transition-colors'
              )}
            >
              <span aria-hidden="true">{item.icon}</span>
              <span className="hidden translate-y-0.5 text-sm font-medium sm:block">
                {item.name}
              </span>

              {active && (
                <motion.div
                  layoutId="activeNavItem"
                  className="bg-mirai-red absolute right-0 bottom-0 left-0 h-0.5 rounded-full"
                  transition={{ type: 'spring', duration: 0.5 }}
                />
              )}

              {active && <span className="sr-only">(current page)</span>}
            </Link>
          </motion.div>
        );
      })}

      <div className="sr-only" aria-live="polite">
        Use arrow keys to navigate between menu items
      </div>
    </motion.nav>
  );
}
