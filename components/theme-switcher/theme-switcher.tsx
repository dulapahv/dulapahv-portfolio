"use client";

import { MonitorIcon, MoonIcon, SunIcon } from "@phosphor-icons/react/dist/ssr";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  const themes = [
    { key: "system", icon: MonitorIcon, label: "System theme" },
    { key: "light", icon: SunIcon, label: "Light theme" },
    { key: "dark", icon: MoonIcon, label: "Dark theme" },
  ];

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <motion.div
      aria-label="Theme selection"
      className="relative inline-flex h-8 items-center rounded-full bg-background-elevated/90 ring-1 ring-border backdrop-blur-xl"
      role="group"
    >
      {themes.map(({ key, icon: Icon, label }) => {
        const isActive = theme === key;
        return (
          <motion.button
            aria-label={`${label}${isActive ? ", currently selected" : ""}`}
            aria-pressed={isActive}
            className="relative mx-0.5 flex size-7 items-center justify-center rounded-full"
            key={key}
            onClick={() => handleThemeChange(key)}
            type="button"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
          >
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-full border border-border-subtle bg-background-muted shadow-sm"
                layoutId={"activeTheme"}
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
            <Icon
              aria-hidden="true"
              className="relative m-auto size-4 text-foreground-subtle"
            />
          </motion.button>
        );
      })}

      <div aria-atomic="true" aria-live="polite" className="sr-only">
        Theme changed to {themes.find((t) => t.key === theme)?.label}
      </div>
    </motion.div>
  );
}
