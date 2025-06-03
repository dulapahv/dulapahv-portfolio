'use client';

import { useEffect, useRef, useState } from 'react';

import { Monitor, Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from 'next-themes';

import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useThemeColor } from '@/hooks/use-theme-color';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isSmallScreen = useMediaQuery('(max-width: 678px)');
  const isTouchDevice = useMediaQuery('(hover: none) and (pointer: coarse)');

  // Expand when hovered, focused, or manually expanded on touch devices
  const expanded = isTouchDevice ? isExpanded : isHovered || isFocused;

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

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!containerRef.current) return;

    const buttons = containerRef.current.querySelectorAll('button');
    const currentIndex = Array.from(buttons).findIndex(
      (button) => button === document.activeElement,
    );

    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        if (expanded && buttons.length > 1) {
          const newIndex =
            currentIndex > 0 ? currentIndex - 1 : buttons.length - 1;
          buttons[newIndex]?.focus();
        }
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        if (expanded && buttons.length > 1) {
          const newIndex =
            currentIndex < buttons.length - 1 ? currentIndex + 1 : 0;
          buttons[newIndex]?.focus();
        }
        break;
      case 'Escape':
        event.preventDefault();
        if (isTouchDevice && isExpanded) {
          setIsExpanded(false);
          // Focus the main button after collapsing
          buttons[0]?.focus();
        }
        break;
      case 'Enter':
      case ' ':
        if (isTouchDevice && !expanded) {
          event.preventDefault();
          setIsExpanded(true);
        }
        break;
    }
  };

  // Track focus within the component
  const handleFocusIn = () => {
    setIsFocused(true);
  };

  const handleFocusOut = (event: React.FocusEvent) => {
    // Check if focus is moving outside the component
    if (!containerRef.current?.contains(event.relatedTarget as Node)) {
      setIsFocused(false);
      if (isTouchDevice) {
        setIsExpanded(false);
      }
    }
  };

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
        bounce: 0,
        duration: 0.5,
        delay: isHovered || isFocused || isExpanded ? 0 : 0.5,
      },
    },
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);

    // Always collapse after theme selection for better UX
    if (isTouchDevice) {
      setIsExpanded(false);
    } else {
      // For non-touch devices, remove focus and reset states to collapse
      setIsFocused(false);
      setIsHovered(false);
      // Remove focus from the button to fully collapse
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
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
      onFocusCapture={handleFocusIn}
      onBlurCapture={handleFocusOut}
      onKeyDown={handleKeyDown}
      role="group"
      aria-label="Theme selection"
      aria-expanded={expanded}
    >
      {/* For touch devices, show current theme icon when collapsed */}
      {isTouchDevice && !expanded ? (
        <motion.button
          type="button"
          className="hover:bg-background-subtle relative size-6 shrink-0 cursor-pointer rounded-full
            transition-colors"
          aria-label={`Current theme: ${currentTheme?.label}. Press Enter or Space to expand theme options`}
          aria-describedby="theme-instructions"
          whileTap={{ scale: 0.95 }}
        >
          <CurrentIcon className="text-foreground relative m-auto size-4" />
        </motion.button>
      ) : (
        // Show all theme options when expanded or on hover/focus
        themes.map(({ key, icon: Icon, label }, index) => {
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
              aria-label={`${label}${isActive ? ', currently selected' : ''}`}
              aria-pressed={isActive}
              aria-describedby="theme-instructions"
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
                aria-hidden="true"
              />
            </motion.button>
          );
        })
      )}

      {/* Screen reader instructions */}
      <div id="theme-instructions" className="sr-only">
        {isTouchDevice
          ? 'Use Enter or Space to expand, arrow keys to navigate between themes, Escape to close'
          : 'Use arrow keys to navigate between themes'}
      </div>

      {/* Live region for theme changes */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {mounted && `Theme changed to ${currentTheme?.label}`}
      </div>
    </motion.div>
  );
};
