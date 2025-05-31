"use client";

import { useEffect } from 'react';

import { useTheme } from 'next-themes';

export function useThemeColor() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    // Get the theme color meta tag
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');

    if (themeColorMeta) {
      // Update the color based on theme
      themeColorMeta.setAttribute(
        'content',
        resolvedTheme === 'dark' ? '#0a0a0a' : '#eef1f7',
      );
    }
  }, [resolvedTheme]);
}
