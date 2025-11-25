'use client';

import { useEffect, useState } from 'react';

import { MonitorIcon, MoonIcon, SunIcon } from '@phosphor-icons/react/dist/ssr';
import { motion } from 'motion/react';
import { useTheme } from 'next-themes';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const themes = [
    { key: 'system', icon: MonitorIcon, label: 'System theme' },
    { key: 'light', icon: SunIcon, label: 'Light theme' },
    { key: 'dark', icon: MoonIcon, label: 'Dark theme' }
  ];

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <motion.div
      className="bg-background-elevated/90 ring-border relative inline-flex h-8 items-center rounded-full ring-1
        backdrop-blur-xl"
      role="group"
      aria-label="Theme selection"
    >
      {themes.map(({ key, icon: Icon, label }) => {
        const isActive = theme === key;
        return (
          <motion.button
            type="button"
            key={key}
            onClick={() => handleThemeChange(key)}
            aria-label={`${label}${isActive ? ', currently selected' : ''}`}
            aria-pressed={isActive}
            className="relative mx-0.5 flex size-7 items-center justify-center rounded-full transition-colors"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
          >
            {isActive && (
              <motion.div
                layoutId={'activeTheme'}
                className="border-border-subtle bg-background-muted absolute inset-0 rounded-full border shadow-sm"
                transition={{ type: 'spring', duration: 0.5 }}
              />
            )}
            <Icon className="text-foreground-subtle relative m-auto size-4" aria-hidden="true" />
          </motion.button>
        );
      })}

      <div aria-live="polite" aria-atomic="true" className="sr-only">
        Theme changed to {themes.find(t => t.key === theme)?.label}
      </div>
    </motion.div>
  );
}
