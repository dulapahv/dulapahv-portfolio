'use client';

import { useEffect, useRef, useState } from 'react';

import { Monitor, Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from 'next-themes';

import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useThemeColor } from '@/hooks/use-theme-color';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isSmallScreen = useMediaQuery('(max-width: 678px)');
  const isTouchDevice = useMediaQuery('(hover: none) and (pointer: coarse)');

  const expanded = isTouchDevice ? isExpanded : isHovered;

  useThemeColor();

  useEffect(() => setMounted(true), []);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('touchstart', handleClickOutside);
      };
    }
  }, [isExpanded]);

  if (!mounted) return null;

  const themes = [
    {
      key: 'system',
      icon: Monitor,
      label: 'System theme',
    },
    {
      key: 'light',
      icon: Sun,
      label: 'Light theme',
    },
    {
      key: 'dark',
      icon: Moon,
      label: 'Dark theme',
    },
  ];

  const containerVariants = {
    hidden: {
      y: 100,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: 0.5,
      },
    },
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    if (isTouchDevice) {
      setIsExpanded(false);
    }
  };

  const handleContainerClick = () => {
    if (isTouchDevice) {
      setIsExpanded(!isExpanded);
    }
  };

  const currentTheme = themes.find((t) => t.key === theme);
  const CurrentIcon = currentTheme?.icon || Monitor;

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        `ring-border bg-background-elevated/90 fixed right-5 bottom-4 z-50
        overflow-hidden rounded-full p-0.5 ring-1 backdrop-blur-xl`,
        isSmallScreen
          ? 'flex max-h-7 w-7 flex-col'
          : 'flex h-7 max-w-7 flex-row',
        theme === 'system' && 'justify-start',
        theme === 'light' && 'justify-center',
        theme === 'dark' && 'justify-end',
      )}
      variants={containerVariants}
      initial="hidden"
      animate={{
        ...containerVariants.visible,
        ...(isSmallScreen
          ? { maxHeight: expanded ? '100px' : '28px' }
          : { maxWidth: expanded ? '100px' : '28px' }),
        transition: {
          delay: 0,
        },
      }}
      transition={{
        ...containerVariants.visible.transition,
        ...(isSmallScreen
          ? { maxHeight: { duration: 0.15, ease: 'easeOut' } }
          : { maxWidth: { duration: 0.15, ease: 'easeOut' } }),
      }}
      onMouseEnter={() => !isTouchDevice && setIsHovered(true)}
      onMouseLeave={() => !isTouchDevice && setIsHovered(false)}
      onClick={handleContainerClick}
      role="group"
      aria-label="Theme switcher"
      aria-expanded={expanded}
    >
      {/* For touch devices, show current theme icon when collapsed */}
      {isTouchDevice && !expanded ? (
        <motion.button
          type="button"
          className="hover:bg-background-subtle relative size-6 shrink-0 cursor-pointer rounded-full
            transition-colors"
          aria-label={`Current theme: ${currentTheme?.label}. Tap to change theme`}
          whileTap={{ scale: 0.95 }}
        >
          <CurrentIcon className="text-foreground relative m-auto size-4" />
        </motion.button>
      ) : (
        // Show all theme options when expanded or on hover
        themes.map(({ key, icon: Icon, label }) => {
          const isActive = theme === key;
          return (
            <motion.button
              type="button"
              key={key}
              className="hover:bg-background-subtle relative size-6 shrink-0 cursor-pointer rounded-full
                transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleThemeChange(key);
              }}
              aria-label={label}
              aria-pressed={isActive}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTheme"
                  className="bg-background-muted border-border-subtle absolute inset-0 rounded-full border
                    shadow-sm"
                  transition={{ type: 'spring', duration: 0.5 }}
                />
              )}
              <Icon
                className={cn(
                  'relative m-auto size-4',
                  isActive
                    ? 'text-foreground'
                    : 'text-foreground-subtle hover:text-foreground-muted transition-colors',
                )}
              />
            </motion.button>
          );
        })
      )}
    </motion.div>
  );
}
