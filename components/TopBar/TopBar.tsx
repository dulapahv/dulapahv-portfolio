'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'motion/react';

import { cn } from '@/lib/utils';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

export function TopBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        // Always show at the top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down - hide
        setIsVisible(false);
      } else {
        // Scrolling up - show
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <motion.div
      className={cn('fixed top-0 right-0 left-0 z-50 backdrop-blur-sm')}
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
          aria-label="Go to home"
        >
          <Image src="/mirai.png" alt="Mirai logo" width={32} height={32} className="size-8" />
          <span className="text-foreground font-medium">Dulapah Vibulsanti</span>
        </Link>

        <div className="relative">
          <ThemeSwitcher />
        </div>
      </div>
    </motion.div>
  );
}
